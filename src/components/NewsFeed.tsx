
import React from "react";
import { Gamepad, Users } from "lucide-react";

interface NewsItem {
  title: string;
  date: string;
  type: string;
}

interface NewsFeedProps {
  localNews: NewsItem[];
  globalNews: NewsItem[];
}

const NewsFeed = ({ localNews, globalNews }: NewsFeedProps) => {
  return (
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 animate-fade-up" style={{ animationDelay: "0.8s" }}>
      {/* Local News */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center mb-6">
          <Gamepad className="w-6 h-6 text-accent mr-3" />
          <h2 className="text-2xl font-bold text-white">Local Esports News</h2>
        </div>
        <div className="grid gap-4">
          {localNews.map((item, index) => (
            <div 
              key={item.title} 
              className="p-4 hover-scale bg-black/40 rounded-lg animate-fade-in"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <h3 className="font-semibold mb-2 text-white">{item.title}</h3>
              <time className="text-sm text-gray-400">{item.date}</time>
            </div>
          ))}
        </div>
      </div>

      {/* Global News */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center mb-6">
          <Users className="w-6 h-6 text-accent mr-3" />
          <h2 className="text-2xl font-bold text-white">Global Esports News</h2>
        </div>
        <div className="grid gap-4">
          {globalNews.map((item, index) => (
            <div 
              key={item.title} 
              className="p-4 hover-scale bg-black/40 rounded-lg animate-fade-in"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <h3 className="font-semibold mb-2 text-white">{item.title}</h3>
              <time className="text-sm text-gray-400">{item.date}</time>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
