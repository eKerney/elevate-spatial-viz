import { NextRequest, NextResponse } from 'next/server';
import { csv, dsv } from 'd3-fetch';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const maxy = searchParams.get('maxy') || '42.35';

  const url = 'https://raw.githubusercontent.com/OvertureMaps/schema/refs/heads/main/docs/schema/concepts/by-theme/places/overture_categories.csv'

  try {
    const response = await dsv(';', url, (d) => {
      return {
        categoryCode: d['Category code'],
        overtureTaxonomy: (d[' Overture Taxonomy'].trimStart()).replaceAll(/[\[\]]/g, '').split(',')
      }
    })

    if (!response) {
      throw new Error(`categories error: ${response}`);
    }


    return NextResponse.json(response || []);
  } catch (error) {
    console.error('', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
