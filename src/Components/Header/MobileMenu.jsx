import ProfileMenu from "./ProfileMenu";

function MobileMenu({
  user,
  userIcon,
  isProfileOpen,
  setIsProfileOpen,
  onSignUp,
  onLogout,
}) {
  return (
    <div className="absolute left-0 top-full w-full border-t border-[#D0D0D0] bg-white text-black shadow-lg transition-colors duration-300 dark:border-[#303030] dark:bg-[#171717] dark:text-white md:hidden">
      <div className="mx-auto flex w-full max-w-[313px] flex-col items-center px-[16px] py-[35px]">
        <nav className="flex flex-col items-center gap-[30px] text-[14px] font-medium">
          <a
            href="#weather"
            className="transition-colors duration-200 hover:text-[#FF9D4D]"
          >
            Weather
          </a>

          <a
            href="#news"
            className="transition-colors duration-200 hover:text-[#FF9D4D]"
          >
            News
          </a>

          <a
            href="#nature"
            className="transition-colors duration-200 hover:text-[#FF9D4D]"
          >
            Nature
          </a>
        </nav>

        <div className="mt-[30px] flex flex-col items-center">
          {user ? (
            <>
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full transition-all duration-200 hover:bg-[#E4E4E4] active:scale-95 dark:hover:bg-[#2A2A2A]"
              >
                <img
                  src={userIcon}
                  alt="User"
                  className="h-[32px] w-[32px] transition-all duration-300 dark:invert"
                />
              </button>

              {isProfileOpen && (
                <div className="mt-[12px]">
                  <ProfileMenu
                    user={user}
                    onLogout={onLogout}
                  />
                </div>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={onSignUp}
              className="rounded-[10px] bg-[#FFB36C] px-[18px] py-[9px] text-[11px] font-medium text-black transition-all duration-200 hover:bg-[#FFA95D] active:scale-95"
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;