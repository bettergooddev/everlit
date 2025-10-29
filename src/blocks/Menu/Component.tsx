'use client'

import type { MenuBlock as MenuBlockType, Menu } from '@/payload-types'
import { IconSelect } from '../../components/ui/icon-select'
import { useState } from 'react'
import { PDFViewer } from '@/components/ui/pdf-viewer'

export const MenuBlock: React.FC<MenuBlockType> = ({ heading, subheading, menus: menuProps }) => {
  const menus =
    menuProps?.filter((menu): menu is Menu => typeof menu === 'object' && menu !== null) || []

  const [selectedMenuId, setSelectedMenuId] = useState<string | undefined>(menus[0]?.id)

  const activeMenu = menus.find((menu) => menu.id === selectedMenuId)
  const activeMenuUrl = typeof activeMenu?.pdf === 'object' ? (activeMenu?.pdf).url : ''

  return (
    <div className="max-w-2xl px-4 mx-auto -mt-[6rem] md:-mt-48" data-theme="pizza">
      {menus.length > 1 && (
        <>
          <h5 className="type-h5 font-bold mb-2">Select a Menu:</h5>
          <IconSelect
            items={menus}
            selected={selectedMenuId}
            onChange={setSelectedMenuId}
            className="shadow-md"
          />
        </>
      )}
      {activeMenuUrl ? (
        <PDFViewer
          src={activeMenuUrl}
          className="mt-6"
          pageClassName="shadow-lg border-white border-[10px]"
        />
      ) : (
        <div>No menu selected</div>
      )}
    </div>
  )
}
