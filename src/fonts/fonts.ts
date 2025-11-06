import localFont from 'next/font/local'

export const calvino = localFont({
  src: [
    {
      path: './calvino/Calvino-Thin-trial.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './calvino/Calvino-Thin-Italic-trial.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: './calvino/Calvino-Extralight-trial.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './calvino/Calvino-Extralight-Italic-trial.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: './calvino/Calvino-Light-trial.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './calvino/Calvino-Light-Italic-trial.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: './calvino/Calvino-Regular-trial.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './calvino/Calvino-Italic-trial.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './calvino/Calvino-Book-trial.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './calvino/Calvino-Book-Italic-trial.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './calvino/Calvino-Semibold-trial.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './calvino/Calvino-Semibold-Italic-trial.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: './calvino/Calvino-Bold-trial.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './calvino/Calvino-Bold-Italic-trial.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: './calvino/Calvino-Extrabold-trial.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './calvino/Calvino-Extrabold-Italic-trial.ttf',
      weight: '800',
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
