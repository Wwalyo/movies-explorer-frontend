import {useEffect, useState} from 'react';

export default function useRequest(handler, params) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const result = await handler((params || [])[0]);
        if (cancelled) return;
        setError(null);
        setResponse(result);
        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        setError(err);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [setLoading, setResponse, setError, handler, ...params]);
  return {loading, response, error};
};
