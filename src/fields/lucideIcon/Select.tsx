'use client'

import * as React from 'react'
import { SelectInput, useField } from '@payloadcms/ui'
import { OptionObject } from 'payload'
import { DynamicIcon } from 'lucide-react/dynamic'
import iconNodes from 'lucide-static/icon-nodes.json'

export const lucideIconOptions = () => {
  const options: OptionObject[] = []

  // Get all icon names from lucide-static
  Object.keys(iconNodes).forEach((iconName) => {
    options.push({
      label: iconName.charAt(0).toUpperCase() + iconName.slice(1).replace(/-/g, ' '), // Format label nicely
      value: iconName,
    })
  })

  // Sort options alphabetically by label
  return options.sort((a, b) => {
    const labelA = typeof a.label === 'string' ? a.label : ''
    const labelB = typeof b.label === 'string' ? b.label : ''
    return labelA.localeCompare(labelB)
  })
}

type LucideSelectComponentProps = {
  path: string
}

export const Select: React.FC<LucideSelectComponentProps> = ({ path }) => {
  const { value, setValue } = useField<string>({ path })

  return (
    <div
      style={{
        marginBottom: '12px',
      }}
    >
      <SelectInput
        path={path}
        name={path}
        value={value}
        // required={true}
        required={false}
        label={'Icon'}
        description={'You can find all icons on the page https://lucide.dev/icons'}
        hasMany={false}
        options={lucideIconOptions()}
        onChange={(option) => {
          if (option && !Array.isArray(option) && typeof option.value === 'string') {
            setValue(option.value)
          }
        }}
      />
      {value && (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '8px',
            fontSize: '14px',
          }}
        >
          Icon Preview: <DynamicIcon name={value as any} size={20} />
        </span>
      )}
    </div>
  )
}
