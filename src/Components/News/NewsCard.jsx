import { translations } from "../../data/translations";

function NewsCard({ article, language }) {
  const t = translations[language];

  return (
    <article className="mx-auto flex w-full max-w-[420px] flex-col overflow-hidden rounded-[15px] bg-white text-black shadow-md transition-all duration-300 hover:-translate-y-[3px] hover:shadow-lg dark:bg-[#242424] dark:text-white xl:max-w-none">
      {article.image_url ? (
        <img
          src={article.image_url}
          alt={article.title}
          className="h-[190px] w-full object-cover md:h-[180px]"
        />
      ) : (
        <div className="flex h-[190px] items-center justify-center bg-[#E4E4E4] text-[12px] text-[#666666] dark:bg-[#303030] dark:text-[#BDBDBD] md:h-[180px]">
          {t.news.noImage}
        </div>
      )}

      <div className="flex flex-1 flex-col p-[15px]">
        <h3 className="text-[13px] font-semibold leading-[1.4] md:text-[14px]">
          {article.title}
        </h3>

        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="mt-auto pt-[15px]"
        >
          <span className="inline-block rounded-[10px] bg-[#FFB36C] px-[18px] py-[8px] text-[10px] text-black">
            {t.news.seeMore}
          </span>
        </a>
      </div>
    </article>
  );
}

export default NewsCard;
