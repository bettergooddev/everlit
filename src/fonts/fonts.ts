import localFont from 'next/font/local'

export const calvino = localFont({
  src: [
    {
      path: './calvino/calvino-variable-regular.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: './calvino/calvino-variable-italic.woff2',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-calvino',
})

export const figtree = localFont({
  src: [
    {
      path: './figtree/Figtree-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: './figtree/Figtree-Italic-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-figtree',
})
