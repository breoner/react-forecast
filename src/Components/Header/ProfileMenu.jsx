import { useRef } from "react";
import { translations } from "../../data/translations";

function ProfileMenu({ user, onLogout, onAvatarChange, language }) {
  const t = translations[language];

  const fileInputRef = useRef(null);

  const initial = user?.username?.trim()?.charAt(0)?.toUpperCase() || "U";

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert(
        language === "ua"
          ? "Оберіть файл зображення."
          : "Please select an image file.",
      );

      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      alert(
        language === "ua"
          ? "Зображення має бути менше 3 МБ."
          : "Image must be smaller than 3 MB.",
      );

      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      onAvatarChange(reader.result);
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };

  return (
    <div className="w-[270px] overflow-hidden rounded-[18px] border border-black/[0.07] bg-white text-black shadow-[0_18px_50px_rgba(0,0,0,0.16)] dark:border-white/[0.07] dark:bg-[#202020] dark:text-white">
      {/* USER */}
      <div className="p-[18px]">
        <div className="flex items-center gap-[12px]">
          <button
            type="button"
            onClick={handleAvatarClick}
            aria-label={language === "ua" ? "Змінити аватар" : "Change avatar"}
            className="group/avatar relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-[16px] bg-[#FFF0E1] dark:bg-[#3A2C20]"
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.username}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-[18px] font-semibold text-[#D9771E] dark:text-[#FFB36C]">
                {initial}
              </span>
            )}

            <span className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-200 group-hover/avatar:opacity-100">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-[20px] w-[20px] text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.5 5 16 7h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l1.5-2h5Z"
                />

                <circle cx="12" cy="13" r="3" />
              </svg>
            </span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold">
              {user.username}
            </p>

            <p className="mt-[3px] truncate text-[10px] font-medium text-[#777777] dark:text-[#AAAAAA]">
              {user.email}
            </p>

            <button
              type="button"
              onClick={handleAvatarClick}
              className="mt-[5px] text-[9px] font-semibold text-[#D9771E] transition-colors hover:text-[#FF9D4D] dark:text-[#FFB36C]"
            >
              {language === "ua" ? "Змінити фото" : "Change photo"}
            </button>
          </div>
        </div>

        <div className="mt-[15px] flex items-center gap-[7px]">
          <span className="rounded-full bg-[#FFF0E1] px-[9px] py-[4px] text-[9px] font-semibold text-[#B9651B] dark:bg-[#3A2C20] dark:text-[#FFC083]">
            {language === "ua" ? "Акаунт" : "Account"}
          </span>

          <span className="h-[4px] w-[4px] rounded-full bg-[#4CAF50]" />

          <span className="text-[9px] font-medium text-[#777777] dark:text-[#AAAAAA]">
            {language === "ua" ? "Активний" : "Active"}
          </span>
        </div>
      </div>

      {/* LINKS */}
      <div className="border-t border-[#EEEEEE] px-[8px] py-[8px] dark:border-[#333333]">
        <a
          href="#weather"
          className="flex items-center gap-[11px] rounded-[11px] px-[10px] py-[10px] text-[11px] font-medium transition-colors hover:bg-[#F5F5F5] dark:hover:bg-[#292929]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-[17px] w-[17px] text-[#777777] dark:text-[#AAAAAA]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
            />
          </svg>

          {language === "ua" ? "Мої міста" : "My cities"}
        </a>

        <a
          href="#news"
          className="flex items-center gap-[11px] rounded-[11px] px-[10px] py-[10px] text-[11px] font-medium transition-colors hover:bg-[#F5F5F5] dark:hover:bg-[#292929]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-[17px] w-[17px] text-[#777777] dark:text-[#AAAAAA]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 5h16v14H4zM7 8h6M7 11h6M7 14h4M15 8h2M15 11h2M15 14h2"
            />
          </svg>

          {language === "ua" ? "Новини" : "News"}
        </a>
      </div>

      {/* LOGOUT */}
      <div className="border-t border-[#EEEEEE] p-[8px] dark:border-[#333333]">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-[11px] rounded-[11px] px-[10px] py-[10px] text-left text-[11px] font-semibold text-[#D94A4A] transition-colors hover:bg-red-50 dark:text-[#FF7777] dark:hover:bg-red-950/20"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-[17px] w-[17px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 17l5-5-5-5M15 12H3M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5"
            />
          </svg>

          {t.auth.logout}
        </button>
      </div>
    </div>
  );
}

export default ProfileMenu;
