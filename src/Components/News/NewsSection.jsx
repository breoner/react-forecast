import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { translations } from "../../data/translations";

const API_KEY = import.meta.env.VITE_THE_NEWS_API_KEY;

function NewsSection({ language }) {
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const t = translations[language];

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("NEWS API KEY:", API_KEY ? "KEY EXISTS" : "NO KEY");

        const response = await fetch(
          `https://api.thenewsapi.com/v1/news/all?api_token=${API_KEY}&categories=tech&language=en&limit=3`,
        );

        const data = await response.json();

        console.log("NEWS STATUS:", response.status);
        console.log("NEWS RESPONSE:", data);

        if (!response.ok) {
          throw new Error(data.error?.message || data.message || t.news.error);
        }

        setNews(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("NEWS ERROR:", error);
        setError(error.message);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, []);

  return (
    <section id="news" className="scroll-mt-[80px] py-[45px] md:py-[60px]">
      <div className="mx-auto w-full max-w-[1160px] px-[16px] md:px-[24px] xl:px-[10px]">
        <h2 className="text-center text-[20px] font-semibold md:text-[24px]">
          {t.news.title}
        </h2>

        {loading && (
          <p className="mt-[20px] text-center text-[12px] text-[#777777] dark:text-[#BDBDBD]">
            {language === "ua" ? "Завантаження новин..." : "Loading news..."}
          </p>
        )}

        {error && (
          <p className="mt-[20px] text-center text-[12px] text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && news.length === 0 && (
          <p className="mt-[20px] text-center text-[12px] text-[#777777] dark:text-[#BDBDBD]">
            {language === "ua" ? "Новини не знайдено" : "No news found"}
          </p>
        )}

        <div className="mx-auto mt-[25px] grid max-w-[860px] grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-3 xl:mt-[30px]">
          {news.map((article) => (
            <NewsCard
              key={article.uuid}
              article={article}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsSection;
