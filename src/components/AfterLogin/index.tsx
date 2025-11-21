import React from 'react'
import Image from 'next/image'

const AfterLogin: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '2rem',
        fontSize: '0.875rem',
        color: '#FFF',
        opacity: 0.75,
      }}
    >
      <span>Powered by</span>
      <a
        href="https://payloadcms.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <Image
          src="/brand/PayloadLogoWhite.svg"
          alt="Payload CMS"
          width={80}
          height={18}
          style={{
            height: 'auto',
            filter: 'brightness(0.75)',
          }}
        />
      </a>
    </div>
  )
}

export default AfterLogin
