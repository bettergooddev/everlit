import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { useFormContext } from 'react-hook-form'

import { Checkbox as CheckboxUi } from '@/components/ui/checkbox'
import { cn } from '@/utilities/ui'
import React from 'react'

import { Error } from '../Error'
import { FormLabel } from '../FormLabel'
import { Width } from '../Width'

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    wrapperClassName?: string
    inputClassName?: string
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
  ...props
}) => {
  const registerProps = register(name, { required: required })
  const { setValue } = useFormContext()

  return (
    <Width width={width} className={wrapperClassName} {...props}>
      <div className={cn('flex items-center gap-2', inputClassName)}>
        <CheckboxUi
          defaultChecked={defaultValue}
          id={name}
          {...registerProps}
          onCheckedChange={(checked) => {
            setValue(registerProps.name, checked)
          }}
        />
        {label && <FormLabel htmlFor={name} label={label} required={required} />}
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
