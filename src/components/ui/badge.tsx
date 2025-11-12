import * as React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

function Badge({ children }: BadgeProps) {
  return (
    <div
      className="type-caption font-light capitalize px-3 py-1 rounded-xs w-min whitespace-nowrap"
      style={{
        background:
          'linear-gradient(to bottom right, rgba(17, 88, 102, 0.6), rgba(77, 120, 130, 0.1))',
      }}
    >
      {children}
    </div>
  )
}

export { Badge }
