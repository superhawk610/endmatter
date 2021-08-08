import React from 'react';
import { useAppContext } from './AppContext';

export function Document() {
  const { story } = useAppContext();

  return (
    <div className="document-container">
      <div style={{ height: '100%' }}>
        <div style={{ paddingBottom: '1px' }}>
          <pre className="document">
            {story ? JSON.stringify(story, null, 2) : 'Flipping pages...'}
          </pre>
        </div>
      </div>
    </div>
  );
}
