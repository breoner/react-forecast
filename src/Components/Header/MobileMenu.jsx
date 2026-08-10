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
    <div className="absolute left-0 top-full w-full bg-[#E4E4E4] md:hidden">
      <div className="mx-auto flex max-w-[313px] flex-col items-center px-[10px] py-[35px]">
        <nav className="flex flex-col items-center gap-[30px] text-[14px] font-medium">
          <a href="#">Who we are</a>
          <a href="#">Contacts</a>
          <a href="#">Menu</a>
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
                  className="h-[40px] w-[40px]"
                />
              </button>

              {isProfileOpen && (
                <div className="mt-[12px]">
                  <ProfileMenu user={user} onLogout={onLogout} />
                </div>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={onSignUp}
              className="rounded-[10px] bg-[#FFB36C] px-[16px] py-[8px] text-[10px] font-medium"
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