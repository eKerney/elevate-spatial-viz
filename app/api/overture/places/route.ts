import { NextResponse } from 'next/server';
import { DuckDBInstance, DuckDBConnection, DuckDBValue } from '@duckdb/node-api';
import { OverturePlaces } from '@/app/types';
import { parse } from 'path/win32';

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
    const parsedData: Array<OverturePlaces> = rows.map((d) => {
      return {
        placeID: String(d[0]),
        categoryCode: String(d[1]),
        placeName: String(d[2]),
        taxonomy: String(d[3]),
        certainty: Number(d[4]),
        longitude: Number(d[5]),
        latitude: Number(d[6]),
        geoJSONgeometryString: String(d[7]),
      }
    })

    return NextResponse.json({ features: parsedData });
  } catch (err: any) {
    console.error('DuckDB error:', err);
    return NextResponse.json({ error: err.message || 'Query failed' }, { status: 500 });
  } finally {
    if (conn) conn.closeSync();
  }
}

