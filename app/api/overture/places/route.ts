import { NextResponse } from 'next/server';
import { DuckDBInstance, DuckDBConnection } from '@duckdb/node-api';

// Cache the instance (recommended — create once, reuse connections)
let cachedInstance: DuckDBInstance | null = null;

async function getInstance() {
  if (!cachedInstance) {
    cachedInstance = await DuckDBInstance.create(':memory:');

    // Load extensions once on the instance (they apply globally)
    const setupConn = await cachedInstance.connect();
    await setupConn.run('INSTALL spatial; LOAD spatial;');
    await setupConn.run('INSTALL httpfs; LOAD httpfs;');
    setupConn.closeSync();
  }
  return cachedInstance;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // const theme = searchParams.get('theme') || 'places';
  const type = searchParams.get('type') || 'place';
  const minx = searchParams.get('minx') || '-85.65';
  const maxx = searchParams.get('maxx') || '-85.5';
  const miny = searchParams.get('miny') || '42.25';
  const maxy = searchParams.get('maxy') || '42.35';
  const limit = Number(searchParams.get('limit') || '500');

  let conn: DuckDBConnection | null = null;

  try {
    const instance = await getInstance();
    conn = await instance.connect();
    // const sql = `
    //   SELECT 
    //     id,
    //     basic_category,
    //     names.primary AS name,
    //     categories.primary AS detailed_category,
    //     confidence,
    //     bbox,
    //     ST_AsGeoJSON(geometry) AS geojson
    //   FROM read_parquet('s3://overturemaps-us-west-2/release/2026-02-18.0/theme=places/type=${type}/*.parquet', hive_partitioning=1)
    //   WHERE bbox.xmin > ${minx}
    //     AND bbox.xmin < ${maxx}
    //     AND bbox.ymin > ${miny}
    //     AND bbox.ymin < ${maxy}
    //   LIMIT ${limit};
    // `;
    const sql = `
      SELECT 
        id,
        basic_category,
        names.primary AS name,
        categories.primary AS detailed_category,
        confidence,
        ST_X(geometry) AS longitude,          -- Direct lon (works on GEOMETRY)
        ST_Y(geometry) AS latitude,           -- Direct lat
        -- bbox,                               -- optional
        ST_AsGeoJSON(geometry) AS geojson     -- Direct on GEOMETRY
      FROM read_parquet('s3://overturemaps-us-west-2/release/2026-02-18.0/theme=places/type=place/*.parquet', hive_partitioning=1)
      WHERE bbox.xmin > ${minx}
        AND bbox.xmin < ${maxx}
        AND bbox.ymin > ${miny}
        AND bbox.ymin < ${maxy}
      LIMIT ${limit};
    `;

    const result = await conn.run(sql);
    const rows = await result.getRows();

    return NextResponse.json({ features: rows });
  } catch (err: any) {
    console.error('DuckDB error:', err);
    return NextResponse.json({ error: err.message || 'Query failed' }, { status: 500 });
  } finally {
    if (conn) conn.closeSync();  // Always close per-request connections
  }
}

// const sql = `
//   SELECT
//     id,
//     subtype,
//     names.primary AS name,
//     bbox,
//     ST_AsGeoJSON(geometry) AS geojson
//   FROM read_parquet('s3://overturemaps-us-west-2/release/2026-02-18.0/theme=${theme}/type=${type}/*.parquet', hive_partitioning=1)
//   WHERE bbox.xmin > ${minx}
//     AND bbox.xmax < ${maxx}
//     AND bbox.ymin > ${miny}
//     AND bbox.ymax < ${maxy}
//   LIMIT ${limit};
// `;

