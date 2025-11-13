import type { SelectField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl } from 'react-hook-form'

import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/utilities/ui'
import React from 'react'
import { Controller } from 'react-hook-form'

import { Error } from '../Error'
import { FormLabel } from '../FormLabel'
import { Width } from '../Width'

export const Select: React.FC<
  SelectField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
    wrapperClassName?: string
    inputClassName?: string
  }
> = ({ name, control, errors, label, options, required, width, defaultValue, wrapperClassName, inputClassName }) => {
  return (
    <Width width={width} className={wrapperClassName}>
      {label && <FormLabel htmlFor={name} label={label} required={required} />}
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field: { onChange, value } }) => {
          const controlledValue = options.find((t) => t.value === value)

          return (
            <SelectComponent onValueChange={(val) => onChange(val)} value={controlledValue?.value}>
              <SelectTrigger className={cn('w-full type-body', inputClassName)} id={name}>
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent>
                {options.map(({ label, value }) => {
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </SelectComponent>
          )
        }}
        rules={{ required }}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
