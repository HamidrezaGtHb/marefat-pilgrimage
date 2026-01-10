import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marefat Pilgrimage – Premium Umrah, Hajj & Ziyarat Tours",
  description:
    "Marefat Pilgrimage offers premium, small-group Umrah, Hajj, and Ziyarat tours with handpicked hotels, guided rituals, and end‑to‑end support.",
};

const navItems: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-ivory text-charcoal antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 border-b border-charcoal/5 bg-ivory/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-gold/40 bg-gradient-to-br from-gold-soft/60 to-gold/90 shadow-soft">
                  <span className="text-sm font-semibold tracking-wide text-charcoal">
                    M
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-sm tracking-[0.18em] uppercase text-charcoal">
                    Marefat
                  </span>
                  <span className="text-[11px] text-charcoal/60">
                    Pilgrimage Travel
                  </span>
                </div>
              </Link>

              <nav className="hidden items-center gap-7 text-sm text-charcoal/75 md:flex">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href as any}
                    className="transition hover:text-charcoal"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <a
                  href="/tours"
                  className="hidden rounded-full border border-charcoal/10 bg-ivory/80 px-4 py-2 text-xs font-medium text-charcoal shadow-sm shadow-charcoal/5 transition hover:border-gold md:inline-flex"
                >
                  View Tours
                </a>
                <a
                  href="/booking"
                  className="hidden rounded-full bg-charcoal px-4 py-2 text-xs font-medium text-ivory shadow-soft transition hover:bg-charcoal/90 md:inline-flex"
                >
                  Book Consultation
                </a>
                <a
                  href="https://wa.me/0000000000"
                  className="inline-flex items-center justify-center rounded-full border border-charcoal/15 bg-ivory/90 px-3 py-2 text-[11px] font-medium text-charcoal shadow-sm shadow-charcoal/5 transition hover:border-gold/80 md:px-3.5"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-charcoal/5 bg-ivory/80">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-xs text-charcoal/60 sm:px-8 sm:text-[13px] lg:px-12">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-charcoal">
                    Marefat Pilgrimage
                  </p>
                  <p className="mt-1 max-w-md">
                    Licensed religious travel agency specialized in premium
                    Umrah, Hajj, and Ziyarat experiences.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-2 text-xs sm:items-end">
                  <p className="font-medium text-charcoal/80">
                    Direct assistance
                  </p>
                  <p>Phone: +00 000 000 000</p>
                  <p>Email: concierge@marefatpilgrimage.com</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-charcoal/5 pt-4">
                <p>© {new Date().getFullYear()} Marefat Pilgrimage. All rights reserved.</p>
                <p className="flex gap-4">
                  <span>Privacy</span>
                  <span>Terms</span>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}



