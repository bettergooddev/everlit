'use client'
import { Navigation } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<
    NonNullable<Navigation['navItems']>[number] | NonNullable<Navigation['actions']>[number]
  >()

  let label = 'Row'

  if (data?.data?.navigationItem) {
    const navItem = data.data.navigationItem

    if (navItem.type === 'link' && navItem.link?.label) {
      label = `${navItem.type === 'link' ? 'Link' : 'Dropdown'} ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${navItem.link.label}`
    } else if (navItem.type === 'dropdown' && navItem.dropdown?.label) {
      label = `Dropdown ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${navItem.dropdown.label}`
    }
  }

  return <div>{label}</div>
}
