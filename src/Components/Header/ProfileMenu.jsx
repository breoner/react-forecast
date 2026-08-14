import { translations } from "../../data/translations";

function ProfileMenu({
  user,
  onLogout,
  language,
}) {
  const t = translations[language];

  return (
    <div className="min-w-[200px] rounded-[10px] bg-white px-[18px] py-[16px] text-black shadow-lg dark:bg-[#242424] dark:text-white">
      <p className="truncate text-[13px] font-semibold">
        {user.username}
      </p>

      <p className="mt-[3px] truncate text-[11px] text-[#878787] dark:text-[#BDBDBD]">
        {user.email}
      </p>

      <button
        type="button"
        onClick={onLogout}
        className="mt-[14px] w-full rounded-[10px] bg-[#FFB36C] px-[20px] py-[9px] text-[11px] font-medium text-black"
      >
        {t.auth.logout}
      </button>
    </div>
  );
}

export default ProfileMenu;