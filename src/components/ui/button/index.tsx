import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utilities/ui'
import { DefaultButton } from './default'
import { SecondaryButton } from './secondary'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xs type-body transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: '[&_*]:text-no-underline',
        secondary: '[&_*]:text-no-underline ',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20',
        outline:
          'border-[0.0625rem] border-foreground-100 bg-foreground-100/5 shadow-xs hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-foreground-100 !type-caption font-light underline-offset-4 hover:underline',
        inline: '',
        none: '',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  ref?: React.Ref<HTMLButtonElement>
}

function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
  if (variant === 'default' || variant === undefined) {
    return <DefaultButton className={className} size={size} {...props} />
  }

  if (variant === 'secondary') {
    return <SecondaryButton className={className} size={size} {...props} />
  }

  return (
    <button
      data-slot="button"
      className={cn(variant === 'none' ? className : buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
