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
    <div
      className={cn(
        'mb-8 md:mb-16 flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-0 gap-6 md:gap-10',
        className,
      )}
    >
      <div className="flex-col">
        {heading && <h2 className="type-h2 text-left text-foreground-100">{heading}</h2>}

        {subheading && (
          <p className="opacity-75 type-body text-foreground-100 max-w-[52ch] mt-4">{subheading}</p>
        )}
      </div>
      {actions && (
        <div className="flex flex-col sm:flex-row gap-4 lg:justify-center mt-auto">
          {actions.map((action) => (
            <CMSLink key={action.id} {...action.link} />
          ))}
        </div>
      )}
    </div>
  )
}
