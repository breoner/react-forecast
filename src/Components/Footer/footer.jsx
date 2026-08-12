import logo from "../../assets/logo.svg";

function Footer({ isDark }) {
  const secondaryText = isDark ? "text-[#BDBDBD]" : "text-[#666666]";

  return (
    <footer
      className={`py-[40px] transition-colors duration-300 ${
        isDark ? "bg-[#1C1C1C] text-white" : "bg-[#E4E4E4] text-black"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-[30px] px-[16px] md:flex-row md:items-start md:justify-between md:px-[24px] xl:px-[10px]">
        <div>
          <img
            src={logo}
            alt="Logo"
            className={`h-[45px] w-auto transition-all duration-300 ${
              isDark ? "invert opacity-90" : ""
            }`}
          />

          <p
            className={`mt-[15px] max-w-[260px] text-[12px] transition-colors duration-300 ${secondaryText}`}
          >
            Weather, technology news and beautiful nature in one place.
          </p>
        </div>

        <div>
          <h3 className="text-[14px] font-semibold">Navigation</h3>

          <nav className="mt-[15px] flex flex-col gap-[10px] text-[12px]">
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
        </div>

        <div>
          <h3 className="text-[14px] font-semibold">Contact us</h3>

          <div
            className={`mt-[15px] flex flex-col gap-[10px] text-[12px] transition-colors duration-300 ${secondaryText}`}
          >
            <a
              href="mailto:weather@example.com"
              className="transition-colors duration-200 hover:text-[#FF9D4D]"
            >
              weather@example.com
            </a>

            <a
              href="tel:+380000000000"
              className="transition-colors duration-200 hover:text-[#FF9D4D]"
            >
              +380 00 000 00 00
            </a>
          </div>
        </div>
      </div>

      <div
        className={`mx-auto mt-[35px] w-full max-w-[1160px] border-t px-[16px] pt-[20px] transition-colors duration-300 md:px-[24px] xl:px-[10px] ${
          isDark ? "border-[#3A3A3A]" : "border-[#C7C7C7]"
        }`}
      >
        <p
          className={`text-center text-[10px] transition-colors duration-300 ${
            isDark ? "text-[#A8A8A8]" : "text-[#777777]"
          }`}
        >
          © 2026 Weather dashboard. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
