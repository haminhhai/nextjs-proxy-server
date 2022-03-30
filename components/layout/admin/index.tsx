import { LayoutProps } from 'models';
import Link from 'next/link';
import * as React from 'react';

export function AdminLayout (props: LayoutProps) {
  return (
    <div>
      Admin layout
      <span>Side bar</span>

      <Link href='/'>
        <a>Home</a>
      </Link>

      <Link href='/about'>
        <a>About</a>
      </Link>

      <div>
        {props.children}
      </div>
    </div>
  );
}
