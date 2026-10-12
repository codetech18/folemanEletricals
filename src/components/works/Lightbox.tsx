import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
type LightboxProps = {
  src: string;
  poster?: string;
  onClose: () => void;
  type?: "image" | "video";
  title?: string;
};
export function Lightbox({
  src,
  poster,
  onClose,
  type = "video",
  title = "Project video",
}: LightboxProps) {
  const dialog = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    close.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const nodes = dialog.current?.querySelectorAll<HTMLElement>(
          'button, a[href], video[controls], [tabindex="0"]',
        );
        if (!nodes?.length) return;
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [onClose]);
  return createPortal(
    <div
      className="media-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialog}
        className="media-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="media-title"
      >
        <div className="media-dialog-bar">
          <h2 id="media-title">{title}</h2>
          <button
            ref={close}
            onClick={onClose}
            type="button"
            aria-label="Close project"
          >
            Close ×
          </button>
        </div>
        {failed ? (
          <p role="status">
            This media couldn’t be loaded. Please contact us to see more of our
            work.
          </p>
        ) : type === "image" ? (
          <img src={src} alt={title} onError={() => setFailed(true)} />
        ) : (
          <video
            controls
            autoPlay
            playsInline
            preload="metadata"
            src={src}
            poster={poster}
            onError={() => setFailed(true)}
            tabIndex={0}
          />
        )}
      </div>
    </div>,
    document.body,
  );
}
