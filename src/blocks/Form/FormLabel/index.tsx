import { Label } from '@/components/ui/label'
import React from 'react'

interface FormLabelProps {
  htmlFor: string
  label: string
  required?: boolean
}

export const FormLabel: React.FC<FormLabelProps> = ({ htmlFor, label, required }) => {
  return (
    <Label className="type-body" htmlFor={htmlFor}>
      {label}

      {required && (
        <span className="required">
          * <span className="sr-only">(required)</span>
        </span>
      )}
    </Label>
  )
}



