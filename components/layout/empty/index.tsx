import { LayoutProps } from 'models';
import React from 'react';

export function EmptyLayout (props: LayoutProps) {
  return <>{props.children}</>
}
