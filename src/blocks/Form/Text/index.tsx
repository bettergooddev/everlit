import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { cn } from '@/utilities/ui'
import React from 'react'

import { Error } from '../Error'
import { FormLabel } from '../FormLabel'
import { Width } from '../Width'

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    wrapperClassName?: string
    inputClassName?: string
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  } & React.HTMLAttributes<HTMLDivElement>
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required,
  width,
  wrapperClassName,
  inputClassName,
  onFocus,
  onBlur,
  onChange,
  ...props
}) => {
  const registerProps = register(name, { required })

  // Extract event handlers from props that should go to the input
  const { onMouseEnter, onMouseLeave, ...widthProps } = props

  return (
    <Width width={width} className={wrapperClassName}>
      {label && <FormLabel htmlFor={name} label={label} required={required} />}
      <Input
        className={cn('border-none shadow-md type-body placeholder:opacity-50', inputClassName)}
        defaultValue={defaultValue}
        id={name}
        placeholder={label}
        type="text"
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
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
