import React from 'react';
import { EyeIcon, ThumbsUpIcon, CalendarIcon, UserIcon } from 'lucide-react';
import { KnowledgeBaseArticle } from '../../types/help.types';

interface ArticleCardProps {
  article: KnowledgeBaseArticle;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
            {article.category}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <EyeIcon className="w-4 h-4 mr-1" />
            {article.views}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3 hover:text-yellow-600 cursor-pointer line-clamp-2">
          {article.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
          <div className="flex items-center">
            <UserIcon className="w-3 h-3 mr-1" />
            {article.author}
          </div>
          <div className="flex items-center">
            <CalendarIcon className="w-3 h-3 mr-1" />
            {formatDate(article.created_at)}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-green-600 text-sm">
            <ThumbsUpIcon className="w-4 h-4 mr-1" />
            {article.helpful_count} helpful
          </div>
          <button className="text-yellow-600 hover:text-yellow-700 font-medium text-sm">
            Read More →
          </button>
        </div>
      </div>
    </div>
  );
};