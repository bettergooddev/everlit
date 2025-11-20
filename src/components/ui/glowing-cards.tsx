'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

import { cn } from '@/utilities/ui'
import * as Path from '@/paths/paths'

export interface GlowingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  glowColor?: string
  hoverEffect?: boolean
  background?: boolean
  isOverlay?: boolean
}

export interface GlowingCardsProps {
  children: React.ReactNode
  className?: string
  /** Enable the glowing overlay effect */
  enableGlow?: boolean
  /** Size of the glow effect radius */
  glowRadius?: number
  /** Opacity of the glow effect */
  glowOpacity?: number
  /** Animation duration for glow transitions */
  animationDuration?: number
  /** Enable hover effects on individual cards */
  enableHover?: boolean
  /** Gap between cards */
  gap?: string
  /** Padding around the container */
  padding?: string
  /** Background color for the container */
  backgroundColor?: string
  /** Border radius for cards */
  borderRadius?: string
  /** Custom CSS variables for theming */
  customTheme?: {
    cardBg?: string
    cardBorder?: string
    textColor?: string
    hoverBg?: string
  }
}
//--background-glow
const defaultGlowColor = '#616f74'

export const GlowingCard: React.FC<GlowingCardProps> = ({
  children,
  className,
  glowColor = defaultGlowColor,
  hoverEffect = true,
  background = false,
  isOverlay = false,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        'relative flex-1 w-full p-6 overflow-hidden rounded-2xl text-black dark:text-white',
        'border-[1px] border-white/10 border-solid hover:border-[var(--glow-color)]',
        'transition-all duration-2000',
        className,
      )}
      style={
        {
          '--glow-color': glowColor, // CSS variable definition
          boxShadow: isHovered
            ? `0 0 20px 5px ${glowColor}20, 0 0 40px 10px ${glowColor}10`
            : 'none',
          transition: 'all 1000ms ease-in-out',
        } as React.CSSProperties
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* {children} */}
      {background && <GlowingCardBackground isHovered={isHovered} isOverlay={isOverlay} />}
      {/* <GlowingCardBackground isHovered={true} isOverlay={isOverlay} /> */}
      {background ? <div className="relative z-[2]">{children}</div> : children}
    </div>
  )
}

export interface GlowingCardBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  isHovered?: boolean
  isOverlay?: boolean
}

