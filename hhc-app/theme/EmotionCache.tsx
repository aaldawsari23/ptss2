// theme/EmotionCache.tsx
// Utility to create a fresh emotion cache. This is used by the ThemeRegistry
// component to ensure that styles are rendered correctly on both the server
// and client when using Next.js with the App Router. By setting `prepend: true`,
// emotion inserts its styles at the beginning of the `<head>`, allowing
// Tailwind CSS (which is loaded later) to override MUI styles when necessary.

import createCache from '@emotion/cache';

export default function createEmotionCache() {
  return createCache({ key: 'mui', prepend: true });
}