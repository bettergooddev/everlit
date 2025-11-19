import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'

import { cn } from '@/utilities/ui'
import { buttonVariants } from './index'
import { ButtonBlurShape } from '@/paths/button-blur-shape'

function SecondaryButton({
  className,
  size,
  children,
  ...props
}: Omit<React.ComponentProps<'button'>, 'variant'> &
  Omit<VariantProps<typeof buttonVariants>, 'variant'>) {
  return (
    <button
      data-slot="button"
      className={cn(
        'group relative overflow-hidden bg-[#DF612B]/5 hover:bg-[#DF612B]/10 transition-colors',
        buttonVariants({ variant: 'secondary', size, className }),
      )}
      {...props}
    >
      <div className="size-full flex items-center justify-center">
        <div className={cn('!absolute z-[-1] size-full')}>
          <ButtonBlurShape
            img
            className="object-left size-full scale-110 blur-[6px] brightness-100 group-hover:brightness-125 transition-[brightness]"
          />
        </div>

        <div className="relative z-10">{children}</div>

        <div className="border border-foreground-100/10 absolute inset-0" />
      </div>
    </button>
  )
}

export { SecondaryButton }