export const GlowingCardBackground: React.FC<GlowingCardBackgroundProps> = ({
  children,
  className,
  isHovered = false,
  isOverlay = false,
  ...props
}) => {
  // Overlay cards should always be visible (they're masked by the radial gradient)
  // Actual cards should only be visible on hover
  const shouldShow = isOverlay || isHovered

  return (
    <>
      <motion.div
        className={cn('absolute inset-0 bg-primary-500/0')}
        animate={{
          opacity: shouldShow ? 1 : 0,
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
        }}
      />
      <div
        className={cn(
          'absolute inset-0 z-[0] duration-2000',
          shouldShow ? 'opacity-100' : 'opacity-0',
        )}
      >
        <motion.div
          className="absolute inset-0 blur-xl"
          animate={{
            rotateY: [18, -18, 18],
            rotateX: [6, -6, 6],
            // translateX: [10, -10, 10],
            translateY: [5, -5, 5],
            translateX: [5, -5, 5],
            opacity: [100, 70, 100],
            // rotateX: [10, -10, 10],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <Path.PanelBackgroundUnmasked
            className="w-full h-full aspect-[unset] max-w-[unset] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-125 opacity-75"
            img={true}
          />
        </motion.div>
      </div>
    </>
  )
}

export const GlowingCards: React.FC<GlowingCardsProps> = ({
  children,
  className,
  enableGlow = true,
  glowRadius = 25,
  glowOpacity = 1,
  animationDuration = 2000,
  enableHover = true,
  gap = '3.5rem',
  padding = '0rem 0rem',
  backgroundColor,
  borderRadius = '1rem',
  customTheme,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const overlay = overlayRef.current

    if (!container || !overlay || !enableGlow) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setMousePosition({ x, y })
      setShowOverlay(true)

      // Using string concatenation for style properties
      overlay.style.setProperty('--x', x + 'px')
      overlay.style.setProperty('--y', y + 'px')
      overlay.style.setProperty('--opacity', glowOpacity.toString())
    }

    const handleMouseLeave = () => {
      setShowOverlay(false)
      overlay.style.setProperty('--opacity', '0')
    }

    // @ts-expect-error
    container.parentElement.parentElement.addEventListener('mousemove', handleMouseMove)
    // @ts-expect-error
    container.parentElement.parentElement.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      // @ts-expect-error
      container.parentElement.parentElement.removeEventListener('mousemove', handleMouseMove)
      // @ts-expect-error
      container.parentElement.parentElement.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [enableGlow, glowOpacity])

  const containerStyle = {
    '--gap': gap,
    '--padding': padding,
    '--border-radius': borderRadius,
    '--animation-duration': animationDuration + 'ms', // Concatenation
    '--glow-radius': glowRadius + 'rem', // Concatenation
    '--glow-opacity': glowOpacity,
    backgroundColor: backgroundColor || undefined,
    ...customTheme,
  } as React.CSSProperties

  return (
    <div className={cn('relative w-full', className)} style={containerStyle}>
      <div
        ref={containerRef}
        className={cn('relative mx-auto')}
        style={{ padding: 'var(--padding)' }} // String literal
      >
        <div className={cn('flex justify-center flex-wrap gap-[var(--gap)] flex-col lg:flex-row')}>
          {React.Children.map(
            children as React.ReactElement<GlowingCardProps>[],
            (child: React.ReactElement<GlowingCardProps> | undefined) => {
              if (React.isValidElement(child) && child.type === GlowingCard) {
                return React.cloneElement(child as React.ReactElement<any>, {
                  background: true,
                })
              }
              return child
            },
          )}
        </div>

        {enableGlow && (
          <div
            ref={overlayRef}
            className={cn(
              'absolute inset-0 pointer-events-none select-none',
              'opacity-0 transition-all duration-2000',
            )}
            style={{
              // String concatenation for WebkitMask and mask
              WebkitMask:
                'radial-gradient(var(--glow-radius) var(--glow-radius) at var(--x, 0) var(--y, 0), #000 1%, transparent 50%)',
              mask: 'radial-gradient(var(--glow-radius) var(--glow-radius) at var(--x, 0) var(--y, 0), #000 1%, transparent 50%)',
              opacity: showOverlay ? 'var(--opacity)' : '0',
            }}
          >
            <div
              className={cn(
                'flex justify-center flex-wrap gap-[var(--gap)] center mx-auto',
                'flex-col lg:flex-row relative',
              )}
              style={{ padding: 'var(--padding)' }} // String literal
            >
              {React.Children.map(
                children as React.ReactElement<GlowingCardProps>[],
                (child: React.ReactElement<GlowingCardProps> | undefined, index) => {
                  if (React.isValidElement(child) && child.type === GlowingCard) {
                    const cardGlowColor = child.props.glowColor || defaultGlowColor

                    return React.cloneElement(child as React.ReactElement<any>, {
                      background: true,
                      isOverlay: true,
                      className: cn(
                        child.props.className,
                        'bg-opacity-15 dark:bg-opacity-15',
                        'border-opacity-100 dark:border-opacity-100',
                      ),
                      style: {
                        ...child.props.style,
                        // String concatenation for background, border, and boxShadow
                        backgroundColor: cardGlowColor + '15',
                        borderColor: cardGlowColor,
                        boxShadow: '0 0 0 1px inset ' + cardGlowColor,
                      },
                    })
                  }
                  return child
                },
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export { GlowingCards as default }
