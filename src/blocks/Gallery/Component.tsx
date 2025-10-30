import React from 'react'
import * as motion from 'motion/react-client'
import { fadeUpInView } from '@/utilities/animations'
import type { GalleryBlock as GalleryBlockType } from '@/payload-types'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

export const GalleryBlock: React.FC<GalleryBlockType> = ({ images }) => {
  if (!images || images.length === 0) return null

  // Filter out any null/undefined values and ensure type safety
  const validImages = images.filter(
    (image): image is string | MediaType => image !== null && image !== undefined,
  )

  if (validImages.length === 0) return null

  // Group images into rows: alternating 1 column, 2 columns, 1 column, etc.
  // But if there's only 1 image remaining, don't do 2 column layout
  const rows: Array<{ images: (string | MediaType)[]; isSingle: boolean }> = []
  let index = 0
  let rowIndex = 0

  while (index < validImages.length) {
    const isSingleRow = rowIndex % 2 === 0 // Alternate: 0 = single, 1 = double, 2 = single, etc.
    const remainingImages = validImages.length - index

    if (isSingleRow) {
      // Single column row
      rows.push({
        images: [validImages[index]!],
        isSingle: true,
      })
      index++
      rowIndex++
    } else {
      // Double column row, but only if we have at least 2 images remaining
      if (remainingImages >= 2) {
        rows.push({
          images: [validImages[index]!, validImages[index + 1]!],
          isSingle: false,
        })
        index += 2
        rowIndex++
      } else {
        // Only 1 image remaining, use single column instead
        rows.push({
          images: [validImages[index]!],
          isSingle: true,
        })
        index++
        rowIndex++
      }
    }
  }

  return (
    <div className="container-full px-6">
      <div className="flex flex-col gap-6">
        {rows.map((row, rowIndex) =>
          row.isSingle ? (
            <SingleColumnRow key={rowIndex} images={row.images} startIndex={rowIndex} />
          ) : (
            <DoubleColumnRow key={rowIndex} images={row.images} startIndex={rowIndex} />
          ),
        )}
      </div>
    </div>
  )
}

const SingleColumnRow = ({
  images,
  startIndex,
}: {
  images: (string | MediaType)[]
  startIndex: number
}) => {
  return (
    <div className="w-full">
      {images.map((image, index) => (
        <motion.div key={index} className="relative w-full" {...fadeUpInView(startIndex + index)}>
          <Media
            resource={image}
            className="w-full overflow-hidden"
            imgClassName="w-full h-auto max-h-screen object-cover"
          />
        </motion.div>
      ))}
    </div>
  )
}

const DoubleColumnRow = ({
  images,
  startIndex,
}: {
  images: (string | MediaType)[]
  startIndex: number
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {images.map((image, index) => (
        <motion.div key={index} className="relative" {...fadeUpInView(startIndex + index)}>
          <Media
            resource={image}
            className="w-full overflow-hidden"
            imgClassName="w-full h-auto max-h-screen object-cover"
          />
        </motion.div>
      ))}
    </div>
  )
}
