// Single-page "about me" for Jawad.
// Everything that is meant to be edited later lives in these two config
// objects, so the markup below stays untouched when copy or links change.

const PROFILE = {
  name: "Jawad",
  role: "Designer & Builder",
  // Tasteful placeholder bio. Swap for your real story whenever you like.
  bio: [
    "I design and build digital products that feel calm, fast and a little bit playful. My work sits where clean visual craft meets practical engineering, so ideas do not stop at the mockup.",
    "Most days you will find me shaping interfaces, refining motion and turning rough concepts into things people actually want to use. I care about the small details that make a product feel considered.",
  ],
  location: "Available worldwide, working remotely",
};

// Primary call to action plus secondary links.
// Update the urls here to point wherever you need.
const LINKS = {
  primary: { label: "Explore Jawad Designs", href: "https://weldroblox.com" },
  secondary: [
    { label: "weldroblox.com", href: "https://weldroblox.com" },
    { label: "acquiblox.com", href: "https://acquiblox.com" },
  ],
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-neutral-100">
      {/* Ambient background: soft gradient glows that drift slowly */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="animate-drift absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="animate-drift absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-fuchsia-600/20 blur-3xl [animation-delay:-7s]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.6)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
        {/* Monogram avatar */}
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl font-semibold tracking-tight backdrop-blur-sm">
          {PROFILE.name.charAt(0)}
        </div>

        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-indigo-300/80">
          {PROFILE.role}
        </p>

        <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
          Hi, I am {PROFILE.name}
        </h1>

        <div className="mt-6 space-y-4 text-pretty text-base leading-relaxed text-neutral-300 sm:text-lg">
          {PROFILE.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Primary CTA */}
        <a
          href={LINKS.primary.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-neutral-950 transition hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {LINKS.primary.label}
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          >
            &rarr;
          </span>
        </a>

        {/* Secondary links */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-400">
          {LINKS.secondary.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 transition hover:text-white hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="mt-16 text-xs text-neutral-500">{PROFILE.location}</p>
      </div>
    </main>
  );
}
