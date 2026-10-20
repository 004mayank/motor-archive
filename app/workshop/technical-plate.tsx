"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Maximize2, Minus, Plus, X, ArrowUpRight } from "lucide-react";
import plates from "@/public/images/technical-plates.json";
type Plate = (typeof plates)[keyof typeof plates];
function findPlate(slug: string) {
  return (plates as Record<string, Plate>)[slug];
}
export function TechnicalPlateArtwork({
  vehicleSlug = "porsche-911-original",
}: {
  vehicleSlug?: string;
}) {
  const plate = findPlate(vehicleSlug);
  if (!plate) return null;
  return (
    <div className="technical-plate-artwork">
      <img src={plate.src} alt={plate.alt} loading="lazy" />
    </div>
  );
}
export function TechnicalPlate({
  compact = false,
  vehicleSlug = "porsche-911-original",
}: {
  compact?: boolean;
  vehicleSlug?: string;
}) {
  const plate = findPlate(vehicleSlug);
  return plate ? <PlateViewer compact={compact} plate={plate} /> : null;
}
function PlateViewer({ compact, plate }: { compact: boolean; plate: Plate }) {
  const image = plate.src;
  const source = plate.source;
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const title = useId();
  useEffect(() => {
    if (!open) return;
    const before = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    close.current?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
      if (e.key === "Tab") {
        const items = dialog.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]),a[href],[tabindex="0"]',
        );
        if (!items?.length) return;
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", key);
      (before || trigger.current)?.focus();
    };
  }, [open]);
  return (
    <figure
      className={
        "technical-plate" + (compact ? " technical-plate-compact" : "")
      }
    >
      <div className="technical-plate-header">
        <span>M/A TECHNICAL LIBRARY</span>
        <span>
          PLATE {plate.number} / {plate.label}
        </span>
      </div>
      <button
        className="technical-plate-open"
        type="button"
        ref={trigger}
        aria-label={"Enlarge " + plate.label + " technical reference plate"}
        onClick={() => {
          setZoom(1);
          setOpen(true);
        }}
      >
        <TechnicalPlateArtwork vehicleSlug={plate.vehicleSlug} />
        <span className="technical-plate-enlarge">
          <Maximize2 size={14} /> EXPLORE THE PLATE
        </span>
      </button>
      <figcaption>
        <div>
          <strong>FORM. FROM EVERY ANGLE.</strong>
          <p>{plate.caption}</p>
          <small className="technical-plate-credit">
            {plate.credit}
            {plate.licenseUrl && (
              <>
                {" "}
                /{" "}
                <a href={plate.licenseUrl} target="_blank" rel="noreferrer">
                  {plate.license} ↗
                </a>
              </>
            )}
          </small>
        </div>
        <a href={source} target="_blank" rel="noreferrer">
          {plate.sourceLabel} <ArrowUpRight size={13} />
        </a>
      </figcaption>
      {open && (
        <div
          className="plate-lightbox"
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title}
        >
          <header>
            <div>
              <span className="eyebrow">
                MOTOR / ARCHIVE - TECHNICAL LIBRARY
              </span>
              <h2 id={title}>{plate.label} / REFERENCE PLATE</h2>
            </div>
            <button
              ref={close}
              onClick={() => setOpen(false)}
              aria-label="Close technical plate"
            >
              <X size={24} />
            </button>
          </header>
          <div className="plate-controls">
            <span>VIEW / {plate.views}</span>
            <div>
              <button
                onClick={() => setZoom((z) => Math.max(1, z - 0.5))}
                disabled={zoom === 1}
                aria-label="Zoom out technical plate"
              >
                <Minus size={17} />
              </button>
              <output aria-live="polite">{Math.round(zoom * 100)}%</output>
              <button
                onClick={() => setZoom((z) => Math.min(3, z + 0.5))}
                disabled={zoom === 3}
                aria-label="Zoom in technical plate"
              >
                <Plus size={17} />
              </button>
              <button onClick={() => setZoom(1)}>FIT WIDTH</button>
            </div>
          </div>
          <div
            className="plate-scroll"
            tabIndex={0}
            aria-label="Technical drawing; scroll to inspect the enlarged plate"
          >
            <img
              src={image}
              alt={plate.alt}
              style={{ width: `${zoom * 100}%` }}
            />
          </div>
          <footer>
            <span>
              Reference image · confirm the applicable factory publication
              before using any dimensions. Scroll or swipe to inspect.
            </span>
            <a href={source} target="_blank" rel="noreferrer">
              {plate.sourceLabel} ↗
            </a>
          </footer>
        </div>
      )}
    </figure>
  );
}
