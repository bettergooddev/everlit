import React from 'react'

export interface PanelBackgroundHoveredProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'viewBox'> {
  className?: string
  viewBox?: boolean
  img?: boolean
}

export function PanelBackgroundHovered({
  className,
  viewBox = true,
  img = false,
  ...props
}: PanelBackgroundHoveredProps) {
  if (img) {
    return (
      <img
        src="/paths/panel-background-hovered.svg"
        alt="Panel background hovered"
        width="401"
        height="354"
        className={className}
        {...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    )
  }

  return (
    <svg
      width="401"
      height="354"
      {...(viewBox && { viewBox: '0 0 401 354' })}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <mask
        id="mask0_810_311"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="401"
        height="354"
      >
        <rect width="401" height="354" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_810_311)">
        <g filter="url(#filter0_f_810_311)">
          <path
            d="M311.002 451.894L-23.4973 411.848L-172.806 84.1845L170.694 -74.522L296.502 11.8676L53.694 84.1846L22.694 151.292L16.0019 228.915L22.694 318.399L214.502 328.292L410.503 295.16L430.002 374.273L311.002 451.894Z"
            fill="url(#paint0_linear_810_311)"
            fillOpacity="0.72"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_810_311"
          x="-222.806"
          y="-124.522"
          width="702.808"
          height="626.416"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_810_311" />
        </filter>
        <linearGradient
          id="paint0_linear_810_311"
          x1="448.596"
          y1="-53.9381"
          x2="63.1891"
          y2="370.551"
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
