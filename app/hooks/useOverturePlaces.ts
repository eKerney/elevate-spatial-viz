import { useState, useEffect, useCallback } from 'react';
import { OvertureQueryParams, OvertureResponse } from '../types';

export function useOvertureData(initialParams?: Partial<OvertureQueryParams>) {
  const [params, setParams] = useState<OvertureQueryParams>({
    theme: 'places',
    type: 'place',
    minx: '-85.65',
    maxx: '-85.45',
    miny: '42.25',
    maxy: '42.35',
    limit: '10',
    ...initialParams,
  });

  const [features, setFeatures] = useState<OvertureResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const query = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (value != null) {
        query.set(key, String(value));
      }
    }

    try {
      const res = await fetch(`/api/overture/places?${query}`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      console.log(data.features.slice(0, 5))
      setFeatures(data.features || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateParams = (newParams: Partial<OvertureQueryParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  return { features, loading, error, updateParams, refetch: fetchData };
}

