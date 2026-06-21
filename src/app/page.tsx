"use client";

// Jawad Jalal — personal site.
// A centred "liquid glass" panel: identity + links on the left, an
// interactive experience list on the right. Recreated 1:1 from the
// original HTML/CSS prototype.

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";

const ACCENT = "#3257cc";

function hexToRgba(hex: string, a: number) {
  const h = (hex || "#3257cc").replace("#", "");
  const f =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(f, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

const ACCENT_SEL = hexToRgba(ACCENT, 0.18);

const ddg = (d: string) => `https://icons.duckduckgo.com/ip3/${d}.ico`;

type Job = {
  year: string;
  org: string;
  role: string;
  url: string;
  icon: string;
  detail: string;
};

const JOBS: Job[] = [
  {
    year: "Since 2026",
    org: "jawadj.design",
    role: "Founder, web & design studio",
    url: "https://jawad-portfolio-kohl.vercel.app",
    icon: ddg("jawad-portfolio-kohl.vercel.app"),
    detail:
      "My freelance studio. Brand identity, UI/UX and full site builds for founders who want it to actually look good.",
  },
  {
    year: "Since 2026",
    org: "weld.",
    role: "Founder & Project Manager",
    url: "https://weldroblox.com",
    icon: ddg("weldroblox.com"),
    detail:
      "A structured marketplace fixing how Roblox studios hire developers. Sole founder, live waitlist at weldroblox.com.",
  },
  {
    year: "Since 2026",
    org: "World Ent",
    role: "3D Artist",
    url: "https://games.worldent.online",
    icon: "/assets/worldent.svg",
    detail:
      "Stylised and realistic 3D assets for live Roblox titles, modelled and textured end to end.",
  },
  {
    year: "Since 2026",
    org: "Basket Ent",
    role: "Acquisitions team",
    url: "https://basketent.com",
    icon: ddg("basketent.com"),
    detail:
      "Sourcing, evaluating and closing game acquisition deals, then planning post acquisition LiveOps.",
  },
  {
    year: "Since 2026",
    org: "Acquiblox",
    role: "Chief Marketing Officer",
    url: "https://acquiblox.com",
    icon: ddg("acquiblox.com"),
    detail:
      "Own marketing strategy, brand positioning and community growth across Discord and X.",
  },
  {
    year: "Since 2024",
    org: "Cosmos Models",
    role: "Self-employed 3D Artist",
    url: "https://cosmosmodels.lovable.app",
    icon: ddg("cosmosmodels.lovable.app"),
    detail:
      "My own commissions studio in ZBrush, Blender and Substance. 200+ member server and paid clients.",
  },
  {
    year: "Since 2026",
    org: "SOF Agency",
    role: "PR Agent & Copywriter",
    url: "https://sof.agency",
    icon: "https://www.google.com/s2/favicons?domain=sof.agency&sz=64",
    detail:
      "PR, influencer partnerships and crowdfunding campaigns for game studios and digital brands.",
  },
];

const NAME_PARTS = ["Jawad", "Jalal"];

const SOCIALS: {
  label: string;
  href: string;
  color: string;
  size: number;
  path: string;
}[] = [
  {
    label: "X",
    href: "https://x.com/jawadmakes",
    color: "#0a0a0a",
    size: 18,
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@jawadmakes",
    color: "#e02750",
    size: 18,
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jawad-jalal-designs",
    color: "#0a66c2",
    size: 18,
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/j.awadjalal/",
    color: "#d6336c",
    size: 18,
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@jawadmake",
    color: "#e60000",
    size: 20,
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const portraitRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reveal = () => setMounted(true);
    const raf = requestAnimationFrame(() => requestAnimationFrame(reveal));
    const timer = setTimeout(reveal, 120);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  const rev = mounted ? 1 : 0;
  const revUp = mounted ? "translateY(0)" : "translateY(12px)";

  const portraitMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = portraitRef.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${nx * 26}deg) rotateX(${-ny * 26}deg) scale(1.05)`;
  };
  const portraitLeave = () => {
    const el = portraitRef.current;
    if (el) el.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
  };

  const jobEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    const row = e.currentTarget;
    row.style.backgroundColor = "rgba(255,255,255,0.6)";
    row.style.boxShadow =
      "inset 0 1px 0 rgba(255,255,255,0.85), 0 12px 28px -14px rgba(20,22,30,0.34)";
    const a = row.querySelector<HTMLElement>(".jj-arrow");
    if (a) {
      a.style.opacity = "1";
      a.style.transform = "translateX(0)";
    }
    const t = row.querySelector<HTMLElement>(".jj-tile");
    if (t) t.style.transform = "scale(1.1) rotate(-3deg)";
    const d = row.querySelector<HTMLElement>(".jj-detail");
    if (d) {
      d.style.maxHeight = d.scrollHeight + "px";
      d.style.opacity = "1";
      d.style.marginTop = "8px";
    }
  };
  const jobLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    const row = e.currentTarget;
    row.style.backgroundColor = "transparent";
    row.style.boxShadow = "none";
    const a = row.querySelector<HTMLElement>(".jj-arrow");
    if (a) {
      a.style.opacity = "0";
      a.style.transform = "translateX(-5px)";
    }
    const t = row.querySelector<HTMLElement>(".jj-tile");
    if (t) t.style.transform = "scale(1) rotate(0deg)";
    const d = row.querySelector<HTMLElement>(".jj-detail");
    if (d) {
      d.style.maxHeight = "0";
      d.style.opacity = "0";
      d.style.marginTop = "0";
    }
  };

  const rootStyle: CSSProperties = {
    ["--accent" as string]: ACCENT,
    ["--accent-sel" as string]: ACCENT_SEL,
    ["--rule" as string]: "rgba(40,40,55,0.09)",
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px clamp(28px, 5vw, 88px)",
    background:
      "radial-gradient(125% 125% at 14% 8%, #eef1f5 0%, #e9e6df 46%, #e6e9ee 76%, #ecebe5 100%)",
    fontFamily: "'Inter', system-ui, sans-serif",
    color: "#161510",
    overflow: "hidden",
  };

  return (
    <div className="jj-root" style={rootStyle}>
      {/* subtle material grain */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.05,
          mixBlendMode: "multiply",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ============ LIQUID GLASS PANEL ============ */}
      <div
        className="jj-wrap"
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          gap: 76,
          alignItems: "stretch",
          width: "100%",
          maxWidth: 1208,
          padding: "60px 80px",
          borderRadius: 36,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0.30) 52%, rgba(255,255,255,0.46) 100%)",
          WebkitBackdropFilter: "blur(42px) saturate(185%) brightness(1.05)",
          backdropFilter: "blur(42px) saturate(185%) brightness(1.05)",
          border: "1px solid rgba(255,255,255,0.55)",
          boxShadow:
            "0 56px 110px -44px rgba(26,30,44,0.48), 0 10px 28px -14px rgba(26,30,44,0.18), inset 0 1px 1px rgba(255,255,255,0.92), inset 0 -1px 1px rgba(255,255,255,0.25), inset 1px 0 1px rgba(255,255,255,0.3)",
        }}
      >
        {/* specular sheen + top highlight */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 36,
            pointerEvents: "none",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 26%)",
            mixBlendMode: "screen",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -1,
            left: 44,
            right: 44,
            height: 1,
            pointerEvents: "none",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)",
          }}
        />

        {/* ================= LEFT — IDENTITY ================= */}
        <div
          className="jj-left"
          style={{
            width: 372,
            flex: "none",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* circular portrait, tilts on hover */}
          <div
            onMouseMove={portraitMove}
            onMouseLeave={portraitLeave}
            style={{
              opacity: rev,
              transform: revUp,
              transition: "opacity .8s ease, transform .8s ease",
              width: 154,
              height: 154,
              marginBottom: 30,
              perspective: 760,
            }}
          >
            <div
              ref={portraitRef}
              style={{
                width: 154,
                height: 154,
                borderRadius: "50%",
                overflow: "hidden",
                border: "4px solid rgba(255,255,255,0.72)",
                boxShadow:
                  "0 16px 38px -14px rgba(20,22,30,0.5), 0 0 0 1px rgba(40,40,55,0.06)",
                willChange: "transform",
                transition: "transform .22s cubic-bezier(.2,.8,.2,1)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/portrait.png"
                alt="Jawad Jalal"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* kinetic, impactful name */}
          <h1
            style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontWeight: 600,
              fontSize: 55,
              lineHeight: 0.95,
              letterSpacing: "-0.026em",
              margin: "0 0 16px",
              color: "#0d0c08",
              display: "flex",
              flexWrap: "wrap",
              columnGap: 16,
              rowGap: 0,
            }}
          >
            {NAME_PARTS.map((part, pi) => (
              <span key={pi} style={{ display: "inline-flex" }}>
                {part.split("").map((ch, ci) => {
                  const idx = pi * 5 + ci;
                  return (
                    <span
                      key={ci}
                      className="jj-letter"
                      style={{
                        display: "inline-block",
                        cursor: "default",
                        opacity: rev,
                        transform: revUp,
                        transition:
                          "opacity .6s ease, transform .35s cubic-bezier(.2,.8,.2,1), color .25s ease",
                        transitionDelay: `${40 + idx * 35}ms`,
                      }}
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          {/* sub headline — Chillax, no italics */}
          <div
            style={{
              opacity: rev,
              transform: revUp,
              transition: "opacity .7s ease .34s, transform .7s ease .34s",
              fontFamily: "'Chillax', 'Inter', sans-serif",
              fontSize: 18,
              lineHeight: 1.32,
              marginBottom: 16,
            }}
          >
            <span style={{ fontWeight: 600, color: "#16150f" }}>
              Designer &amp; Founder.
            </span>{" "}
            <span style={{ fontWeight: 500, color: "var(--accent)" }}>
              Building the good&#8209;looking.
            </span>
          </div>

          {/* 2-line bio, no em dashes */}
          <p
            style={{
              opacity: rev,
              transform: revUp,
              transition: "opacity .7s ease .4s, transform .7s ease .4s",
              fontSize: 14,
              lineHeight: 1.6,
              color: "#6a6961",
              margin: "0 0 28px",
              maxWidth: 330,
              textWrap: "pretty",
            }}
          >
            Fifteen, just outside London, operating at industry level since
            thirteen. 3D artist, marketer, and founder making things that look
            good and actually work.
          </p>

          {/* text links with icons */}
          <div
            style={{
              opacity: rev,
              transform: revUp,
              transition: "opacity .7s ease .48s, transform .7s ease .48s",
              display: "flex",
              flexDirection: "column",
              gap: 13,
              marginBottom: "auto",
            }}
          >
            <TextLink
              href="#"
              label="Writing"
              soon
              icon={
                <>
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </>
              }
            />
            <TextLink
              href="#"
              label="Newsletter"
              soon
              icon={
                <>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </>
              }
            />
            <TextLink
              href="#"
              label="Download CV"
              icon={
                <>
                  <path d="M12 3v12" />
                  <path d="m7 12 5 5 5-5" />
                  <path d="M5 21h14" />
                </>
              }
            />
            <a
              href="mailto:hijawadjalal@gmail.com"
              className="jj-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 11,
                width: "fit-content",
                fontSize: 15,
                color: "#16150f",
                transition: "gap .22s ease",
              }}
            >
              <span style={{ color: "var(--accent)", display: "flex" }}>
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </span>
              <span
                style={{
                  borderBottom: "1px solid var(--accent)",
                  paddingBottom: 2,
                  color: "var(--accent)",
                }}
              >
                Email me
              </span>
            </a>
          </div>

          {/* socials in glass pill */}
          <div
            style={{
              opacity: rev,
              transform: revUp,
              transition: "opacity .7s ease .56s, transform .7s ease .56s",
              marginTop: 30,
              display: "inline-flex",
              alignSelf: "flex-start",
              gap: 17,
              alignItems: "center",
              padding: "12px 19px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.42)",
              WebkitBackdropFilter: "blur(14px)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.62)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.8), 0 8px 22px -12px rgba(20,22,30,0.28)",
            }}
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="jj-soc"
                style={{
                  color: s.color,
                  opacity: 0.8,
                  transition: "opacity .2s ease, transform .2s ease",
                  display: "block",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width={s.size}
                  height={s.size}
                  style={{ fill: "currentColor", display: "block" }}
                >
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* ================= RIGHT — EXPERIENCE ================= */}
        <div
          className="jj-mid"
          style={{
            flex: 1,
            minWidth: 0,
            borderLeft: "1px solid var(--rule)",
            paddingLeft: 72,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              opacity: rev,
              transform: revUp,
              transition: "opacity .7s ease .2s, transform .7s ease .2s",
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 18,
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#a6a399",
              }}
            >
              Experience
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "#bcb9af",
              }}
            >
              {JOBS.length} roles
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {JOBS.map((job, i) => (
              <a
                key={job.org}
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={jobEnter}
                onMouseLeave={jobLeave}
                style={{
                  opacity: rev,
                  transform: revUp,
                  transition:
                    "opacity .6s ease, transform .6s ease, background-color .24s ease, box-shadow .24s ease",
                  transitionDelay: `${(0.26 + i * 0.05).toFixed(2)}s`,
                  display: "block",
                  padding: "13px 14px",
                  margin: "0 -14px",
                  borderRadius: 14,
                  borderBottom: "1px solid var(--rule)",
                }}
              >
                <span
                  style={{ display: "flex", gap: 16, alignItems: "center" }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: "#aaa79d",
                      width: 92,
                      flex: "none",
                    }}
                  >
                    {job.year}
                  </span>
                  <span
                    className="jj-tile"
                    style={{
                      width: 34,
                      height: 34,
                      flex: "none",
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.34)",
                      WebkitBackdropFilter: "blur(8px) saturate(160%)",
                      backdropFilter: "blur(8px) saturate(160%)",
                      border: "1px solid rgba(255,255,255,0.55)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.7), 0 3px 9px -5px rgba(20,22,30,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      padding: 5,
                      transition: "transform .26s cubic-bezier(.2,.8,.2,1)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={job.icon}
                      alt=""
                      width={24}
                      height={24}
                      style={{
                        display: "block",
                        width: 24,
                        height: 24,
                        objectFit: "contain",
                        borderRadius: 5,
                      }}
                    />
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        display: "block",
                        fontSize: 17,
                        fontWeight: 600,
                        color: "#16150f",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {job.org}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: 13,
                        color: "#908e85",
                        marginTop: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {job.role}
                    </span>
                  </span>
                  <span
                    className="jj-arrow"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 14,
                      color: "var(--accent)",
                      opacity: 0,
                      transform: "translateX(-5px)",
                      transition: "opacity .24s ease, transform .24s ease",
                      flex: "none",
                    }}
                  >
                    &#8599;
                  </span>
                </span>
                <span
                  className="jj-detail"
                  style={{
                    display: "block",
                    maxHeight: 0,
                    opacity: 0,
                    overflow: "hidden",
                    transition:
                      "max-height .34s cubic-bezier(.2,.8,.2,1), opacity .3s ease, margin-top .3s ease",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "#6a6961",
                      paddingLeft: 108,
                      paddingRight: 24,
                      textWrap: "pretty",
                    }}
                  >
                    {job.detail}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TextLink({
  href,
  icon,
  label,
  soon,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  soon?: boolean;
}) {
  return (
    <a
      href={href}
      rel="noopener"
      className="jj-link"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 11,
        width: "fit-content",
        fontSize: 15,
        color: "#16150f",
        transition: "gap .22s ease",
      }}
    >
      <span style={{ color: "#a8a59b", display: "flex" }}>
        <svg
          viewBox="0 0 24 24"
          width="15"
          height="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icon}
        </svg>
      </span>
      <span
        className="jj-link-label"
        style={{
          borderBottom: "1px solid rgba(40,40,55,0.2)",
          paddingBottom: 2,
          transition: "border-color .22s ease, color .22s ease",
        }}
      >
        {label}
      </span>
      {soon && (
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10.5,
            color: "#c0bcb2",
          }}
        >
          soon
        </span>
      )}
    </a>
  );
}
