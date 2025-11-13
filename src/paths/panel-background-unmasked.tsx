import React from 'react'

export interface PanelBackgroundUnmaskedProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'viewBox'> {
  className?: string
  viewBox?: boolean
  img?: boolean
}

export function PanelBackgroundUnmasked({
  className,
  viewBox = true,
  img = false,
  ...props
}: PanelBackgroundUnmaskedProps) {
  if (img) {
    return (
      <img
        src="/paths/panel-background-unmasked.png"
        alt="Panel background unmasked"
        width="598"
        height="531"
        className={className}
        {...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    )
  }

  return (
    <svg
      width="598"
      height="531"
      {...(viewBox && { viewBox: '0 0 598 531' })}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M484.302 526.863C480.37 529.474 475.636 530.633 470.932 530.136L151.677 496.404C144.503 495.646 138.298 491.145 135.416 484.61L1.67825 181.326C-2.64448 171.523 1.66158 160.08 11.4217 155.432L333.721 1.97226C340.237 -1.13019 347.928 -0.541603 353.868 3.51412L436.554 59.966C450.309 69.3564 447.097 90.3009 431.136 95.2961L231.765 157.695C226.382 159.379 221.958 163.221 219.572 168.283L192.331 226.076C191.373 228.108 190.769 230.284 190.544 232.514L183.064 306.728C182.959 307.77 182.938 308.818 183 309.863L187.234 381.322C187.839 391.533 196.181 399.608 206.519 399.991L380.159 406.412C381.647 406.467 383.136 406.359 384.6 406.089L562.438 373.293C573.04 371.337 583.298 377.992 585.695 388.38L596.854 436.735C598.707 444.763 595.359 453.1 588.436 457.698L484.302 526.863Z"
        fill="url(#paint0_linear_811_326)"
        fillOpacity="0.72"
      />
      <defs>
        <linearGradient
          id="paint0_linear_811_326"
          x1="625.382"
          y1="13.7182"
          x2="227.366"
          y2="450.777"
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


