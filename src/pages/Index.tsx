import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import UniversityRankings from "@/components/UniversityRankings";
import GameTopPlayers from "@/components/GameTopPlayers";
import NewsFeed from "@/components/NewsFeed";
import AdminLink from "@/components/AdminLink";
import LeagueTable from "@/components/LeagueTable";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [globalNews, setGlobalNews] = useState([]);
  const [localNews, setLocalNews] = useState([]);
  const [filteredData, setFilteredData] = useState({
    universities: [],
    players: {},
    news: [],
    universityPoints: []
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

  const universityPoints = [
    { name: "University of Nairobi", fifa: 235, pubg: 189, callOfDuty: 210, tekken: 245, eFootball: 190, totalPoints: 1069 },
    { name: "Kenyatta University", fifa: 220, pubg: 210, callOfDuty: 195, tekken: 200, eFootball: 215, totalPoints: 1040 },
    { name: "Jomo Kenyatta University of Agriculture and Technology", fifa: 190, pubg: 225, callOfDuty: 230, tekken: 180, eFootball: 200, totalPoints: 1025 },
    { name: "Strathmore University", fifa: 240, pubg: 170, callOfDuty: 185, tekken: 215, eFootball: 205, totalPoints: 1015 },
    { name: "Moi University", fifa: 210, pubg: 195, callOfDuty: 200, tekken: 190, eFootball: 180, totalPoints: 975 },
    { name: "Maseno University", fifa: 200, pubg: 185, callOfDuty: 175, tekken: 205, eFootball: 195, totalPoints: 960 },
    { name: "Technical University of Kenya", fifa: 180, pubg: 200, callOfDuty: 190, tekken: 175, eFootball: 210, totalPoints: 955 },
    { name: "Dedan Kimathi University of Technology", fifa: 175, pubg: 180, callOfDuty: 220, tekken: 165, eFootball: 185, totalPoints: 925 },
    { name: "Mount Kenya University", fifa: 195, pubg: 165, callOfDuty: 180, tekken: 195, eFootball: 175, totalPoints: 910 },
    { name: "Multimedia University of Kenya", fifa: 185, pubg: 175, callOfDuty: 170, tekken: 185, eFootball: 170, totalPoints: 885 },
    { name: "Egerton University", fifa: 165, pubg: 190, callOfDuty: 165, tekken: 170, eFootball: 180, totalPoints: 870 },
    { name: "Kabarak University", fifa: 170, pubg: 160, callOfDuty: 175, tekken: 180, eFootball: 165, totalPoints: 850 },
    { name: "Machakos University", fifa: 160, pubg: 170, callOfDuty: 160, tekken: 175, eFootball: 160, totalPoints: 825 },
    { name: "University of Eldoret", fifa: 155, pubg: 165, callOfDuty: 150, tekken: 165, eFootball: 155, totalPoints: 790 },
    { name: "Kisii University", fifa: 150, pubg: 155, callOfDuty: 155, tekken: 155, eFootball: 145, totalPoints: 760 },
  ];

  const fetchNews = async () => {
    const localNewsData = [
      { title: "UoN Dominates Regional Tournament", date: "2024-03-10", type: "local" },
      { title: "New Esports Arena Opens at Strathmore", date: "2024-03-08", type: "local" },
      { title: "KU Team Qualifies for Continental Championship", date: "2024-03-05", type: "local" },
    ];

    const globalNewsData = [
      { title: "Major Updates Coming to PUBG Mobile", date: "2024-03-10", type: "global" },
      { title: "FIFA 24 Global Series Announced", date: "2024-03-09", type: "global" },
      { title: "New Tekken Tournament Circuit Revealed", date: "2024-03-07", type: "global" },
    ];

    setLocalNews(localNewsData);
    setGlobalNews(globalNewsData);
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredData({
        universities: universities,
        players: gameTopPlayers,
        news: [...localNews, ...globalNews],
        universityPoints: universityPoints
      });
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    
    const filteredUniversities = universities.filter(uni => 
      uni.name.toLowerCase().includes(query)
    );
    
    const filteredPlayers = {};
    Object.keys(gameTopPlayers).forEach(game => {
      filteredPlayers[game] = gameTopPlayers[game].filter(player => 
        player.name.toLowerCase().includes(query) || 
        player.university.toLowerCase().includes(query)
      );
    });
    
    const filteredNews = [...localNews, ...globalNews].filter(newsItem => 
      newsItem.title.toLowerCase().includes(query) || 
      newsItem.type.toLowerCase().includes(query)
    );
    
    const filteredUniversityPoints = universityPoints.filter(uni => 
      uni.name.toLowerCase().includes(query)
    );
    
    setFilteredData({
      universities: filteredUniversities,
      players: filteredPlayers,
      news: filteredNews,
      universityPoints: filteredUniversityPoints
    });
  }, [searchQuery, universities, gameTopPlayers, localNews, globalNews, universityPoints]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      <AdminLink />

      <div className="absolute inset-0 bg-black/50 -z-10" />

      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <UniversityRankings universities={searchQuery.trim() ? filteredData.universities : universities} />

      <GameTopPlayers gameTopPlayers={searchQuery.trim() ? filteredData.players : gameTopPlayers} />

      <NewsFeed 
        localNews={searchQuery.trim() ? filteredData.news.filter(n => n.type === 'local') : localNews} 
        globalNews={searchQuery.trim() ? filteredData.news.filter(n => n.type === 'global') : globalNews} 
      />

      <LeagueTable universities={searchQuery.trim() ? filteredData.universityPoints : universityPoints} />
    </div>
  );
};

export default Index;
