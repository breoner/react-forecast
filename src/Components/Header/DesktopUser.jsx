import ProfileMenu from "./ProfileMenu";
import { translations } from "../../data/translations";

function DesktopUser({
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
    <div className="relative hidden items-center md:flex md:gap-[25px] xl:gap-[27px]">
      {user ? (
        <span className="max-w-[120px] truncate text-[10px] font-medium dark:text-white xl:text-[12px]">
          {user.username}
        </span>
      ) : (
        <button
          type="button"
          onClick={onSignUp}
          className="rounded-[10px] bg-[#FFB36C] font-medium text-black md:px-[16px] md:py-[8px] md:text-[10px] xl:px-[20px] xl:py-[10px] xl:text-[12px]"
        >
          {t.header.signUp}
        </button>
      )}

      <button
        type="button"
        onClick={() => (user ? setIsProfileOpen(!isProfileOpen) : onSignUp())}
      >
        <img
          src={userIcon}
          alt="User"
          className="md:h-[40px] md:w-[40px] md:dark:invert xl:h-[50px] xl:w-[50px]"
        />
      </button>

      {user && isProfileOpen && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50">
          <ProfileMenu user={user} onLogout={onLogout} language={language} />
        </div>
      )}
    </div>
  );
}

export default DesktopUser;
