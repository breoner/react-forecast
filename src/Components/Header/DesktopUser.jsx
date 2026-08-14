import ProfileMenu from "./ProfileMenu";

function DesktopUser({
  user,
  userIcon,
  isProfileOpen,
  setIsProfileOpen,
  onSignUp,
  onLogout,
}) {
  return (
    <div className="relative hidden items-center md:flex md:gap-[25px] xl:gap-[27px]">
      {user ? (
        <span className="max-w-[120px] truncate text-[10px] font-medium text-black transition-colors duration-300 dark:text-white xl:text-[12px]">
          {user.username}
        </span>
      ) : (
        <button
          type="button"
          onClick={onSignUp}
          className="rounded-[10px] bg-[#FFB36C] font-medium text-black transition-all duration-200 hover:bg-[#FFA95D] active:scale-95 md:px-[16px] md:py-[8px] md:text-[10px] xl:px-[20px] xl:py-[10px] xl:text-[12px]"
        >
          Sign Up
        </button>
      )}

      <button
        type="button"
        onClick={() =>
          user ? setIsProfileOpen(!isProfileOpen) : onSignUp()
        }
        className="flex items-center justify-center rounded-full transition-all duration-200 hover:bg-[#E4E4E4] active:scale-95 dark:hover:bg-[#2A2A2A]"
      >
        <img
          src={userIcon}
          alt="User"
          className="md:h-[40px] md:w-[40px] md:transition-all md:duration-300 md:dark:invert xl:h-[50px] xl:w-[50px]"
        />
      </button>

      {user && isProfileOpen && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50">
          <ProfileMenu
            user={user}
            onLogout={onLogout}
          />
        </div>
      )}
    </div>
  );
}

export default DesktopUser;