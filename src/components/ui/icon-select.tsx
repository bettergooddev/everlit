'use client'

import { DynamicIcon } from 'lucide-react/dynamic'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/utilities/ui'

interface IconSelectItem {
  id: string
  name: string
  lucideIcon?: string | null
}

interface IconSelectProps {
  items: IconSelectItem[]
  selected?: string
  onChange?: (id: string) => void
  className?: string
}

export const IconSelect: React.FC<IconSelectProps> = ({ items, selected, onChange, className }) => {
  const selectedId = selected ?? items[0]?.id
  const selectedItem = items.find((item) => item.id === selectedId) || null

  return (
    <Select value={selectedId} onValueChange={(value) => onChange?.(value)}>
      <SelectTrigger
        className={cn('w-full bg-primary text-background h-14 rounded-none', className)}
      >
        <SelectValue>
          {selectedItem && (
            <div className="flex items-center pl-1 gap-3 text-background">
              {selectedItem.lucideIcon && (
                <DynamicIcon name={selectedItem.lucideIcon as any} size={24} strokeWidth={2.25} />
              )}
              <div className="flex flex-col items-start">
                <span className="type-body text-background -mb-1">{selectedItem.name}</span>
              </div>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>

      <SelectContent className="rounded-none" data-theme="pizza">
        {items.map((item) => (
          <SelectItem
            key={item.id}
            value={item.id}
            className="focus:bg-secondary py-3 rounded-none"
          >
            <div className="flex items-center pl-1 gap-2">
              {item.lucideIcon && <DynamicIcon name={item.lucideIcon as any} size={20} />}
              <div className="flex flex-col items-start">
                <span className="type-body text-foreground -mb-1">{item.name}</span>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
