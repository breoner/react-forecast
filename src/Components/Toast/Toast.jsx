import { useEffect } from "react";

function Toast({ message, type = "info", onClose, duration = 2800 }) {
  useEffect(() => {
    if (!message) {
      return;
    }

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [message, duration, onClose]);

  if (!message) {
    return null;
  }

  const styles = {
    success:
      "border-green-200 bg-green-50 text-green-800 dark:border-green-900/60 dark:bg-green-950/80 dark:text-green-200",

    error:
      "border-red-200 bg-red-50 text-red-800 dark:border-red-900/60 dark:bg-red-950/80 dark:text-red-200",

    info: "border-[#FFB36C]/40 bg-[#FFF7EF] text-[#9B571A] dark:border-[#FFB36C]/30 dark:bg-[#3A2C20] dark:text-[#FFC083]",
  };

  const icons = {
    success: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
        <path
          d="m5 12 4 4 10-10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),

    error: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
        <path
          d="M12 8v5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <circle cx="12" cy="16.5" r="1" fill="currentColor" />

        <path
          d="M10.3 4.8 3.9 16a2 2 0 0 0 1.7 3h12.8a2 2 0 0 0 1.7-3L13.7 4.8a2 2 0 0 0-3.4 0Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),

    info: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />

        <path
          d="M12 11v5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <circle cx="12" cy="8" r="1" fill="currentColor" />
      </svg>
    ),
  };

  return (
    <div className="pointer-events-none fixed right-[16px] top-[90px] z-[9999] w-[calc(100%-32px)] max-w-[360px]">
      <div
        className={`toast-enter pointer-events-auto flex items-start gap-[11px] rounded-[16px] border px-[15px] py-[13px] shadow-[0_14px_40px_rgba(0,0,0,0.16)] backdrop-blur-xl ${styles[type]}`}
      >
        <div className="mt-[1px] shrink-0">{icons[type]}</div>

        <p className="min-w-0 flex-1 text-[11px] font-semibold leading-[1.5] md:text-[12px]">
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[17px] opacity-60 transition-all hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/10"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default Toast;
