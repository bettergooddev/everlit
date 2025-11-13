import type { CountryField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl } from 'react-hook-form'

import {
  Select,
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
import { countryOptions } from './options'

export const Country: React.FC<
  CountryField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
    wrapperClassName?: string
    inputClassName?: string
  } & React.HTMLAttributes<HTMLDivElement>
> = ({
  name,
  control,
  errors,
  label,
  required,
  width,
  wrapperClassName,
  inputClassName,
  ...props
}) => {
  return (
    <Width width={width} className={wrapperClassName} {...props}>
      {label && <FormLabel htmlFor={name} label={label} required={required} />}
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field: { onChange, value } }) => {
          const controlledValue = countryOptions.find((t) => t.value === value)

          return (
            <Select onValueChange={(val) => onChange(val)} value={controlledValue?.value}>
              <SelectTrigger className={cn('w-full type-body', inputClassName)} id={name}>
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent>
                {countryOptions.map(({ label, value }) => {
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          )
        }}
        rules={{ required }}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
