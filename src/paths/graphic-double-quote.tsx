import React from 'react'

export interface GraphicDoubleQuoteProps extends Omit<React.SVGProps<SVGSVGElement>, 'viewBox'> {
  className?: string
  viewBox?: boolean
  img?: boolean
}

export function GraphicDoubleQuote({ className, viewBox = true, img = false, ...props }: GraphicDoubleQuoteProps) {
  if (img) {
    return (
      <img
        src="/paths/graphic-double-quote.svg"
        alt="Graphic double quote"
        width="125"
        height="99"
        className={className}
        {...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    )
  }

  return (
    <svg
      width="125"
      height="99"
      {...(viewBox && { viewBox: '0 0 125 99' })}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M0 98.3391V70.0524C0 61.8258 1.58203 53.3461 4.74609 44.6133C7.91016 35.8805 12.0867 27.6539 17.2758 19.9336C22.4648 12.0867 28.1602 5.44219 34.3617 0L59.8008 14.8078C55.2445 22.4016 51.3211 30.5648 48.0305 39.2977C44.7398 48.0305 43.0945 58.282 43.0945 70.0524V98.3391H0ZM64.5469 98.3391V70.0524C64.5469 61.8258 66.1289 53.3461 69.293 44.6133C72.457 35.8805 76.6336 27.6539 81.8227 19.9336C87.0117 12.0867 92.707 5.44219 98.9086 0L124.348 14.8078C119.791 22.4016 115.868 30.5648 112.577 39.2977C109.287 48.0305 107.641 58.282 107.641 70.0524V98.3391H64.5469Z"
        fill="#FCF8EF"
      />
    </svg>
  )
}

