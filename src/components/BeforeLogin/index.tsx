import React from 'react'
import Image from 'next/image'

const BeforeLogin: React.FC = () => {
  return (
    <div
      className="before-login"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        marginBottom: '4rem',
      }}
    >
      <Image
        src="/brand/everlit-logo.svg"
        alt="Everlit Logo"
        width={300}
        height={75}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  )
}

export default BeforeLogin
