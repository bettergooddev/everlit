import React from 'react'

export interface ButtonBlurShapeProps extends Omit<React.SVGProps<SVGSVGElement>, 'viewBox'> {
  className?: string
  viewBox?: boolean
  img?: boolean
}

export function ButtonBlurShape({ className, viewBox = true, img = false, ...props }: ButtonBlurShapeProps) {
  if (img) {
    return (
      <img
        src="/paths/button-blur-shape.svg"
        alt="Button blur shape"
        width="276"
        height="69"
        className={className}
        {...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    )
  }

  return (
    <svg
      width="276"
      height="69"
      {...(viewBox && { viewBox: "0 0 276 69" })}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M220.805 69.0051L67.7089 59.9573L-9.87851e-07 16.2786L157.621 -5.07889e-06L215.057 12.53L103.721 18.9354L89.3895 27.1588L86.1677 37.0128L89.0507 48.5415L176.865 52.0573L266.688 50.1169L275.456 60.4687L220.805 69.0051Z"
        fill="url(#paint0_linear_685_3319)"
        fillOpacity="0.6"
      />
      <defs>
        <linearGradient
          id="paint0_linear_685_3319"
          x1="284.839"
          y1="5.89366"
          x2="258.961"
          y2="98.1691"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.240385" stopColor="#F7E9C1" stopOpacity="0" />
          <stop offset="0.504808" stopColor="#F7E9C1" stopOpacity="0.05" />
          <stop offset="0.855769" stopColor="#C47B3F" />
          <stop offset="0.995192" stopColor="#E15927" />
        </linearGradient>
      </defs>
    </svg>
  )
}

