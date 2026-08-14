import { useEffect, useState } from "react";
import { translations } from "../../data/translations";

function SignUpModal({ onClose, onSignUp, language }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const t = translations[language];

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      return;
    }

    onSignUp({
      username: username.trim(),
      email: email.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-[16px]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[480px] rounded-[20px] bg-white px-[32px] py-[28px] text-black transition-colors duration-300 dark:bg-[#242424] dark:text-white md:px-[45px] md:py-[32px]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-[18px] top-[14px] flex h-[30px] w-[30px] items-center justify-center rounded-full text-[26px] leading-none transition-all duration-200 hover:rotate-90 hover:bg-[#E4E4E4] active:scale-90 dark:hover:bg-[#3A3A3A]"
        >
          ×
        </button>

        <h2 className="text-center text-[26px] font-medium">
          {t.auth.title}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-[35px]"
        >
          <div>
            <label className="text-[14px] font-medium">
              {t.auth.username}
            </label>

            <input
              type="text"
              placeholder={t.auth.username}
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              className="mt-[10px] h-[50px] w-full rounded-[10px] bg-[#E4E4E4] px-[20px] text-[14px] text-black outline-none placeholder:text-[#888888] focus:ring-2 focus:ring-[#FFB36C] dark:bg-[#303030] dark:text-white"
            />
          </div>

          <div className="mt-[24px]">
            <label className="text-[14px] font-medium">
              {t.auth.email}
            </label>

            <input
              type="email"
              placeholder={t.auth.email}
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              className="mt-[10px] h-[50px] w-full rounded-[10px] bg-[#E4E4E4] px-[20px] text-[14px] text-black outline-none placeholder:text-[#888888] focus:ring-2 focus:ring-[#FFB36C] dark:bg-[#303030] dark:text-white"
            />
          </div>

          <div className="mt-[24px]">
            <label className="text-[14px] font-medium">
              {t.auth.password}
            </label>

            <input
              type="password"
              placeholder={t.auth.password}
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              className="mt-[10px] h-[50px] w-full rounded-[10px] bg-[#E4E4E4] px-[20px] text-[14px] text-black outline-none placeholder:text-[#888888] focus:ring-2 focus:ring-[#FFB36C] dark:bg-[#303030] dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="mx-auto mt-[28px] block rounded-[10px] bg-[#FFB36C] px-[30px] py-[10px] text-[14px] text-black transition-all duration-200 hover:bg-[#FFA95D] active:scale-95"
          >
            {t.auth.signUp}
          </button>

          <p className="mt-[10px] text-center text-[10px] font-medium">
            {t.auth.alreadyAccount}{" "}

            <button
              type="button"
              className="underline transition-colors duration-200 hover:text-[#FF9D4D]"
            >
              {t.auth.login}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;