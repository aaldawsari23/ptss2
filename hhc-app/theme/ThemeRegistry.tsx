// theme/ThemeRegistry.tsx
// This component combines the Emotion CacheProvider with MUI's ThemeProvider
// and the Next.js `useServerInsertedHTML` hook. It ensures that styles
// generated during server rendering are injected into the HTML so that
// hydration on the client side works seamlessly. You should wrap your
// application with this component in the root `app/layout.tsx` file.

'use client';

import * as React from 'react';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import createCache from '@emotion/cache';
import theme from './theme';

export interface ThemeRegistryProps {
  /**
   * Cache options passed to Emotion. The default key is `'mui'` and styles
   * are prepended to ensure Tailwind overrides work correctly. You can
   * override these options if needed.
   */
  options?: Parameters<typeof createCache>[0];
  children: React.ReactNode;
}

export default function ThemeRegistry({ options, children }: ThemeRegistryProps) {
  const { cache, flush } = React.useMemo(() => {
    // Create a new cache for each request. The `compat` flag enables
    // backwards compatibility with older versions of emotion used by MUI.
    const cache = createCache({ key: 'mui', prepend: true, ...options });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const [, serialized] = args;
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  }, [options]);

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += (cache.inserted as any)[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}