function NewsCard({ article }) {
  return (
    <article className="overflow-hidden rounded-[15px] bg-white text-black shadow-md transition-colors duration-300 dark:bg-[#242424] dark:text-white">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="h-[180px] w-full object-cover"
        />
      )}

      <div className="p-[15px]">
        <h3 className="text-[14px] font-semibold">{article.title}</h3>

        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="mt-[15px] inline-block rounded-[10px] bg-[#FFB36C] px-[18px] py-[8px] text-[10px] text-black transition-all duration-200 hover:bg-[#FFA95D] active:scale-95"
        >
          See more
        </a>
      </div>
    </article>
  );
}

export default NewsCard;
