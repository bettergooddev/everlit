import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import { cn } from '@/utilities/ui'
import React from 'react'

import { Error } from '../Error'
import { FormLabel } from '../FormLabel'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    rows?: number
    wrapperClassName?: string
    inputClassName?: string
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  } & React.HTMLAttributes<HTMLDivElement>
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required,
  rows = 3,
  width,
  wrapperClassName,
  inputClassName,
  onFocus,
  onBlur,
  onChange,
  ...props
}) => {
  const registerProps = register(name, { required: required })

  return (
    <Width width={width} className={wrapperClassName} {...props}>
      {label && <FormLabel htmlFor={name} label={label} required={required} />}

      <TextAreaComponent
        className={cn(
          'rounded-none border-none bg-card shadow-md type-body placeholder:opacity-50 min-h-32',
          inputClassName,
        )}
        defaultValue={defaultValue}
        id={name}
        placeholder={label}
        rows={rows}
        {...registerProps}
        onFocus={onFocus}
        onBlur={(e) => {
          registerProps.onBlur?.(e)
          onBlur?.(e)
        }}
        onChange={(e) => {
          registerProps.onChange?.(e)
          onChange?.(e)
        }}
      />

      {errors[name] && <Error name={name} />}
    </Width>
  )
}
