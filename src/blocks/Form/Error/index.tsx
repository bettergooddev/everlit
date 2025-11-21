'use client'

import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { AlertCircle } from 'lucide-react'
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
    <div
      className={cn('pt-3 flex items-center gap-2 text-foreground-500/75 !type-caption', className)}
    >
      <AlertCircle className="h-4 w-4 shrink-0" />
      <span>{(errors[name]?.message as string) || defaultMessage}</span>
    </div>
  )
}
