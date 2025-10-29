const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // Domain redirects
  const domainRedirects = [
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'www.mychosenpizza.com',
        },
      ],
      destination: 'https://www.mychosencafe.com/pizza/:path*',
      permanent: true,
    },
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'mychosenpizza.com',
        },
      ],
      destination: 'https://www.mychosencafe.com/pizza/:path*',
      permanent: true,
    },
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'www.mychosensugarshack.com',
        },
      ],
      destination: 'https://www.mychosencafe.com/sugar-shack/:path*',
      permanent: true,
    },
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'mychosensugarshack.com',
        },
      ],
      destination: 'https://www.mychosencafe.com/sugar-shack/:path*',
      permanent: true,
    },
  ]

  const redirects = [internetExplorerRedirect, ...domainRedirects]

  return redirects
}

export default redirects
