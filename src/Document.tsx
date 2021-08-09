import React from 'react';
import { Container } from './Container';
import { useAppContext } from './AppContext';

export function Document() {
  const { story } = useAppContext();

  return (
    <Container>
      <pre className="document">
        {story ? JSON.stringify(story, null, 2) : 'Flipping pages...'}
      </pre>
    </Container>
  );
}
