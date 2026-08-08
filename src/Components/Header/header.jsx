import { useState } from "react";
import logo from "../../assets/logo.svg";
import user from "../../assets/user.svg";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <div 
      className="mx-auto flex h-[50px] max-w-[313px] items-center justify-between px-[10px] md:h-[70px] md:max-w-[564px] xl:h-[80px] xl:max-w-[1160px]">
        <img
          src={logo}
          alt="24/7 Forecast"
          className="h-[22px] w-[34px] md:h-[36px] md:w-[54px] xl:h-[56px] xl:w-[82px]"
        />

        <nav className="hidden items-center font-medium md:flex md:gap-[45px] md:text-[10px] xl:gap-[42px] xl:text-[12px]">
          <a href="#">Who we are</a>
          <a href="#">Contacts</a>
          <a href="#">Menu</a>
        </nav>

        <div className="hidden items-center md:flex md:gap-[25px] xl:gap-[27px]">
          <button className="rounded-[10px] bg-[#FFB36C] font-medium md:px-[16px] md:py-[8px] md:text-[10px] xl:px-[20px] xl:py-[10px] xl:text-[12px]">
            Sign Up
          </button>

          <img
            src={user}
            alt="User"
            className="md:h-[40px] md:w-[40px] xl:h-[50px] xl:w-[50px]"
          />
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-[8px] text-[12px] font-medium md:hidden"
        >
          Menu
          <span
            className={`h-[8px] w-[8px] border-b border-r border-black transition-transform ${
              isMenuOpen ? "rotate-[225deg]" : "rotate-45"
            }`}
          ></span>
        </button>
      </div>

      {isMenuOpen && (
        <nav className="flex h-[230px] flex-col items-center justify-center gap-[40px] bg-[#E8E8E8] text-[12px] font-medium md:hidden">
          <a href="#">Who we are</a>
          <a href="#">Contacts</a>
          <a href="#">Menu</a>
        </nav>
      )}
    </header>
  );
}

export default Header;