import {useEffect, useState} from 'react';

const optionsToMQLs = (options, listener) => {
  const result = Object.keys(options)
    .map(key => ({name: key, mql: window.matchMedia(options[key])}));
  if (listener) result.forEach(item => item.mql.addEventListener('change', listener));
  return result;
};

const MQLsToState = (mqls) => {
  const item = mqls.filter(item => item.mql.matches)[0];
  if (item) return item.name;
};

export default function useScreenSize(options) {
  const [state, setState] = useState(MQLsToState(optionsToMQLs(options)));
  useEffect(() => {
    let cancelled = false;
    const mqls = optionsToMQLs(options, handleChange);
    let timer = null;
    //
    function handleChange(e) {
      if (cancelled) return;
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        setState(MQLsToState(mqls))
      }, 10);
    }
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      mqls.forEach(item => item.mql.removeEventListener('change', handleChange));
    };
  }, [options, setState]);
  return state;
};
