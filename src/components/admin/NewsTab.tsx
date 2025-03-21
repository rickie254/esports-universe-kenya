
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface NewsItem {
  title: string;
  date: string;
  type: string;
}

interface NewsTabProps {
  news: NewsItem[];
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  type: "local" | "global";
}

const NewsTab = ({ news, setNews, type }: NewsTabProps) => {
  const { toast } = useToast();
  const [newNews, setNewNews] = useState<NewsItem>({ 
    title: "", 
    date: new Date().toISOString().split('T')[0],
    type: type
  });
  
  const typeLabel = type === "local" ? "Local" : "Global";

  // Sort news by date (most recent first)
  const sortNewsByDate = (newsItems: NewsItem[]) => {
    return [...newsItems].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  // Add new news
  const handleAddNews = () => {
    if (!newNews.title) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "News title is required",
      });
      return;
    }
    
    const updatedNews = sortNewsByDate([
      {
        title: newNews.title,
        date: newNews.date,
        type: type,
      },
      ...news,
    ]);
    
    setNews(updatedNews);
    
    setNewNews({ 
      title: "", 
      date: new Date().toISOString().split('T')[0],
      type: type
    });
    
    toast({
      title: `${typeLabel} news added`,
      description: "Your news item has been added successfully",
    });
  };
  
  // Remove news
  const handleRemoveNews = (index: number) => {
    const updatedNews = [...news];
    updatedNews.splice(index, 1);
    setNews(updatedNews);
    
    toast({
      title: "News removed",
      description: "News item has been removed successfully",
    });
  };
  
  // Update news
  const handleUpdateNews = (index: number, field: keyof NewsItem, value: string) => {
    const updatedNews = [...news];
    updatedNews[index] = {
      ...updatedNews[index],
      [field]: value
    };
    
    // If date was changed, re-sort the list
    if (field === 'date') {
      setNews(sortNewsByDate(updatedNews));
    } else {
      setNews(updatedNews);
    }
  };
  
  // Ensure news is sorted on component mount
  useEffect(() => {
    if (news.length > 0) {
      const sortedNews = sortNewsByDate(news);
      
      // Only update if ordering has changed
      const orderChanged = sortedNews.some(
        (item, index) => item.date !== news[index]?.date
      );
      
      if (orderChanged) {
        setNews(sortedNews);
      }
    }
  }, []);

  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-white">{typeLabel} Esports News</h2>
      
      {/* Add new news */}
      <div className="mb-8 p-4 bg-black/30 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-white">Add New {typeLabel} News</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor={`${type}NewsTitle`} className="text-white mb-2 block">News Title</Label>
            <Input 
              id={`${type}NewsTitle`}
              value={newNews.title}
              onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
              placeholder="Enter news title"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor={`${type}NewsDate`} className="text-white mb-2 block">Date</Label>
            <Input 
              id={`${type}NewsDate`}
              type="date"
              value={newNews.date}
              onChange={(e) => setNewNews({ ...newNews, date: e.target.value })}
              className="bg-black/30 border-white/20 text-white"
            />
          </div>
        </div>
        <Button onClick={handleAddNews} className="bg-accent hover:bg-accent/90">
          <Plus className="w-4 h-4 mr-2" />
          Add News
        </Button>
      </div>
      
      {/* News list */}
      <div className="space-y-4">
        {news.map((newsItem, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-black/40 rounded-lg">
            <div>
              <Input 
                value={newsItem.title}
                onChange={(e) => handleUpdateNews(index, 'title', e.target.value)}
                className="bg-black/30 border-white/20 text-white mb-2"
              />
              <Input 
                type="date"
                value={newsItem.date}
                onChange={(e) => handleUpdateNews(index, 'date', e.target.value)}
                className="w-40 bg-black/30 border-white/20 text-white"
              />
            </div>
            <Button 
              variant="outline" 
              size="icon"
              className="hover:bg-destructive/20"
              onClick={() => handleRemoveNews(index)}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsTab;
