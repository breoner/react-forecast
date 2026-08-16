import ProfileMenu from "./ProfileMenu";
import { translations } from "../../data/translations";

function MobileMenu({
  user,
  isProfileOpen,
  setIsProfileOpen,
  onSignUp,
  onLogout,
  onAvatarChange,
  language,
}) {
  const t = translations[language];

  const initial = user?.username?.trim()?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="absolute left-0 top-full w-full border-t border-[#E5E5E5] bg-white text-black shadow-[0_15px_35px_rgba(0,0,0,0.12)] transition-colors duration-300 dark:border-[#303030] dark:bg-[#171717] dark:text-white md:hidden">
      <div className="mx-auto w-full max-w-[360px] px-[16px] py-[22px]">
        <nav className="flex flex-col gap-[5px]">
          <a
            href="#weather"
            className="rounded-[12px] px-[14px] py-[11px] text-[12px] font-semibold transition-colors hover:bg-[#F5F5F5] dark:hover:bg-[#242424]"
          >
            {t.header.weather}
          </a>

          <a
            href="#news"
            className="rounded-[12px] px-[14px] py-[11px] text-[12px] font-semibold transition-colors hover:bg-[#F5F5F5] dark:hover:bg-[#242424]"
          >
            {t.header.news}
          </a>

          <a
            href="#nature"
            className="rounded-[12px] px-[14px] py-[11px] text-[12px] font-semibold transition-colors hover:bg-[#F5F5F5] dark:hover:bg-[#242424]"
          >
            {t.header.nature}
          </a>
        </nav>

        <div className="my-[16px] h-px bg-[#EEEEEE] dark:bg-[#303030]" />

        {user ? (
          <div>
            <button
              type="button"
              onClick={() => setIsProfileOpen((current) => !current)}
              className="flex w-full items-center gap-[11px] rounded-[14px] bg-[#F7F7F7] p-[10px] text-left transition-colors duration-200 dark:bg-[#222222]"
            >
              <div className="h-[42px] w-[42px] shrink-0 overflow-hidden rounded-[12px] bg-[#FFF0E1] dark:bg-[#3A2C20]">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-[15px] font-semibold text-[#D9771E] dark:text-[#FFB36C]">
                    {initial}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold">
                  {user.username}
                </p>

                <p className="mt-[2px] truncate text-[9px] text-[#777777] dark:text-[#AAAAAA]">
                  {user.email}
                </p>
              </div>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className={`h-[14px] w-[14px] text-[#777777] transition-transform duration-200 ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m6 9 6 6 6-6"
                />
              </svg>
            </button>

            {isProfileOpen && (
              <div className="mt-[10px]">
                <ProfileMenu
                  user={user}
                  onLogout={onLogout}
                  onAvatarChange={onAvatarChange}
                  language={language}
                />
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={onSignUp}
            className="w-full rounded-[12px] bg-[#FFB36C] px-[18px] py-[11px] text-[11px] font-semibold text-black transition-all duration-200 hover:bg-[#FFA95D] active:scale-[0.98]"
          >
            {t.header.signUp}
          </button>
        )}
      </div>
    </div>
  );
}

export default MobileMenu;
