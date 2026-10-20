"use client";
import { useState, useEffect, useRef, useId } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  X,
  Menu,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Car } from "@/lib/sample";
import {
  readArchiveState,
  writeArchiveState,
  validArchiveFilters,
} from "@/lib/archive-state";
import { useNewsletterAvailability } from "./newsletter-availability";
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const navId = useId();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  const isWorkshop =
    path === "/workshop" || /^\/cars\/[^/]+\/workshop$/.test(path);
  const active = (url: string) =>
    url === "/workshop"
      ? isWorkshop
      : url === "/archive"
        ? path === "/archive" ||
          path === "/search" ||
          (path.startsWith("/cars/") && !isWorkshop)
        : path === url || (url !== "/" && path.startsWith(url + "/"));
  return (
    <>
      <div className="utility">
        <span>AN INDEPENDENT AUTOMOTIVE JOURNAL</span>
        <span>ONE CAR. EVERY WEEK. A STORY WORTH KEEPING.</span>
      </div>
      <header className="header">
        <a className="wordmark" href="/" aria-label="Motor Archive home">
          MOTOR<span>/</span>ARCHIVE<span className="logo-dot">®</span>
        </a>
        <nav
          id={navId}
          aria-label="Main navigation"
          className={open ? "nav open" : "nav"}
        >
          {[
            ["Journal", "/"],
            ["The cars", "/archive"],
            ["Motorsport", "/motorsport"],
            ["Design", "/design"],
            ["Photo archive", "/photography"],
            ["Workshop", "/workshop"],
          ].map(([label, url]) => (
            <a
              key={url}
              className={active(url) ? "active" : ""}
              aria-current={active(url) ? "page" : undefined}
              href={url}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a href="/search" aria-label="Search the archive">
            <Search size={19} />
          </a>
          <a className="subscribe-link" href="/newsletter">
            The Sunday letter <ArrowUpRight size={15} />
          </a>
          <button
            className="menu"
            ref={menuButton}
            aria-controls={navId}
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <a className="wordmark" href="/">
            MOTOR<span>/</span>ARCHIVE
          </a>
          <p>
            The stories behind the machines.
            <br />A journal for the endlessly curious.
          </p>
        </div>
        <div>
          <span className="eyebrow">EXPLORE</span>
          <a href="/archive">The archive</a>
          <a href="/motorsport">Motorsport</a>
          <a href="/design">Design files</a>
          <a href="/photography">Photo archive</a>
          <a href="/collections">Collections</a>
          <a href="/workshop">The workshop</a>
        </div>
        <div>
          <span className="eyebrow">THE PUBLICATION</span>
          <a href="/about">Our story</a>
          <a href="/editorial-policy">Editorial policy</a>
          <a href="/image-credits">Photography & credits</a>
          <a href="/corrections">Corrections</a>
        </div>
        <div>
          <span className="eyebrow">STAY IN THE LOOP</span>
          <a href="/newsletter">The Sunday letter ↗</a>
          <a href="/contact">Get in touch ↗</a>
          <a href="/admin">Editorial desk ↗</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} MOTOR / ARCHIVE</span>
        <span>A PRIVATE DESIGN PREVIEW · SAMPLE EDITIONS</span>
        <div>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
export function SectionLabel({
  number,
  children,
  link,
  href,
}: {
  number: string;
  children: React.ReactNode;
  link?: string;
  href?: string;
}) {
  return (
    <div className="section-label">
      <span>
        <i>{number}</i>
        {children}
      </span>
      {link && (
        <a href={href}>
          {link}
          <ArrowUpRight size={15} />
        </a>
      )}
    </div>
  );
}
export function CarCard({
  car,
  large = false,
  href,
}: {
  car: Car;
  large?: boolean;
  href?: string;
}) {
  return (
    <a
      className={large ? "car-card large" : "car-card"}
      href={href || "/cars/" + car.slug}
    >
      <div className="image-frame">
        <img
          src={car.image}
          alt={car.manufacturer + " " + car.model + " - " + car.generation}
          loading="lazy"
          style={{ objectPosition: car.imagePosition || "50% 50%" }}
        />
        <span className="image-arrow">
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className="card-meta">
        <span>EDITION {String(car.number).padStart(3, "0")}</span>
        <span>
          {car.country} · {car.startYear}-{car.endYear}
        </span>
      </div>
      <h3>
        {car.manufacturer} {car.model}
      </h3>
      <p>{car.headline}</p>
    </a>
  );
}
export function Newsletter({ compact = false }: { compact?: boolean }) {
  const available = useNewsletterAvailability();
  const emailId = useId();
  const [state, setState] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <section
      className={compact ? "newsletter compact" : "newsletter"}
      id="newsletter"
    >
      <div>
        <span className="eyebrow">GOOD THINGS TAKE THE SCENIC ROUTE.</span>
        <h2>
          A little more drive.
          <br />
          <em>A little less noise.</em>
        </h2>
        <p>
          One remarkable car. One considered story.
          <br />
          Delivered to your inbox, every Sunday.
        </p>
      </div>
      {!available ? (
        <div className="newsletter-unavailable">
          <span className="eyebrow">THE LETTER IS IN PREPARATION</span>
          <p>
            Subscriptions are not open yet. No email address is collected in
            this preview.
          </p>
          <a className="text-link" href="/archive">
            EXPLORE THE CAR FILES <ArrowUpRight size={15} />
          </a>
        </div>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            try {
              const data = new FormData(e.currentTarget);
              const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: data.get("email"),
                  consent: data.get("consent") === "on",
                }),
              });
              const j = (await res.json()) as { message: string };
              setState(j.message);
            } catch {
              setState("We couldn’t connect. Please try again.");
            } finally {
              setBusy(false);
            }
          }}
        >
          <label htmlFor={emailId}>YOUR EMAIL ADDRESS</label>
          <div className="email-input">
            <input
              id={emailId}
              name="email"
              type="email"
              placeholder="you@somewhere.com"
              required
              autoComplete="email"
            />
            <button disabled={busy} aria-label="Subscribe to the Sunday letter">
              {busy ? "…" : <ArrowRight />}
            </button>
          </div>
          <label className="consent">
            <input type="checkbox" name="consent" required /> I agree to receive
            the Sunday letter. <a href="/privacy">Privacy policy</a>
          </label>
          <p className="form-status" role="status">
            {state ||
              "Thoughtfully written. Never cluttered. Unsubscribe anytime."}
          </p>
        </form>
      )}
    </section>
  );
}
export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const galleryOpen = index !== null;
  useEffect(() => {
    if (!galleryOpen) return;
    const previous = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight")
        setIndex((v) => (v === null ? null : (v + 1) % images.length));
      if (e.key === "ArrowLeft")
        setIndex((v) =>
          v === null ? null : (v + images.length - 1) % images.length,
        );
    };
    document.addEventListener("keydown", handler);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = old;
      previous?.focus();
    };
  }, [galleryOpen, images.length]);
  return (
    <>
      <div className="gallery-grid">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            aria-label={"Enlarge photograph " + (i + 1)}
          >
            <img
              src={src}
              alt={name + " - archive photograph " + (i + 1)}
              loading="lazy"
            />
            <span>
              0{i + 1} <Plus size={16} />
            </span>
          </button>
        ))}
      </div>
      {index !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photographic gallery"
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              const buttons = Array.from(
                e.currentTarget.querySelectorAll<HTMLElement>(
                  "button:not([disabled]),a[href]",
                ),
              );
              const first = buttons[0],
                last = buttons[buttons.length - 1];
              if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
              } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
              }
            }
          }}
        >
          <button
            className="lightbox-close"
            ref={closeRef}
            onClick={() => setIndex(null)}
            aria-label="Close gallery"
          >
            <X />
          </button>
          <button
            onClick={() =>
              setIndex((index + images.length - 1) % images.length)
            }
            aria-label="Previous photograph"
          >
            <ChevronLeft />
          </button>
          <figure>
            <img
              src={images[index]}
              alt={name + " - photograph " + (index + 1)}
            />
            <figcaption aria-live="polite">
              {name} · {index + 1} / {images.length} ·{" "}
              <a href="/image-credits">Photograph credits</a>
            </figcaption>
          </figure>
          <button
            onClick={() => setIndex((index + 1) % images.length)}
            aria-label="Next photograph"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </>
  );
}
export function Share() {
  const [message, setMessage] = useState("Share this story");
  return (
    <button
      className="text-link"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(location.href);
          setMessage("Link copied");
        } catch {
          setMessage("Copy the address from your browser");
        }
      }}
    >
      {message}
      <ArrowUpRight size={16} />
    </button>
  );
}
export function ArchiveBrowser({
  cars,
  initialQuery = "",
  initialParams = "",
}: {
  cars: Car[];
  initialQuery?: string;
  initialParams?: string;
}) {
  const keys: [string, string][] = [
    ["manufacturer", "Manufacturer"],
    ["country", "Country"],
    ["decade", "Decade"],
    ["category", "Category"],
    ["body", "Body style"],
    ["engine", "Engine"],
    ["drivetrain", "Drivetrain"],
    ["fuel", "Fuel type"],
    ["motorsport", "Motorsport"],
    ["significance", "Significance"],
    ["startYear", "Production from"],
    ["endYear", "Production to"],
  ];
  const values = (k: string) =>
    Array.from(
      new Set(
        cars.map((c) =>
          k === "decade"
            ? Math.floor(c.startYear / 10) * 10 + "s"
            : k === "motorsport"
              ? c.motorsport
                ? "Yes"
                : "No"
              : String(c[k as keyof Car]),
        ),
      ),
    ).sort();
  const initial = readArchiveState(new URLSearchParams(initialParams));
  initial.filters = validArchiveFilters(
    initial.filters,
    Object.fromEntries(keys.map(([key]) => [key, values(key)])),
  );
  const [q, setQ] = useState(initialParams ? initial.query : initialQuery);
  const [filters, setFilters] = useState<Record<string, string>>(
    initial.filters,
  );
  const [sort, setSort] = useState(initial.sort);
  const [advanced, setAdvanced] = useState(
    Object.keys(initial.filters).some(
      (k) => !["manufacturer", "country", "decade", "category"].includes(k),
    ),
  );
  const [page, setPage] = useState(initial.page);
  const filterId = useId();
  let results = cars.filter(
    (c) =>
      [
        c.manufacturer,
        c.model,
        c.generation,
        c.category,
        c.engine,
        c.significance,
        ...c.sections.map((s) => s.body),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q.trim().toLowerCase()) &&
      keys.every(
        ([k]) =>
          !filters[k] ||
          (k === "decade"
            ? Math.floor(c.startYear / 10) * 10 + "s"
            : k === "motorsport"
              ? c.motorsport
                ? "Yes"
                : "No"
              : String(c[k as keyof Car])) === filters[k],
      ),
  );
  results.sort((a, b) =>
    sort === "era"
      ? a.startYear - b.startYear
      : sort === "manufacturer"
        ? a.manufacturer.localeCompare(b.manufacturer)
        : sort === "category"
          ? a.category.localeCompare(b.category)
          : b.number - a.number,
  );
  const currentPage = Math.min(
    page,
    Math.max(1, Math.ceil(results.length / 6)),
  );
  useEffect(() => {
    const u = new URL(window.location.href);
    u.search = writeArchiveState(u.searchParams, {
      query: q,
      filters,
      sort,
      page: currentPage,
    }).toString();
    if (u.href !== window.location.href)
      window.history.replaceState(
        window.history.state,
        "",
        u.pathname + u.search + u.hash,
      );
  }, [q, filters, sort, currentPage]);
  useEffect(() => {
    const restore = () => {
      const s = readArchiveState(new URLSearchParams(window.location.search));
      setQ(s.query);
      s.filters = validArchiveFilters(
        s.filters,
        Object.fromEntries(keys.map(([key]) => [key, values(key)])),
      );
      setFilters(s.filters);
      setSort(s.sort);
      setPage(s.page);
      setAdvanced(
        Object.keys(s.filters).some(
          (k) => !["manufacturer", "country", "decade", "category"].includes(k),
        ),
      );
    };
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  const movePage = (next: number) => {
    const u = new URL(window.location.href);
    u.search = writeArchiveState(u.searchParams, {
      query: q,
      filters,
      sort,
      page: next,
    }).toString();
    window.history.pushState(
      window.history.state,
      "",
      u.pathname + u.search + u.hash,
    );
    setPage(next);
  };
  const reset = () => {
    setFilters({});
    setQ("");
    setPage(1);
    setSort("edition");
    setAdvanced(false);
  };
  return (
    <>
      <div className="archive-tools">
        <div className="search-input">
          <Search size={20} />
          <input
            value={q}
            maxLength={200}
            onChange={(e) => {
              setQ(e.target.value.slice(0, 200));
              setPage(1);
            }}
            placeholder="A name. An era. An obsession."
            aria-label="Search cars and stories"
          />
          {q && (
            <button onClick={() => setQ("")} aria-label="Clear search">
              <X size={18} />
            </button>
          )}
        </div>
        <button
          className="filter-toggle"
          aria-expanded={advanced}
          aria-controls={filterId}
          onClick={() => setAdvanced(!advanced)}
        >
          {advanced ? <Minus size={16} /> : <Plus size={16} />} All filters
        </button>
      </div>
      <div className="filter-row" id={filterId}>
        {keys.slice(0, advanced ? keys.length : 4).map(([key, label]) => (
          <label key={key}>
            <span className="sr-only">{label}</span>
            <select
              aria-label={label}
              value={filters[key] || ""}
              onChange={(e) => {
                setFilters({ ...filters, [key]: e.target.value });
                setPage(1);
              }}
            >
              <option value="">{label}</option>
              {values(key).map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
        ))}
        <button className="text-link reset" onClick={reset}>
          Reset filters
        </button>
      </div>
      <div className="results-bar">
        <span role="status" aria-live="polite">
          {results.length} {results.length === 1 ? "story" : "stories"} in the
          collection
        </span>
        <label>
          Sort by{" "}
          <select
            aria-label="Sort stories"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="edition">Latest edition</option>
            <option value="era">Production era</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="category">Category</option>
          </select>
        </label>
      </div>
      {results.length ? (
        <div className="archive-grid">
          {results.slice((currentPage - 1) * 6, currentPage * 6).map((c) => (
            <CarCard key={c.slug} car={c} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No roads lead here. Yet.</h2>
          <p>
            Try a broader search, or reset your filters to explore every story.
          </p>
          <button className="button" onClick={reset}>
            Show all cars
          </button>
        </div>
      )}
      {results.length > 6 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => movePage(currentPage - 1)}
          >
            ← Previous
          </button>
          <span>
            {currentPage} / {Math.ceil(results.length / 6)}
          </span>
          <button
            disabled={currentPage * 6 >= results.length}
            onClick={() => movePage(currentPage + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </>
  );
}
