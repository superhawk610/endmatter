import React from 'react';
import { useAppContext } from './AppContext';
import { useRouter } from './Router';

function download(filename: string, contents: string, mimeType = 'text/plain') {
  const el = document.createElement('a');
  el.setAttribute(
    'href',
    `data:${mimeType};charset=utf-8,${encodeURIComponent(contents)}`
  );
  el.setAttribute('download', filename);
  el.style.display = 'none';
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
}

export function Sidebar() {
  const { twine, story } = useAppContext();
  const { navigateTo } = useRouter();

  const downloadJSON = () =>
    download(
      `${story.name || 'story'}.json`,
      JSON.stringify(story, null, 2),
      'application/json'
    );

  const downloadTwine = () =>
    download(`${story.name || 'story'}.html`, twine.outerHTML, 'text/html');

  const playStory = () => navigateTo('story');

  const viewJSON = () => navigateTo('json');

  let devButton = null;
  if (process.env.NODE_ENV !== 'production') {
    if (!window.location.href.match(/dev/)) {
      devButton = (
        <>
          <p style={{ textAlign: 'center' }}>
            You're viewing a blank template; to view an example story with some
            content, click the button below.
          </p>
          <button
            className="red"
            onClick={() => (window.location.href = '/dev.html')}
          >
            Dev Example
          </button>
          <div style={{ height: '1rem' }} />
        </>
      );
    }
  }

  return (
    <div className="sidebar">
      <p className="header">endmatter &middot;&middot;&middot;</p>
      <p className="story-title">
        <span style={{ opacity: 0.7 }}>viewing</span>{' '}
        {story?.name || <em>untitled</em>}
      </p>
      {devButton}
      <button onClick={downloadJSON}>Download JSON</button>
      <button onClick={downloadTwine}>Download Twine</button>
      <p style={{ fontSize: '0.8rem', opacity: 0.5, textAlign: 'center' }}>
        JSON is used by the game engine, while Twine is used to import into the
        story editor (you might need both).
      </p>
      <div style={{ height: '1rem' }} />
      <button className="gray" onClick={playStory}>
        Play Story
      </button>
      <button className="gray" onClick={viewJSON}>
        View JSON
      </button>
    </div>
  );
}
