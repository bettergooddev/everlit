'use client'

import { useRowLabel } from '@payloadcms/ui'

interface ButtonData {
  label?: string
}

export const PrimaryButtonRowLabel = () => {
  const { data } = useRowLabel<ButtonData>()

  return <>{data?.label || 'Primary Button'}</>
}

export const SecondaryButtonRowLabel = () => {
  const { data } = useRowLabel<ButtonData>()

  return <>{data?.label || 'Secondary Button'}</>
}

export const TertiaryButtonRowLabel = () => {
  const { data } = useRowLabel<ButtonData>()

  return <>{data?.label || 'Tertiary Button'}</>
}
