import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type BrutalistButtonProps = {
  children: ReactNode
  className?: string
  size?: 'default' | 'sm'
  href?: string
  to?: string
  fullWidth?: boolean | 'mobile'
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>

const sizeClasses = {
  default: 'px-20 py-5 text-3xl',
  sm: 'px-8 py-3.5 text-xl',
} as const

const interactiveClasses =
  'relative rounded-2xl border-2 border-black bg-brand-yellow font-heading font-bold uppercase tracking-normal text-black transition-[transform,background-color,border-color,color,box-shadow] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 motion-reduce:transition-none'

const disabledClasses =
  'cursor-not-allowed border-black/20 bg-cream text-black/35 hover:translate-x-0 hover:translate-y-0 active:translate-x-0 active:translate-y-0'

function getWidthClasses(fullWidth?: boolean | 'mobile') {
  if (fullWidth === 'mobile') {
    return {
      wrapper: 'block w-full sm:inline-block sm:w-auto',
      interactive: 'block w-full text-center sm:inline-block sm:w-auto',
    }
  }

  if (fullWidth) {
    return {
      wrapper: 'block w-full',
      interactive: 'block w-full text-center',
    }
  }

  return {
    wrapper: 'inline-block',
    interactive: 'inline-block',
  }
}

export default function BrutalistButton({
  children,
  className = '',
  size = 'default',
  href,
  to,
  fullWidth,
  disabled,
  type = 'button',
  ...buttonProps
}: BrutalistButtonProps) {
  const widthClasses = getWidthClasses(fullWidth)
  const isDisabled = Boolean(disabled)
  const interactiveClassName = `${interactiveClasses} ${widthClasses.interactive} ${sizeClasses[size]}`

  return (
    <div
      className={`relative ${isDisabled ? '' : 'pr-2.5 pb-2.5'} ${widthClasses.wrapper} ${className}`}
    >
      {!isDisabled ? (
        <span
          className="pointer-events-none absolute left-2.5 top-2.5 h-[calc(100%-10px)] w-[calc(100%-10px)] rounded-2xl bg-black"
          aria-hidden="true"
        />
      ) : null}
      {to ? (
        <Link to={to} className={interactiveClassName}>
          {children}
        </Link>
      ) : href ? (
        <a href={href} className={interactiveClassName}>
          {children}
        </a>
      ) : (
        <button
          type={type}
          disabled={isDisabled}
          className={`${interactiveClasses} ${widthClasses.interactive} ${sizeClasses[size]} ${
            isDisabled ? disabledClasses : ''
          }`}
          {...buttonProps}
        >
          {children}
        </button>
      )}
    </div>
  )
}
