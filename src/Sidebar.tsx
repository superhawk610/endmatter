import React from 'react';
import { useAppContext } from './AppContext';

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

  const downloadJSON = () =>
    download(
      `${story.name || 'story'}.json`,
      JSON.stringify(story, null, 2),
      'application/json'
    );

  const downloadTwine = () =>
    download(`${story.name || 'story'}.html`, twine.outerHTML, 'text/html');

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
            style={{ background: 'red', color: 'white' }}
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
      {devButton}
      <button onClick={downloadJSON}>Download JSON</button>
      <button onClick={downloadTwine}>Download Twine</button>
    </div>
  );
}
