import React, { useEffect, useState } from 'react';
import { Container } from './Container';
import { useAppContext, Passage } from './AppContext';
import { useRouter, Redirect } from './Router';

export function Story(): React.ReactElement {
  const [passage, setPassage] = useState<Passage | null>(null);
  const [missingPassage, setMissingPassage] = useState(false);
  const { story } = useAppContext();
  const { matches, navigateTo } = useRouter();

  let match = matches[0] ? parseInt(matches[0]) : -1;
  if (Number.isNaN(match)) {
    console.warn(`attempted to navigate to invalid passage "${matches[0]}"`);
    match = -1;
  }

  useEffect(() => {
    if (!story) return;

    const pid = match === -1 ? story.startNode : match;
    for (const passage of story.passages) {
      if (passage.pid === pid) {
        setPassage(passage);
        return;
      }
    }

    setMissingPassage(true);
  }, [story, match]);

  if (!passage) {
    return (
      <Container>
        {missingPassage
          ? "Uh-oh! Couldn't find that passage."
          : 'Flipping pages...'}
      </Container>
    );
  }

  if (match === -1) {
    return <Redirect to={`story/${passage.pid}`} />;
  }

  const testing = window.location.href.match(/test/);

  const goBack = () => window.history.back();

  const startOver = () => navigateTo(`story/${story.startNode}`);

  const handleClick = (pid: number) => pid && navigateTo(`story/${pid}`);

  return (
    <Container>
      <pre className="story">{passage.text}</pre>
      <div>
        {passage.links.map((link, index) => (
          <button
            key={link.pid || index}
            title={`${link.link}${link.broken ? ' (broken)' : ''}`}
            aria-label={`link named ${link.name} pointing to ${link.link}${
              link.broken ? ' that is broken' : ''
            }`}
            style={{ marginRight: '0.5rem' }}
            className={link.broken ? 'red' : ''}
            onClick={() => handleClick(link.pid)}
          >
            {link.name} {link.broken && ' (broken)'}
          </button>
        ))}
      </div>
      {match !== story.startNode && (
        <div style={{ marginTop: '1rem' }}>
          <button
            className="gray"
            style={{ marginRight: '0.5rem' }}
            onClick={goBack}
          >
            Go Back
          </button>
          <button
            className="gray"
            style={{ marginRight: '0.5rem' }}
            onClick={startOver}
          >
            Start Over
          </button>
        </div>
      )}
      {testing && (
        <div style={{ marginTop: '1rem' }}>
          <pre className="document">
            <span style={{ opacity: 0.7 }}>/* passage meta */</span>
            {'\n\n'}
            {JSON.stringify(passage.meta, null, 2) || 'none'}
          </pre>
        </div>
      )}
    </Container>
  );
}
