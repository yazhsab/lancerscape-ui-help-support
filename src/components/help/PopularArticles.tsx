import React from 'react';
import { BookOpenIcon, EyeIcon } from 'lucide-react';
import { KnowledgeBaseArticle } from '../../types/help.types';

interface PopularArticlesProps {
  articles: KnowledgeBaseArticle[];
}

export const PopularArticles: React.FC<PopularArticlesProps> = ({ articles }) => {
  const popularArticles = articles.slice(0, 5);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Articles</h2>
      <div className="space-y-4">
        {popularArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpenIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2 hover:text-yellow-600 cursor-pointer">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {article.content.substring(0, 120)}...
                </p>
                <div className="flex items-center text-xs text-gray-500 space-x-4">
                  <span className="flex items-center">
                    <EyeIcon className="w-3 h-3 mr-1" />
                    {article.views} views
                  </span>
                  <span>{article.category}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <a
          href="/help/articles"
          className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-md hover:bg-yellow-600 font-medium transition-colors"
        >
          Browse All Articles
        </a>
      </div>
    </div>
  );
};