'use client'

import Link from 'next/link'
import { Button } from './ui/button'

function WebsiteTag() {
  const currentYear = new Date().getFullYear()
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME

  return (
    <div className="flex flex-row items-center gap-8 opacity-65">
      <p className="text-foreground-100 type-caption font-normal">
        © {currentYear} {companyName}
      </p>
      <p className="flex items-center gap-1 text-foreground-100 [&_*]:type-caption [&_*]:font-normal">
        <span>Website By:</span>
        <Button
          variant="link"
          asChild
          className="h-auto p-0 font-normal text-foreground-100 hover:text-foreground-100/80 underline underline-offset-4"
        >
          <Link href="https://bettergood.agency/" target="_blank" rel="noopener noreferrer">
            Better Good
          </Link>
        </Button>
      </p>
    </div>
  )
}

export default WebsiteTag
