import ProfileMenu from "./ProfileMenu";
import { translations } from "../../data/translations";

function DesktopUser({
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
    <div className="relative hidden items-center md:flex">
      {user ? (
        <button
          type="button"
          onClick={() => setIsProfileOpen((current) => !current)}
          className="group flex items-center gap-[9px] rounded-[13px] border border-transparent px-[7px] py-[5px] transition-all duration-200 hover:border-[#E5E5E5] hover:bg-[#F7F7F7] dark:hover:border-[#383838] dark:hover:bg-[#242424]"
        >
          <div className="hidden max-w-[110px] text-right lg:block">
            <p className="truncate text-[10px] font-semibold xl:text-[11px]">
              {user.username}
            </p>

            <p className="mt-[1px] text-[8px] font-medium text-[#888888] dark:text-[#AAAAAA]">
              {language === "ua" ? "Акаунт" : "Account"}
            </p>
          </div>

          <div className="h-[38px] w-[38px] overflow-hidden rounded-[12px] bg-[#FFF0E1] dark:bg-[#3A2C20] xl:h-[42px] xl:w-[42px]">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.username}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-[14px] font-semibold text-[#D9771E] dark:text-[#FFB36C]">
                {initial}
              </span>
            )}
          </div>

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={`h-[13px] w-[13px] text-[#777777] transition-transform duration-200 dark:text-[#AAAAAA] ${
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
      ) : (
        <button
          type="button"
          onClick={onSignUp}
          className="rounded-[11px] bg-[#FFB36C] px-[17px] py-[9px] text-[10px] font-semibold text-black shadow-[0_5px_15px_rgba(255,179,108,0.2)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#FFA95D] active:scale-95 xl:px-[20px] xl:py-[10px] xl:text-[11px]"
        >
          {t.header.signUp}
        </button>
      )}

      {user && isProfileOpen && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50">
          <ProfileMenu
            user={user}
            onLogout={onLogout}
            onAvatarChange={onAvatarChange}
            language={language}
          />
        </div>
      )}
    </div>
  );
}

export default DesktopUser;
