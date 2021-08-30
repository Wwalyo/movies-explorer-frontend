import {useEffect, useRef, useState} from 'react';

export default function useDebounce(value, delay) {
  const [state, setState] = useState(value);
  const refValue = useRef(value);
  const refTimer = useRef(null);
  useEffect(() => {
    refValue.current = value;
    if (refTimer.current) return;
    refTimer.current = setTimeout(() => {
      refTimer.current = null;
      setState(refValue.current);
    }, delay);
    return () => {
      clearTimeout(refTimer.current);
      refTimer.current = null;
    };
  }, [value, delay]);
  return state;
};
