export default function AboutPage() {
  return (
    <main className="bg-ivory">
      <section className="border-b border-charcoal/5 bg-ivory/90">
        <div className="mx-auto max-w-4xl px-6 py-10 sm:px-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            About Marefat
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-charcoal sm:text-3xl">
            A calm, attentive way to travel for ibadah
          </h1>
          <p className="mt-3 text-sm text-charcoal/75">
            Marefat Pilgrimage is a specialized religious travel agency
            dedicated to Umrah, Hajj, and Ziyarat tours for families and
            individuals who value comfort, dignity, and spiritual focus.
          </p>
        </div>
      </section>

      {/* Visual band */}
      <section className="mx-auto max-w-5xl px-6 pt-6 sm:px-8 lg:px-12">
        <div className="grid gap-6 md:grid-cols-[1.6fr_1.2fr]">
          <div className="space-y-4 text-sm text-charcoal/80">
            <p>
              Our journeys are designed for those who prefer a quiet, organized
              experience — where logistics feel invisible and the focus remains
              on what truly matters.
            </p>
            <p>
              From visa assistance to hotel check‑ins and airport transfers, a
              small, dedicated team follows your file from the first call until
              you return home.
            </p>
          </div>
          <div className="h-40 rounded-2xl bg-gradient-to-br from-charcoal/75 via-charcoal/40 to-gold-soft/60 shadow-soft md:h-48" />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16 pt-10 sm:px-8 lg:px-12">
        <div className="space-y-8 text-sm text-charcoal/80">
          <div>
            <h2 className="text-base font-semibold text-charcoal">
              Our story
            </h2>
            <p className="mt-2">
              Marefat was born from a simple observation: many pilgrims wished
              for quieter, better organized journeys with fewer surprises and
              more space for sincere worship. Our founders combined years of
              experience in hospitality, religious education, and travel
              operations to create a modern, discreet agency with a human
              touch.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-charcoal/5 bg-ivory p-4 shadow-sm shadow-charcoal/5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/60">
                Mission
              </p>
              <p className="mt-2 text-sm text-charcoal/80">
                To create respectful, well‑prepared pilgrimage experiences that
                allow pilgrims to focus on Allah, not logistics.
              </p>
            </div>
            <div className="rounded-2xl border border-charcoal/5 bg-ivory p-4 shadow-sm shadow-charcoal/5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/60">
                Approach
              </p>
              <p className="mt-2 text-sm text-charcoal/80">
                Small, curated groups, handpicked hotels, and thoughtful
                pacing, supported by trusted partners in every city.
              </p>
            </div>
            <div className="rounded-2xl border border-charcoal/5 bg-ivory p-4 shadow-sm shadow-charcoal/5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/60">
                Promise
              </p>
              <p className="mt-2 text-sm text-charcoal/80">
                Clarity, honesty, and attentive communication from your first
                question until you return home.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold text-charcoal">
              Team &amp; scholars
            </h2>
            <p className="mt-2">
              Behind every group stands a team of travel professionals and
              religious guides. Our scholars provide clear explanations of
              rituals in multiple languages and remain available for personal
              questions throughout the journey.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-charcoal">
              Licensing &amp; trust
            </h2>
            <p className="mt-2">
              Marefat Pilgrimage works only with accredited partners and
              complies with all regulations in the countries where we operate.
              Detailed license numbers, certificates, and partner information
              can be provided on request or during a consultation call.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}


