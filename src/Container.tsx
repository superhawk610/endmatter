import React from 'react';

export function Container({ children }: { children?: any }) {
  return (
    <div className="container">
      <div style={{ height: '100%' }}>
        <div style={{ paddingBottom: '1px' }}>{children}</div>
      </div>
    </div>
  );
}
