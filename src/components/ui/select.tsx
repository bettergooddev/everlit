'use client'

import { cn } from '@/utilities/ui'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import * as React from 'react'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger: React.FC<
  { ref?: React.Ref<HTMLButtonElement> } & React.ComponentProps<typeof SelectPrimitive.Trigger>
> = ({ children, className, ref, ...props }) => (
  <div className={cn('relative group', className)}>
    <div className="absolute inset-0 bg-gradient-to-br from-background-500/40 to-background-500/20 rounded-xs pointer-events-none transition-opacity duration-200 group-hover:opacity-0" />
    <div className="absolute inset-0 bg-gradient-to-br from-background-500/60 to-background-500/40 rounded-xs pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
    <SelectPrimitive.Trigger
      className={cn(
        'relative flex h-10 w-full items-center justify-between rounded-xs bg-transparent px-3 py-2 text-base ring-offset-background text-inherit placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground-500 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm [&>span]:line-clamp-1',
      )}
      ref={ref}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-5 w-5" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    <div className="absolute inset-0 border-[1px] border-foreground-100/10 rounded-xs pointer-events-none" />
  </div>
)

const SelectScrollUpButton: React.FC<
  { ref?: React.Ref<HTMLDivElement> } & React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>
> = ({ className, ref, ...props }) => (
  <SelectPrimitive.ScrollUpButton
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    ref={ref}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
)

const SelectScrollDownButton: React.FC<
  { ref?: React.Ref<HTMLDivElement> } & React.ComponentProps<
    typeof SelectPrimitive.ScrollDownButton
  >
> = ({ className, ref, ...props }) => (
  <SelectPrimitive.ScrollDownButton
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    ref={ref}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
)

const SelectContent: React.FC<
  {
    ref?: React.Ref<HTMLDivElement>
  } & React.ComponentProps<typeof SelectPrimitive.Content>
> = ({ children, className, position = 'popper', ref, ...props }) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded bg-background/50 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      style={{
        WebkitBackdropFilter: 'blur(12px)',
        backdropFilter: 'blur(12px)',
      }}
      position={position}
      ref={ref}
      {...props}
    >
      <div className="absolute inset-0 border-[1px] border-foreground-500/10 rounded pointer-events-none" />
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
)

const SelectLabel: React.FC<
  { ref?: React.Ref<HTMLDivElement> } & React.ComponentProps<typeof SelectPrimitive.Label>
> = ({ className, ref, ...props }) => (
  <SelectPrimitive.Label
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    ref={ref}
    {...props}
  />
)

const SelectItem: React.FC<
  { ref?: React.Ref<HTMLDivElement>; value: string } & React.ComponentProps<
    typeof SelectPrimitive.Item
  >
> = ({ children, className, ref, ...props }) => (
  <SelectPrimitive.Item
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
)

const SelectSeparator: React.FC<
  { ref?: React.Ref<HTMLDivElement> } & React.ComponentProps<typeof SelectPrimitive.Separator>
> = ({ className, ref, ...props }) => (
  <SelectPrimitive.Separator
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    ref={ref}
    {...props}
  />
)

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
