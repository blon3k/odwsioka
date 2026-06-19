import type { ReactNode } from 'react'

export type BenefitFeature = {
  title: string
  body: string
  icon: (className: string) => ReactNode
}

function CertifiedIcon({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9.5 11.75L11 13.25L14.5 9.75M20 11.9123V7.17737C20 6.32338 19.4578 5.56361 18.6502 5.286L12.9752 3.33524C12.3432 3.11799 11.6568 3.11799 11.0248 3.33524L5.34984 5.286C4.54224 5.56361 4 6.32338 4 7.17737V11.9123C4 16.8848 8 19 12 21.1579C16 19 20 16.8848 20 11.9123Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PassionIcon({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 5.76835C18.1619 -0.481837 28.7252 11.1257 12 20.5C-4.72523 11.1257 5.83803 -0.481838 12 5.76835Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function EcoIcon({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 12V11C12 7.13401 8.86599 4 5 4H4V5C4 8.86599 7.13401 12 11 12H12ZM12 12V14M12 15H13C16.866 15 20 11.866 20 8V7H19C15.134 7 12 10.134 12 14M12 15V14M12 15V20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DeliveryIcon({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 16.5C14 17.8807 15.1193 19 16.5 19C17.8807 19 19 17.8807 19 16.5C19 15.1193 17.8807 14 16.5 14C15.1193 14 14 15.1193 14 16.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 16.5C5 17.8807 6.11929 19 7.5 19C8.88071 19 10 17.8807 10 16.5C10 15.1193 8.88071 14 7.5 14C6.11929 14 5 15.1193 5 16.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 16H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M19.2857 16C20.2547 16 21.0619 15.2573 21.1424 14.2916L21.4421 10.6951C21.4796 10.245 21.3636 9.79544 21.1131 9.41962L20.0937 7.8906C19.7228 7.3342 19.0983 7 18.4296 7H16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.81818 16C3.84444 16 3.08334 15.1597 3.17944 14.1907L3.19835 14M7 8H3.72727L3.75196 7.72839C3.89244 6.18315 5.18803 5 6.73964 5H12.7149C14.479 5 15.8623 6.51476 15.7026 8.27161L15.1364 14.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2 11H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChemicalFreeIcon({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M15 9L9 15M15 15L9 9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MarketExperienceIcon({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 8C4 6.34315 5.34315 5 7 5H17C18.6569 5 20 6.34315 20 8V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 10H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 5V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 5V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const benefitFeatures: BenefitFeature[] = [
  {
    title: 'Od gospodarstwa',
    body: 'Surowe mleko, ser i miód z certyfikowanych gospodarstw. Wiemy dokładnie, skąd pochodzi każdy produkt.',
    icon: (className) => <CertifiedIcon className={className} />,
  },
  {
    title: 'Pełny smak',
    body: 'Białko, wapń i witaminy z grupy B w mleku, które smakuje tak, jak powinno. Gęste, białe, bez waty.',
    icon: (className) => <PassionIcon className={className} />,
  },
  {
    title: 'Naturalna energia',
    body: 'Miód jako szybkie źródło energii z antyoksydantami. Naturalna słodycz zamiast cukru z półki.',
    icon: (className) => <EcoIcon className={className} />,
  },
  {
    title: 'Świeża dostawa',
    body: 'Produkty prosto z gospodarstwa do Twojego domu. Szybko, bezpiecznie i w najlepszym stanie.',
    icon: (className) => <DeliveryIcon className={className} />,
  },
  {
    title: 'Prosty skład',
    body: 'Mleko, ser, miód. Bez sztucznych dodatków, bez dziwnych składników z etykiety supermarketu.',
    icon: (className) => <ChemicalFreeIcon className={className} />,
  },
  {
    title: '12 lat na rynku',
    body: 'Dwanaście lat łączenia ludzi z lokalnymi producentami. Sprawdzona jakość i zaufanie.',
    icon: (className) => <MarketExperienceIcon className={className} />,
  },
]
