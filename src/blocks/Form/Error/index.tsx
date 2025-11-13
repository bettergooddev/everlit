'use client'

import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utilities/ui'

export const Error = ({
  name,
  className,
  defaultMessage = 'This field is required',
}: {
  name: string
  className?: string
  defaultMessage?: string
}) => {
  const {
    formState: { errors },
  } = useFormContext()
  return (
    <div className={cn('mt-2 text-red-500 type-caption', className)}>
      {(errors[name]?.message as string) || defaultMessage}
    </div>
  )
}
