import { useState } from 'react'
import type { FormEvent } from 'react'

const STORAGE_KEY = 'newsletter-popup-dismissed'

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(
    () => localStorage.getItem(STORAGE_KEY) !== 'true',
  )
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setIsVisible(false)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    localStorage.setItem(STORAGE_KEY, 'true')
    window.setTimeout(() => setIsVisible(false), 1800)
  }

  if (!isVisible) return null

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex w-[min(100vw-2rem,420px)] flex-col items-start gap-2 sm:bottom-6 sm:right-6"
      role="dialog"
      aria-labelledby="newsletter-popup-title"
      aria-describedby="newsletter-popup-description"
    >
      <button
        type="button"
        onClick={handleClose}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-neutral-800"
        aria-label="Zamknij"
      >
        <CloseIcon />
      </button>

      <div className="w-full overflow-hidden rounded-[20px] bg-[#222222] px-6 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-9">
        <h2
          id="newsletter-popup-title"
          className="font-heading text-[2.35rem] font-bold leading-[0.92] tracking-[-0.02em] text-white sm:text-[2.75rem]"
        >
          Nowe dostawy.
          <br />
          Zniżki bez ściemy.
        </h2>
        <p id="newsletter-popup-description" className="sr-only">
          Zapisz się do newslettera, aby otrzymywać informacje o nowych produktach i promocjach.
        </p>

        {submitted ? (
          <p className="mt-6 font-body text-base font-medium text-white sm:text-lg">
            Dzięki! Jesteś na liście.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex gap-2 sm:mt-7">
            <label htmlFor="newsletter-email" className="sr-only">
              Adres e-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Adres e-mail"
              className="min-w-0 flex-1 rounded-xl bg-white px-4 py-3 font-body text-sm text-black placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-yellow sm:px-5 sm:py-3.5 sm:text-base"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-brand-yellow px-4 py-3 font-heading text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#f0be00] sm:px-5 sm:py-3.5 sm:text-base"
            >
              Zapisz się
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
