import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { translations } from "../../data/translations";

const API_KEY = import.meta.env.VITE_THE_NEWS_API_KEY;

function NewsSection({ language }) {
  const [news, setNews] = useState([]);
  const [status, setStatus] = useState("loading");
  const [reloadKey, setReloadKey] = useState(0);

  const t = translations[language];

  useEffect(() => {
    const controller = new AbortController();

    const getNews = async () => {
      try {
        setStatus("loading");

        const response = await fetch(
          `https://api.thenewsapi.com/v1/news/all?api_token=${API_KEY}&categories=tech&language=en&limit=3`,
          {
            signal: controller.signal,
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error("NEWS_API_ERROR");
        }

        const articles = Array.isArray(data.data)
          ? data.data
          : [];

        setNews(articles);

        setStatus(
          articles.length > 0
            ? "success"
            : "empty",
        );
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error("NEWS ERROR:", error);

        setNews([]);
        setStatus("error");
      }
    };

    getNews();

    return () => {
      controller.abort();
    };
  }, [reloadKey]);

  const handleRetry = () => {
    setReloadKey((current) => current + 1);
  };

  return (
    <section
      id="news"
      className="scroll-mt-[80px] py-[45px] md:py-[60px]"
    >
      <div className="mx-auto w-full max-w-[1160px] px-[16px] md:px-[24px] xl:px-[10px]">
        <h2 className="text-center text-[20px] font-semibold md:text-[24px]">
          {t.news.title}
        </h2>

        {/* LOADING */}
        {status === "loading" && (
          <div className="mx-auto mt-[28px] grid max-w-[860px] grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-[250px] animate-pulse overflow-hidden rounded-[20px] border border-black/5 bg-[#F5F5F5] dark:border-white/5 dark:bg-[#1C1C1C]"
              >
                <div className="h-[130px] bg-[#E8E8E8] dark:bg-[#292929]" />

                <div className="space-y-[10px] p-[16px]">
                  <div className="h-[12px] w-[85%] rounded-full bg-[#DDDDDD] dark:bg-[#333333]" />

                  <div className="h-[12px] w-[65%] rounded-full bg-[#DDDDDD] dark:bg-[#333333]" />

                  <div className="mt-[18px] h-[34px] w-[90px] rounded-[10px] bg-[#E3E3E3] dark:bg-[#303030]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR */}
        {status === "error" && (
          <div className="mx-auto mt-[30px] max-w-[520px] rounded-[20px] border border-black/5 bg-[#F8F8F8] px-[22px] py-[25px] text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:border-white/5 dark:bg-[#1C1C1C]">
            <div className="mx-auto flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#FFF0E1] text-[#D9771E] dark:bg-[#3A2C20] dark:text-[#FFB36C]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-[21px] w-[21px]"
              >
                <path
                  d="M12 8v5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />

                <circle
                  cx="12"
                  cy="16.5"
                  r="1"
                  fill="currentColor"
                />

                <path
                  d="M10.3 4.8 3.9 16a2 2 0 0 0 1.7 3h12.8a2 2 0 0 0 1.7-3L13.7 4.8a2 2 0 0 0-3.4 0Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="mt-[14px] text-[14px] font-semibold">
              {language === "ua"
                ? "Не вдалося завантажити новини"
                : "Failed to load news"}
            </p>

            <p className="mx-auto mt-[6px] max-w-[360px] text-[11px] leading-[1.6] text-[#777777] dark:text-[#BDBDBD]">
              {language === "ua"
                ? "Сервіс новин тимчасово недоступний або досягнуто ліміту запитів."
                : "The news service is temporarily unavailable or its request limit has been reached."}
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="mt-[17px] rounded-[11px] bg-[#FFB36C] px-[18px] py-[9px] text-[10px] font-semibold text-black transition-all duration-200 hover:bg-[#FFA95D] active:scale-95"
            >
              {language === "ua"
                ? "Спробувати ще раз"
                : "Try again"}
            </button>
          </div>
        )}

        {/* EMPTY */}
        {status === "empty" && (
          <div className="mx-auto mt-[30px] max-w-[500px] rounded-[18px] bg-[#F7F7F7] px-[20px] py-[24px] text-center dark:bg-[#1C1C1C]">
            <p className="text-[13px] font-semibold">
              {language === "ua"
                ? "Новини не знайдено"
                : "No news found"}
            </p>

            <p className="mt-[5px] text-[10px] text-[#777777] dark:text-[#BDBDBD]">
              {language === "ua"
                ? "Спробуйте оновити секцію трохи пізніше."
                : "Try refreshing the section later."}
            </p>
          </div>
        )}

        {/* NEWS */}
        {status === "success" && (
          <div className="mx-auto mt-[25px] grid max-w-[860px] grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-3 xl:mt-[30px]">
            {news.map((article) => (
              <NewsCard
                key={article.uuid}
                article={article}
                language={language}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default NewsSection;