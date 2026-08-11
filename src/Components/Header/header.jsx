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
        <div className="mx-auto flex h-[50px] w-full max-w-[313px] items-center justify-between px-[10px] md:h-[70px] md:max-w-[564px] xl:h-[80px] xl:max-w-[1160px]">
          <img
            src={logo}
            alt="Logo"
            className={`h-[45px] w-auto transition-all duration-300 ${
              isDark ? "invert opacity-90" : ""
            }`}
          />

          <nav className="hidden items-center font-medium md:flex md:gap-[30px] md:text-[10px] xl:gap-[42px] xl:text-[12px]">
            <a href="#">Who we are</a>
            <a href="#">Contacts</a>
            <a href="#">Menu</a>
          </nav>

          <div className="hidden items-center gap-[15px] md:flex">
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

          <div className="flex items-center gap-[12px] md:hidden">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-[8px] text-[12px] font-medium"
            >
              Menu
              <span
                className={`h-[8px] w-[8px] border-b border-r border-current transition-transform ${
                  isMenuOpen ? "rotate-[225deg]" : "rotate-45"
                }`}
              />
            </button>
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
