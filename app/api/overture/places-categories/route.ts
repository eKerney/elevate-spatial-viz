import { NextRequest, NextResponse } from 'next/server';
import { csv } from 'd3-fetch';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const maxy = searchParams.get('maxy') || '42.35';

  const url = 'https://raw.githubusercontent.com/OvertureMaps/schema/refs/heads/main/docs/schema/concepts/by-theme/places/overture_categories.csv'

  try {
    // const response = await fetch(url, { headers: {} })
    const response = await csv(url);


    // csv('/path/to/file.csv').then((data) => {
    //   console.log(data); // [{"Hello": "world"}, …]
    // });lkk
    if (!response) {
      throw new Error(`categories error: ${response}`);
    }


    // if (response.error) throw new Error(data.error.message);
    console.log('response', response);
    return NextResponse.json(response || []);
  } catch (error) {
    console.error('', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}


