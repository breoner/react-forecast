import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

function NewsSection() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=technology&language=en&sortBy=publishedAt&apiKey=${API_KEY}`,
      );

      const data = await response.json();

      setNews(data.articles);
    };

    getNews();
  }, []);

  const [visibleCount, setVisibleCount] = useState(4);

  return (
    <section className="py-[60px]">
      <div className="mx-auto w-full max-w-[1160px] px-[10px]">
        <h2 className="text-center text-[24px] font-semibold">
          Technology news
        </h2>

        <div className="mt-[30px] grid grid-cols-1 gap-[20px] md:grid-cols-2 xl:grid-cols-4">
          {news.slice(0, visibleCount).map((article) => (
            <NewsCard key={article.url} article={article} />
          ))}
        </div>

        {visibleCount < news.length && (
          <div className="mt-[30px] flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + 4)}
              className="rounded-[10px] bg-[#FFB36C] px-[24px] py-[10px] text-[12px] font-medium transition-all duration-200 hover:bg-[#FFA95D] active:scale-95"
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
