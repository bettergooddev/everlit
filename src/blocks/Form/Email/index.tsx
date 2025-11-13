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
  }
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
}) => {
  return (
    <Width width={width} className={wrapperClassName}>
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
        {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required })}
      />

      {errors?.[name] && <Error name={name} />}
    </Width>
  )
}
