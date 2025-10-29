import { HoursType } from '@/collections/Hours/types'
import { BusinessHoursClient } from './client'

export function BusinessHours(props: { hours: HoursType; className?: string }) {
  return <BusinessHoursClient {...props} />
}

export default BusinessHours
