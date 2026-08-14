import ProfileMenu from "./ProfileMenu";
import { translations } from "../../data/translations";

function MobileMenu({
  user,
  userIcon,
  isProfileOpen,
  setIsProfileOpen,
  onSignUp,
  onLogout,
  language,
}) {
  const t = translations[language];

  return (
    <div className="absolute left-0 top-full w-full border-t border-[#D0D0D0] bg-white text-black shadow-lg transition-colors duration-300 dark:border-[#303030] dark:bg-[#171717] dark:text-white md:hidden">
      <div className="mx-auto flex w-full max-w-[313px] flex-col items-center px-[16px] py-[35px]">
        <nav className="flex flex-col items-center gap-[30px] text-[14px] font-medium">
          <a href="#weather">{t.header.weather}</a>

          <a href="#news">{t.header.news}</a>

          <a href="#nature">{t.header.nature}</a>
        </nav>

        <div className="mt-[30px] flex flex-col items-center">
          {user ? (
            <>
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <img
                  src={userIcon}
                  alt="User"
                  className="h-[32px] w-[32px] dark:invert"
                />
              </button>

              {isProfileOpen && (
                <div className="mt-[12px]">
                  <ProfileMenu
                    user={user}
                    onLogout={onLogout}
                    language={language}
                  />
                </div>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={onSignUp}
              className="rounded-[10px] bg-[#FFB36C] px-[18px] py-[9px] text-[11px] font-medium text-black"
            >
              {t.header.signUp}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
