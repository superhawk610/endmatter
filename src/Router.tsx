import React, {
  Children,
  isValidElement,
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

export interface RouterContext {
  hash: string;
  matches: string[] | null;
  navigateTo: (hash: string) => void;
}

const RouterContext = createContext<RouterContext>({} as RouterContext);

export function useRouter() {
  return useContext(RouterContext);
}

export function RouterProvider({ children }: { children?: any }) {
  const prefixRef = useRef('');
  const [hash, setHash] = useState(() => {
    // since we're working inside of Twine's hash router, we have to take
    // care to preseve whatever routing prefix they've already set up
    const hash = window.location.hash.slice(1);

    const secondHashIndex = hash.indexOf('#');
    if (secondHashIndex > -1) {
      // if we've already performed some navigation, there will be a second #
      prefixRef.current = hash.slice(0, secondHashIndex);
      return hash.slice(secondHashIndex + 1);
    } else {
      // otherwise, store the whole hash as the prefix
      prefixRef.current = hash;
      return '';
    }
  });

  const navigateTo = (newHash: string) => {
    setHash(newHash);
    window.history.pushState(
      null,
      document.title,
      `#${prefixRef.current}#${newHash}`
    );
  };

  useEffect(() => {
    const handler = (e: any) => {
      // remove leading '#'
      const hash = e.target.location.hash.slice(1);

      const secondHashIndex = hash.indexOf('#');
      if (secondHashIndex > -1) {
        // we're still inside our own hash router
        setHash(hash.slice(secondHashIndex + 1));
      } else {
        // we've moved into Twine's router, so reset our hash
        setHash('');
      }
    };

    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  return (
    <RouterContext.Provider value={{ hash, matches: null, navigateTo }}>
      {children}
    </RouterContext.Provider>
  );
}

/**
 * Expects `children` to be an array of `Route` components, and will render
 * the first matching child, or nothing if no children match.
 */
export function Router({ children }: { children?: any }) {
  const routerCtx = useRouter();
  const { hash } = routerCtx;

  let matches = null;
  let activeRoute: any | null = null;
  Children.forEach(children, child => {
    if (activeRoute || !isValidElement(child)) {
      return;
    }

    const { match } = child.props as RouteProps;
    if (!match || (typeof match === 'string' && hash === match)) {
      activeRoute = child;
      return;
    }

    if (typeof match !== 'string') {
      const routeMatches = hash.match(match);
      if (routeMatches) {
        matches = routeMatches.slice(1);
        activeRoute = child;
      }
    }
  });

  return (
    <RouterContext.Provider value={{ ...routerCtx, matches }}>
      {activeRoute}
    </RouterContext.Provider>
  );
}

export interface RouteProps {
  match?: RegExp | string;
  children?: any;
}

/**
 * Will render when `match` matches the current router hash, or will always
 * render if `match` isn't provided (actual rendering logic is handled by
 * parent `<Router />` component). If a string is provided for `match`, will
 * only match when the hash is exactly that string.
 */
export function Route({ children }: RouteProps) {
  return <>{children}</>;
}

/**
 * When rendered, redirect the user to the given route hash.
 */
export function Redirect({ to }: { to: string }): React.ReactElement {
  const { navigateTo } = useRouter();

  useEffect(() => {
    navigateTo(to);
  });

  return null;
}
