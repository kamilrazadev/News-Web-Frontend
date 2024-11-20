import React, { useMemo } from "react";
import { Clock } from "lucide-react";
import { Article } from "../types";
import { formatDate, truncateTo30Chars } from "../utils";

interface ArticleCardHorizontalProps {
  article: Article;
}

const ArticleCardHorizontal: React.FC<ArticleCardHorizontalProps> = ({
  article,
}) => {
  const articleAuthor: string = useMemo(
    () => truncateTo30Chars(article.author),
    [article]
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex items-center h-24">
      <img
        src={article.urlToImage || "https://via.placeholder.com/300x200"}
        alt={article.title}
        className="w-24 h-full object-cover flex-shrink-0"
      />

      <div className="flex-1 p-3">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1">
          {article.title}
        </h3>

        <div className="text-gray-500">
          <div className="flex items-center space-x-4">
            <span>{articleAuthor}</span>
          </div>
          <div className="mt-1 w-full flex items-center justify-between text-[10px]">
            <p>{formatDate(article.publishedAt).date}</p>
            <div className="flex items-center">
              <Clock className="h-2 w-2 mr-1" />
              <span>{formatDate(article.publishedAt).time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCardHorizontal;
