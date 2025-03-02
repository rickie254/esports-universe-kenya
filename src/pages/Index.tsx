
import { useState, useEffect } from "react";
import { Trophy, Users, Gamepad, Search, Award, ArrowUp, ArrowDown, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [globalNews, setGlobalNews] = useState([]);
  const [localNews, setLocalNews] = useState([]);

  const universities = [
    { name: "University of Nairobi", rank: 1, change: "up", points: 2500 },
    { name: "Strathmore University", rank: 2, change: "down", points: 2400 },
    { name: "Kenyatta University", rank: 3, change: "up", points: 2300 },
    { name: "JKUAT", rank: 4, change: "same", points: 2200 },
  ];

  const gameTopPlayers = {
    tekken: [
      { name: "John Doe", university: "UoN", rating: 2800 },
      { name: "Jane Smith", university: "Strathmore", rating: 2750 },
      { name: "Mike Johnson", university: "KU", rating: 2700 },
    ],
    fifa: [
      { name: "Alice Brown", university: "JKUAT", rating: 2850 },
      { name: "Bob Wilson", university: "UoN", rating: 2800 },
      { name: "Carol White", university: "Strathmore", rating: 2780 },
    ],
    efootball: [
      { name: "David Lee", university: "KU", rating: 2900 },
      { name: "Emma Davis", university: "UoN", rating: 2850 },
      { name: "Frank Miller", university: "JKUAT", rating: 2820 },
    ],
    pubg: [
      { name: "Grace Kim", university: "Strathmore", rating: 2750 },
      { name: "Henry Park", university: "UoN", rating: 2700 },
      { name: "Ivy Chen", university: "KU", rating: 2680 },
    ],
    codm: [
      { name: "Jack Thompson", university: "JKUAT", rating: 2950 },
      { name: "Kelly Moore", university: "Strathmore", rating: 2900 },
      { name: "Liam Wilson", university: "UoN", rating: 2880 },
    ],
  };

  // Simulated news fetch function (replace with actual API call)
  const fetchNews = async () => {
    // Simulated local news
    const localNewsData = [
      { title: "UoN Dominates Regional Tournament", date: "2024-03-10", type: "local" },
      { title: "New Esports Arena Opens at Strathmore", date: "2024-03-08", type: "local" },
      { title: "KU Team Qualifies for Continental Championship", date: "2024-03-05", type: "local" },
    ];

    // Simulated global news
    const globalNewsData = [
      { title: "Major Updates Coming to PUBG Mobile", date: "2024-03-10", type: "global" },
      { title: "FIFA 24 Global Series Announced", date: "2024-03-09", type: "global" },
      { title: "New Tekken Tournament Circuit Revealed", date: "2024-03-07", type: "global" },
    ];

    setLocalNews(localNewsData);
    setGlobalNews(globalNewsData);
  };

  // Fetch news every 5 minutes
  useEffect(() => {
    fetchNews(); // Initial fetch
    const interval = setInterval(fetchNews, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Admin Login Button */}
      <div className="fixed top-4 right-4 z-10 animate-fade-in">
        <Link to="/admin-login">
          <Button variant="outline" className="glass-card flex items-center gap-2 hover:bg-accent/20">
            <LogIn className="w-4 h-4" />
            <span>Admin</span>
          </Button>
        </Link>
      </div>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-16 animate-fade-up">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-scale-in">
            Kenyan University Esports Rankings
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Tracking competitive gaming excellence across Kenyan universities
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="glass-card flex items-center p-2 rounded-lg animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search universities, players, or tournaments..."
              className="w-full bg-transparent border-none focus:outline-none text-white placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Rankings Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 mb-16 animate-fade-up" style={{ animationDelay: "0.4s" }}>
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center mb-6">
            <Trophy className="w-6 h-6 text-accent mr-3" />
            <h2 className="text-2xl font-bold text-white">University Rankings</h2>
          </div>
          <div className="grid gap-4">
            {universities.map((uni, index) => (
              <div 
                key={uni.name} 
                className="flex items-center justify-between p-4 hover-scale bg-black/40 rounded-lg animate-fade-in" 
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="flex items-center">
                  <span className="text-lg font-semibold mr-4 text-white">#{uni.rank}</span>
                  <span className="text-lg text-white">{uni.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-4 text-white">{uni.points} pts</span>
                  {uni.change === "up" && <ArrowUp className="w-5 h-5 text-green-500" />}
                  {uni.change === "down" && <ArrowDown className="w-5 h-5 text-red-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Games Top Players Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {Object.entries(gameTopPlayers).map(([game, players], index) => (
          <div 
            key={game} 
            className="glass-card rounded-xl p-6 animate-fade-up"
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
          >
            <div className="flex items-center mb-6">
              <Award className="w-6 h-6 text-accent mr-3" />
              <h2 className="text-2xl font-bold text-white capitalize">
                {game === "codm" ? "Call of Duty Mobile" : game.toUpperCase()} Top Players
              </h2>
            </div>
            <div className="grid gap-4">
              {players.map((player, playerIndex) => (
                <div 
                  key={player.name} 
                  className="p-4 hover-scale bg-black/40 rounded-lg animate-fade-in"
                  style={{ animationDelay: `${0.1 * (playerIndex + 1)}s` }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-white">#{playerIndex + 1} {player.name}</span>
                    <span className="text-sm text-accent">{player.rating} MMR</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {player.university}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* News Feed */}
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
    </div>
  );
};

export default Index;
