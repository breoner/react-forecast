function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle theme"
      className="relative h-[32px] w-[62px] rounded-full bg-[#D9D9D9] p-[4px] transition-colors duration-300 dark:bg-[#3A3A3A]"
    >
      <span
        className={`flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 ${
          isDark ? "translate-x-[30px]" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <svg
            viewBox="0 0 24 24"
            className="h-[16px] w-[16px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-[16px] w-[16px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="12" cy="12" r="4" />

            <path
              strokeLinecap="round"
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            />
          </svg>
        )}
      </span>
    </button>
  );
}

export default ThemeToggle;
