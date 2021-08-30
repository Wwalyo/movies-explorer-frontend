import {useState, useEffect} from 'react';
import useDebounce from './useDebounce';

const processQuery = (queries) => {
  if (typeof queries === 'string') return window.matchMedia(queries);
  return Object.keys(queries).map(key => ({name: key, value: processQuery(queries[key])}));
};

const mapQuery = (queries) => {
  if (Array.isArray(queries)) {
    return queries.reduce((acc, item) => (acc[item.name] = item.value.matches, acc), {});
  } else return queries.matches;
};

export default function useMediaQuery(queries) {
  const mqls = processQuery(queries);
  const [state, setState] = useState(mapQuery(mqls));
  const result = useDebounce(state, 16);
  useEffect(() => {
    let cancelled = false;
    const mqls = processQuery(queries);
    const handleChange = (e) => {
      if (cancelled) return;
      setState(mapQuery(mqls));
    }
    mqls.forEach(mql => mql.value.addListener(handleChange));
    return () => {
      mqls.forEach(mql => mql.value.removeListener(handleChange));
      cancelled = true;
    };
  }, [queries]);
  return result;
};
