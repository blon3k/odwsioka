import { Link } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

export type LegalSection = {
  title?: string
  paragraphs: string[]
}

type LegalPageTemplateProps = {
  title: string
  subtitle?: string
  lastUpdated?: string
  sections: LegalSection[]
}

export default function LegalPageTemplate({
  title,
  subtitle,
  lastUpdated,
  sections,
}: LegalPageTemplateProps) {
  return (
    <div className="flex min-h-screen flex-col gap-2 bg-white p-2">
      <Navbar />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="mb-10 sm:mb-14">
          <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-black/50 sm:text-base">
            Odwsioka
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] text-black sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-black sm:text-lg">
              {subtitle}
            </p>
          ) : null}
          {lastUpdated ? (
            <p className="mt-4 font-body text-sm text-black/50">Ostatnia aktualizacja: {lastUpdated}</p>
          ) : null}
        </header>

        <article className="flex flex-col gap-8 sm:gap-10">
          {sections.map((section, index) => (
            <section
              key={section.title ?? index}
              className="rounded-2xl border-2 border-black bg-warm-cream p-6 sm:p-8"
            >
              {section.title ? (
                <h2 className="font-heading text-2xl font-bold uppercase tracking-[-0.02em] text-black sm:text-3xl">
                  {section.title}
                </h2>
              ) : null}
              <div className={`flex flex-col gap-4 ${section.title ? 'mt-4' : ''}`}>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className="font-body text-base leading-relaxed text-black/80 sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>

        <p className="mt-10 sm:mt-12">
          <Link
            to="/"
            className="font-body text-base font-medium text-black underline decoration-black/30 underline-offset-4 transition hover:decoration-black"
          >
            Wróć na stronę główną
          </Link>
        </p>
      </main>

      <Footer />
    </div>
  )
}
