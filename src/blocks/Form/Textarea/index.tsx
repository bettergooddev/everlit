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
  }
> = ({ name, defaultValue, errors, label, register, required, rows = 3, width, wrapperClassName, inputClassName }) => {
  return (
    <Width width={width} className={wrapperClassName}>
      {label && <FormLabel htmlFor={name} label={label} required={required} />}

      <TextAreaComponent
        className={cn('rounded-none border-none bg-card shadow-md type-body placeholder:opacity-50 min-h-32', inputClassName)}
        defaultValue={defaultValue}
        id={name}
        placeholder={label}
        rows={rows}
        {...register(name, { required: required })}
      />

      {errors[name] && <Error name={name} />}
    </Width>
  )
}
