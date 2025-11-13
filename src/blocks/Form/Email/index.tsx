import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { cn } from '@/utilities/ui'
import React from 'react'

import { Error } from '../Error'
import { FormLabel } from '../FormLabel'
import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
    errors?: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    wrapperClassName?: string
    inputClassName?: string
    placeholder?: string
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
  placeholder,
  onFocus,
  onBlur,
  onChange,
  ...props
}) => {
  const registerProps = register(name, { pattern: /^\S[^\s@]*@\S+$/, required })

  return (
    <Width width={width} className={wrapperClassName} {...props}>
      {label && <FormLabel htmlFor={name} label={label} required={required} />}
      <Input
        className={cn(
          'border-none shadow-md bg-card type-body placeholder:opacity-50',
          inputClassName,
        )}
        defaultValue={defaultValue}
        id={name}
        placeholder={placeholder !== undefined ? placeholder : label}
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
      />

      {errors?.[name] && <Error name={name} />}
    </Width>
  )
}
