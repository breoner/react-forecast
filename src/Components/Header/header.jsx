import { useState } from "react";
import logo from "../../assets/logo.svg";
import userIcon from "../../assets/user.svg";
import SignUpModal from "../SignUpModal/SignUpModal";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import DesktopUser from "./DesktopUser";
import MobileMenu from "./MobileMenu";

function Header({ isDark, onToggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleSignUp = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setIsSignUpOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="relative z-40 bg-white text-black transition-colors duration-300 dark:bg-[#171717] dark:text-white">
        <div className="mx-auto h-[60px] w-full max-w-[1160px] px-[16px] md:h-[70px] md:px-[24px] xl:h-[80px] xl:px-[10px]">
          {/* MOBILE */}
          <div className="flex h-full items-center justify-between md:hidden">
            <img
              src={logo}
              alt="Logo"
              className={`h-[32px] w-auto transition-all duration-300 ${
                isDark ? "invert opacity-90" : ""
              }`}
            />

            <div className="flex items-center gap-[10px]">
              <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

              <button
                type="button"
                onClick={() => setIsMenuOpen((current) => !current)}
                className="flex items-center gap-[7px] text-[11px] font-medium"
              >
                Menu
                <span
                  className={`h-[7px] w-[7px] border-b border-r border-current transition-transform duration-200 ${
                    isMenuOpen ? "rotate-[225deg]" : "rotate-45"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* TABLET + DESKTOP */}
          <div className="hidden h-full grid-cols-[1fr_auto_1fr] items-center md:grid">
            <div className="flex justify-start">
              <img
                src={logo}
                alt="Logo"
                className={`h-[38px] w-auto transition-all duration-300 xl:h-[45px] ${
                  isDark ? "invert opacity-90" : ""
                }`}
              />
            </div>

            <nav className="flex items-center gap-[30px] text-[10px] font-medium xl:gap-[42px] xl:text-[12px]">
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

            <div className="flex items-center justify-end gap-[15px]">
              <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

              <DesktopUser
                user={user}
                userIcon={userIcon}
                isProfileOpen={isProfileOpen}
                setIsProfileOpen={setIsProfileOpen}
                onSignUp={() => setIsSignUpOpen(true)}
                onLogout={handleLogout}
              />
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <MobileMenu
            user={user}
            userIcon={userIcon}
            isProfileOpen={isProfileOpen}
            setIsProfileOpen={setIsProfileOpen}
            onSignUp={() => {
              setIsMenuOpen(false);
              setIsSignUpOpen(true);
            }}
            onLogout={handleLogout}
          />
        )}
      </header>

      {isSignUpOpen && (
        <SignUpModal
          onClose={() => setIsSignUpOpen(false)}
          onSignUp={handleSignUp}
        />
      )}
    </>
  );
}

export default Header;
