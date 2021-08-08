import React, { createContext, useState, useEffect, useContext } from 'react';

export interface Story {
  name: string;
  startNode: number;
  passages: Passage[];
}

export interface Passage {
  pid: number;
  name: string;
  text: string;
  links: Link[];
  meta?: Record<string, string>;
}

export interface Link {
  /** either `pid` or `broken` will be set */
  pid?: number;
  /** either `pid` or `broken` will be set */
  broken?: boolean;
  name: string;
  link: string;
}

export interface AppContext {
  twine: HTMLElement | null;
  story: Story | null;
}

const AppContext = createContext<AppContext>({} as AppContext);

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: { children?: any }) {
  const [twine, setTwine] = useState<HTMLElement | null>(null);
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    const node = document.getElementsByTagName('tw-storydata')[0];
    if (!node) {
      console.log('unable to find <tw-storydata>');
      return;
    }

    setTwine(node as HTMLElement);

    const story = {
      name: node.getAttribute('name'),
      startNode: parseInt(node.getAttribute('startnode')),
      passages: [] as Partial<Passage>[],
    };

    const passageNodes = node.getElementsByTagName('tw-passagedata');
    const passages = Array.prototype.slice.call(passageNodes);
    for (const p of passages) {
      let text = p.innerHTML;

      // scan for links
      const links: Partial<Link>[] = [];
      text = text.replace(
        /\[\[(.+?)\]\]/g,
        (match: string, linkText: string) => {
          if (linkText.includes('-&gt;')) {
            const [name, link] = linkText.split('-&gt;');
            links.push({ name, link });
          } else {
            links.push({ name: linkText, link: linkText });
          }

          return '';
        }
      );

      // scan for meta
      let meta: Record<string, string>;
      let metaIndex = text.search(/\n---\n/);
      if (metaIndex > -1) {
        const metaText = text.substr(metaIndex + 5);
        text = text.substr(0, metaIndex);
        meta = {};

        for (const kvp of metaText.split(/\n/g)) {
          const [key, value] = kvp.split(':');
          meta[key.trim()] = value.trim();
        }
      }

      story.passages.push({
        pid: parseInt(p.getAttribute('pid')),
        name: p.getAttribute('name'),
        text: text.trim(),
        links: links as Link[],
        meta,
      });
    }

    const linkPidsByName: Record<string, number> = {};
    for (const passage of story.passages) {
      linkPidsByName[passage.name] = passage.pid;
    }

    for (const passage of story.passages) {
      for (const link of passage.links) {
        if (!linkPidsByName[link.link]) {
          link.broken = true;
        } else {
          link.pid = linkPidsByName[link.link];
        }
      }
    }

    setStory(story as Story);
  }, []);

  return (
    <AppContext.Provider value={{ twine, story }}>
      {children}
    </AppContext.Provider>
  );
}
