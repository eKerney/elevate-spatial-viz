import { useState, useEffect, useCallback } from 'react';
import { OvertureCategories } from '../types';

export function useOvertureCategories() {
  const [data, setData] = useState<Array<OvertureCategories>>([]);
  const [loadingCat, setLoading] = useState(true);
  const [errorCat, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/overture/places-categories`);
      if (!res.ok) throw new Error('Fetch failed');
      const resJSON = await res.json();
      console.log(resJSON.slice(0, 5))
      setData(resJSON || []);
    } catch (err: any) {
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return { data, loadingCat, errorCat };
}

