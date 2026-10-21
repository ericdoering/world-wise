
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08131D] font-sans text-white selection:bg-lime-300 selection:text-slate-950">
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-350px] h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/[0.07] blur-[130px]" />
        <div className="absolute right-[-180px] top-[300px] h-[500px] w-[500px] rounded-full bg-cyan-500/[0.06] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Navigation */}
      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-7 md:px-12">
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-bold tracking-tight"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D8FD75] text-[#08131D]">
            <GlobeIcon />
          </span>
          worldwise<span className="text-[#D8FD75]">.</span>
        </Link>

        <nav className="hidden items-center gap-9 text-sm font-medium text-slate-400 md:flex">
          <Link
            href="/countries"
            className="transition hover:text-white"
          >
            Countries
          </Link>
          <a href="#about" className="transition hover:text-white">
            About
          </a>
        </nav>

        <Link
          href="/countries"
          className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold transition hover:border-[#D8FD75] hover:text-[#D8FD75]"
        >
          Explore <span className="ml-1">↗</span>
        </Link>
      </header>

      {/* Main hero */}
      <main className="relative z-10">
        <section className="mx-auto grid min-h-[670px] max-w-7xl items-center gap-8 px-6 pb-20 pt-12 md:grid-cols-2 md:px-12 lg:pt-16">
          {/* Left: Text */}
          <div className="relative z-10">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D8FD75]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D8FD75]" />
              Your world, unlimited
            </div>

            <h1 className="max-w-2xl text-6xl font-semibold leading-[1.05] tracking-[-0.065em] sm:text-7xl lg:text-[88px]">
              A whole
              <br />
              world.
              <br />
              <span className="text-[#D8FD75]">
                Waiting
                <br />
                for you.
              </span>
            </h1>

            <p className="mt-8 max-w-md text-base leading-8 text-slate-400 md:text-lg">
              197 countries. Countless stories. Discover the
              places, people, and cultures that make our
              planet extraordinary.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/countries"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#D8FD75] px-8 py-4 text-sm font-bold text-[#08131D] transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_12px_40px_rgba(216,253,117,0.15)]"
              >
                Start Exploring
                <span className="text-lg transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </Link>

              <a
                href="#about"
                className="inline-flex items-center gap-3 text-sm font-medium text-slate-300 transition hover:text-white"
              >
                Discover World Wise
                <span className="text-lg">↓</span>
              </a>
            </div>
          </div>

          {/* Right: Globe Illustration */}
          <div className="relative flex min-h-[390px] items-center justify-center md:min-h-[570px]">
            <div className="absolute h-[330px] w-[330px] rounded-full bg-emerald-400/10 blur-[95px] sm:h-[440px] sm:w-[440px]" />

            <div className="relative w-full max-w-[570px] animate-[float_8s_ease-in-out_infinite]">
              <svg
                viewBox="0 0 600 600"
                className="h-auto w-full overflow-visible"
                role="img"
                aria-label="Illustration of planet Earth"
              >
                <defs>
                  <radialGradient id="ocean" cx="30%" cy="25%" r="85%">
                    <stop offset="0%" stopColor="#529B91" />
                    <stop offset="45%" stopColor="#216374" />
                    <stop offset="82%" stopColor="#15324E" />
                    <stop offset="100%" stopColor="#081523" />
                  </radialGradient>

                  <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#C5E5AF" />
                    <stop offset="100%" stopColor="#4C9D89" />
                  </linearGradient>

                  <linearGradient id="orbit" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#D8FD75" />
                    <stop offset="100%" stopColor="#3D8B81" />
                  </linearGradient>

                  <clipPath id="earthClip">
                    <circle cx="300" cy="300" r="205" />
                  </clipPath>
                </defs>

                {/* Outer atmosphere */}
                <circle
                  cx="300"
                  cy="300"
                  r="235"
                  fill="#65D3B4"
                  opacity=".025"
                />
                <circle
                  cx="300"
                  cy="300"
                  r="218"
                  fill="#65D3B4"
                  opacity=".07"
                />

                {/* Planet */}
                <circle
                  cx="300"
                  cy="300"
                  r="205"
                  fill="url(#ocean)"
                  stroke="#69BBA8"
                  strokeWidth="1"
                  strokeOpacity=".35"
                />

                <g clipPath="url(#earthClip)">
                  {/* Longitude and latitude */}
                  <g
                    fill="none"
                    stroke="#B5E1D7"
                    strokeWidth="1"
                    opacity=".14"
                  >
                    <ellipse
                      cx="300"
                      cy="300"
                      rx="90"
                      ry="205"
                    />
                    <ellipse
                      cx="300"
                      cy="300"
                      rx="165"
                      ry="205"
                    />
                    <path d="M95 300 H505" />
                    <path d="M115 225 Q300 290 485 225" />
                    <path d="M115 375 Q300 310 485 375" />
                  </g>

                  {/* Stylized continents */}
                  <g fill="url(#land)" opacity=".95">
                    <path d="M157 121 L207 112 239 138 255 161 277 163 298 190 282 216 249 224 231 250 210 269 201 308 178 317 164 284 136 272 113 235 112 187 133 158Z" />

                    <path d="M236 323 L278 328 301 350 291 392 269 425 252 464 233 493 217 470 213 431 194 398 201 361Z" />

                    <path d="M302 149 L340 122 390 128 428 145 469 163 501 202 498 241 456 255 432 234 408 251 377 243 348 257 329 228 301 216 286 188Z" />

                    <path d="M320 263 L365 252 401 272 420 313 401 363 379 401 357 431 333 404 319 366 302 323Z" />

                    <path d="M445 408 L479 392 513 416 522 450 498 473 458 471 434 443Z" />

                    <path d="M263 107 L295 96 329 116 316 140 281 137Z" />
                  </g>

                  {/* Specular highlight */}
                  <ellipse
                    cx="238"
                    cy="200"
                    rx="150"
                    ry="190"
                    fill="#DFFFF1"
                    opacity=".035"
                  />
                </g>

                {/* Orbit ring */}
                <ellipse
                  cx="300"
                  cy="310"
                  rx="280"
                  ry="105"
                  transform="rotate(-25 300 310)"
                  fill="none"
                  stroke="url(#orbit)"
                  strokeWidth="1.5"
                  strokeDasharray="5 9"
                  opacity=".8"
                />

                {/* Orbital markers */}
                <circle cx="61" cy="418" r="7" fill="#D8FD75" />
                <circle cx="539" cy="205" r="5" fill="#D8FD75" />
                <circle cx="61" cy="418" r="14" fill="#D8FD75" opacity=".12" />
                <circle cx="539" cy="205" r="12" fill="#D8FD75" opacity=".12" />
              </svg>
            </div>

            {/* Floating feature callout */}
            <div className="absolute bottom-6 right-0 rounded-2xl border border-white/10 bg-[#132632]/90 px-5 py-4 shadow-2xl backdrop-blur-xl sm:right-3 md:bottom-14">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D8FD75]/10 text-xl">
                  🌍
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Explore the planet
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    One country at a time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section
          id="about"
          className="relative border-t border-white/10 bg-white/[0.025]"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-white/10 px-4 py-10 md:px-12 md:py-12">
            {[
              { number: "197", label: "Countries to explore" },
              { number: "7", label: "Continents" },
              { number: "∞", label: "Things to discover" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2 px-2 text-center"
              >
                <span className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  {item.number}
                </span>
                <span className="text-xs text-slate-400 sm:text-sm">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Intro section */}
        <section className="mx-auto max-w-7xl px-6 py-24 text-center md:px-12 md:py-32">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#D8FD75]">
            Made for the curious
          </p>
          <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            There&apos;s more to the world
            <br />
            than meets the eye.
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-slate-400">
            From the highest mountains to the smallest nations,
            every corner of our planet has a story worth knowing.
            World Wise brings them together in one place.
          </p>

          <Link
            href="/countries"
            className="mt-10 inline-flex items-center gap-3 border-b border-[#D8FD75] pb-2 text-sm font-semibold text-[#D8FD75] transition hover:gap-5"
          >
            Discover all countries <span>↗</span>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row md:px-12">
          <span className="font-bold text-white">
            worldwise<span className="text-[#D8FD75]">.</span>
          </span>
          <span>Stay curious. Explore everywhere.</span>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}
