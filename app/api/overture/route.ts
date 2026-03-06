// app/api/overture/route.ts
import { NextResponse } from 'next/server';
import { DuckDBInstance, DuckDBConnection } from '@duckdb/node-api';

// Cache the instance (recommended — create once, reuse connections)
let cachedInstance: DuckDBInstance | null = null;

async function getInstance() {
  if (!cachedInstance) {
    // Create the DuckDB instance (in-memory here)
    cachedInstance = await DuckDBInstance.create(':memory:');

    // Load extensions once on the instance (they apply globally)
    const setupConn = await cachedInstance.connect();
    await setupConn.run('INSTALL spatial; LOAD spatial;');
    await setupConn.run('INSTALL httpfs; LOAD httpfs;');
    // Optional for azure:// protocol: await setupConn.run('INSTALL azure; LOAD azure;');
    setupConn.closeSync();  // Explicit close for setup
  }
  return cachedInstance;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme') || 'buildings';
  const type = searchParams.get('type') || 'building';
  const minx = searchParams.get('minx') || '-85.65';
  const maxx = searchParams.get('maxx') || '-85.5';
  const miny = searchParams.get('miny') || '42.25';
  const maxy = searchParams.get('maxy') || '42.35';
  const limit = Number(searchParams.get('limit') || '500');

  let conn: DuckDBConnection | null = null;

  try {
    const instance = await getInstance();
    conn = await instance.connect();  // Get a fresh connection per request (or reuse if you cache it carefully)

    // ... rest of your code remains the same ...

    const sql = `
  SELECT 
    id,
    subtype,
    names.primary AS name,
    bbox,
    ST_AsGeoJSON(geometry) AS geojson
  FROM read_parquet('s3://overturemaps-us-west-2/release/2026-02-18.0/theme=${theme}/type=${type}/*.parquet', hive_partitioning=1)
  WHERE bbox.xmin > ${minx}
    AND bbox.xmax < ${maxx}
    AND bbox.ymin > ${miny}
    AND bbox.ymax < ${maxy}
  LIMIT ${limit};
`;

    // Then conn.run(sql) etc.

    // Run the query → returns a result (reader)
    const result = await conn.run(sql);

    // Fetch rows as array of objects
    const rows = await result.getRows();

    return NextResponse.json({ features: rows });
  } catch (err: any) {
    console.error('DuckDB error:', err);
    return NextResponse.json({ error: err.message || 'Query failed' }, { status: 500 });
  } finally {
    if (conn) conn.closeSync();  // Always close per-request connections
  }
}
