import { cn } from '@/utilities/ui'
import { CallToActionBlock, FeaturesBlock } from '@/payload-types'
import { CMSLink } from '../Link'

export const Heading = ({
  heading,
  subheading,
  actions,
  className,
}: {
  heading?: string | null
  subheading?: string | null
  actions?: FeaturesBlock['actions']
  className?: string
}) => {
  return (
    <div className={cn('mb-16 flex flex-row items-center justify-between', className)}>
      <div>
        {heading && <h2 className="type-h2 text-left text-foreground-100">{heading}</h2>}

        {subheading && (
          <p className="opacity-75 type-body text-center text-foreground-100 mx-auto max-w-[52ch] mt-4">
            {subheading}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {actions.map((action) => (
            <CMSLink key={action.id} {...action.link} />
          ))}
        </div>
      )}
    </div>
  )
}
