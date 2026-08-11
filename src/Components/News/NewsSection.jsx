import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

const API_KEY = import.meta.env.VITE_THE_NEWS_API_KEY;

function NewsSection() {
  const [news, setNews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  const [error, setError] = useState("");

  useEffect(() => {
    const getNews = async () => {
      try {
        setError("");

        const response = await fetch(
          `https://api.thenewsapi.com/v1/news/all?api_token=${API_KEY}&categories=tech&language=en&limit=20`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || "Failed to load news");
        }

        setNews(data.data || []);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setNews([]);
      }
    };

    getNews();
  }, []);

  return (
    <section className="py-[45px] md:py-[60px]">
      <div className="mx-auto w-full max-w-[1160px] px-[16px] md:px-[24px] xl:px-[10px]">
        <h2 className="text-center text-[20px] font-semibold md:text-[24px]">
          Technology news
        </h2>

        {error && (
          <p className="mt-[20px] text-center text-[12px] text-red-500">
            {error}
          </p>
        )}

        <div className="mt-[25px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 xl:mt-[30px] xl:grid-cols-4">
          {news.slice(0, visibleCount).map((article) => (
            <NewsCard key={article.uuid} article={article} />
          ))}
        </div>

        {visibleCount < news.length && (
          <div className="mt-[30px] flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + 4)}
              className="rounded-[10px] bg-[#FFB36C] px-[24px] py-[10px] text-[12px] font-medium text-black transition-all duration-200 hover:bg-[#FFA95D] active:scale-95"
            >
              See more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default NewsSection;
