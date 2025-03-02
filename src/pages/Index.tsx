
import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import UniversityRankings from "@/components/UniversityRankings";
import GameTopPlayers from "@/components/GameTopPlayers";
import NewsFeed from "@/components/NewsFeed";
import AdminLink from "@/components/AdminLink";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [globalNews, setGlobalNews] = useState([]);
  const [localNews, setLocalNews] = useState([]);
  const [filteredData, setFilteredData] = useState({
    universities: [],
    players: {},
    news: []
  });

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

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      // Reset to original data when search is empty
      setFilteredData({
        universities: universities,
        players: gameTopPlayers,
        news: [...localNews, ...globalNews]
      });
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    
    // Filter universities
    const filteredUniversities = universities.filter(uni => 
      uni.name.toLowerCase().includes(query)
    );
    
    // Filter players in each game
    const filteredPlayers = {};
    Object.keys(gameTopPlayers).forEach(game => {
      filteredPlayers[game] = gameTopPlayers[game].filter(player => 
        player.name.toLowerCase().includes(query) || 
        player.university.toLowerCase().includes(query)
      );
    });
    
    // Filter news
    const filteredNews = [...localNews, ...globalNews].filter(newsItem => 
      newsItem.title.toLowerCase().includes(query) || 
      newsItem.type.toLowerCase().includes(query)
    );
    
    setFilteredData({
      universities: filteredUniversities,
      players: filteredPlayers,
      news: filteredNews
    });
  }, [searchQuery, universities, gameTopPlayers, localNews, globalNews]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Admin Login Button */}
      <AdminLink />

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      {/* Hero Section with Search */}
      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* University Rankings */}
      <UniversityRankings universities={searchQuery.trim() ? filteredData.universities : universities} />

      {/* Games Top Players */}
      <GameTopPlayers gameTopPlayers={searchQuery.trim() ? filteredData.players : gameTopPlayers} />

      {/* News Feed */}
      <NewsFeed 
        localNews={searchQuery.trim() ? filteredData.news.filter(n => n.type === 'local') : localNews} 
        globalNews={searchQuery.trim() ? filteredData.news.filter(n => n.type === 'global') : globalNews} 
      />
    </div>
  );
};

export default Index;
