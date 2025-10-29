'use client'

import Link from 'next/link'
import { Button } from './ui/button'

function WebsiteTag() {
  const currentYear = new Date().getFullYear()
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME

  return (
    <div className="bg-muted px-16">
      <div className="w-full  border-t border-primary/10 pt-2 pb-5">
        <div className="flex flex-col items-center justify-center gap-2 py-3 sm:flex-row sm:justify-between">
          <p className="flex items-center gap-1 text-foreground [&_*]:type-caption [&_*]:font-normal">
            <span>Website By:</span>
            <Button
              variant="link"
              asChild
              className="h-auto p-0 font-normal text-foreground hover:text-foreground/80 underline underline-offset-4"
            >
              <Link href="https://bettergood.agency/" target="_blank" rel="noopener noreferrer">
                Better Good
              </Link>
            </Button>
          </p>
          <p className="text-foreground type-caption font-normal">
            © {currentYear} {companyName}
          </p>
        </div>
      </div>
    </div>
  )
}

export default WebsiteTag
