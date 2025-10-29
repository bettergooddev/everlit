'use client'

import { cn } from '@/utilities/ui'
import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Configure PDF.js worker using CDN to match react-pdf version
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export function PDFViewer({
  src,
  className,
  pageClassName,
}: {
  src: string
  className?: string
  pageClassName?: string
}) {
  const [numPages, setNumPages] = useState<number>()

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
  }

  function onDocumentLoadError(error: Error): void {
    console.error('Error loading PDF:', error)
  }

  return (
    <div className={cn('w-full', className)}>
      <Document
        file={src}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={<LoadingComponent>Loading PDF...</LoadingComponent>}
        error={<ErrorComponent>Failed to load PDF file.</ErrorComponent>}
      >
        {numPages && (
          <div className="space-y-4">
            {Array.from({ length: numPages }, (_, index) => (
              <div key={index + 1} className="border-b border-gray-200 pb-4">
                <Page
                  pageNumber={index + 1}
                  width={600}
                  className={cn('w-full [&>*]:!w-full [&>*]:!h-auto', pageClassName)}
                  loading={<LoadingComponent>Loading page {index + 1}...</LoadingComponent>}
                  error={<ErrorComponent>Failed to load page {index + 1}.</ErrorComponent>}
                />
              </div>
            ))}
          </div>
        )}
      </Document>
    </div>
  )
}

function LoadingComponent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-gray-500">{children}</div>
    </div>
  )
}

function ErrorComponent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-red-500">{children}</div>
    </div>
  )
}
