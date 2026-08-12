import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

const API_KEY = import.meta.env.VITE_THE_NEWS_API_KEY;

function NewsSection() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNews = async () => {
      try {
        setError("");

        const response = await fetch(
          `https://api.thenewsapi.com/v1/news/all?api_token=${API_KEY}&categories=tech&language=en&limit=3`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error?.message || "Failed to load news",
          );
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
    <section
      id="news"
      className="scroll-mt-[80px] py-[45px] md:py-[60px]"
    >
      <div className="mx-auto w-full max-w-[1160px] px-[16px] md:px-[24px] xl:px-[10px]">
        <h2 className="text-center text-[20px] font-semibold md:text-[24px]">
          Technology news
        </h2>

        {error && (
          <p className="mt-[20px] text-center text-[12px] text-red-500">
            {error}
          </p>
        )}

        <div className="mx-auto mt-[25px] grid max-w-[860px] grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-3 xl:mt-[30px]">
          {news.map((article) => (
            <NewsCard
              key={article.uuid}
              article={article}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsSection;