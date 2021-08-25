import React from 'react';
import classNames from 'classnames';

import './Title.css';

const components = [null, 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export default function Title({className, level = 1, caption}) {
  const Component = components[level];
  if (!Component) throw new Error('Invalid Title level: ' + level);
  return (
    <Component className={classNames('Title', className)}>
      {caption}
    </Component>
  );
};