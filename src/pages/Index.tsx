
import { useState } from "react";
import { Trophy, Users, Gamepad, Search, Award, ArrowUp, ArrowDown } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const universities = [
    { name: "University of Nairobi", rank: 1, change: "up", points: 2500 },
    { name: "Strathmore University", rank: 2, change: "down", points: 2400 },
    { name: "Kenyatta University", rank: 3, change: "up", points: 2300 },
    { name: "JKUAT", rank: 4, change: "same", points: 2200 },
  ];

  const topPlayers = [
    { name: "John Doe", university: "UoN", game: "League of Legends", rating: 2800 },
    { name: "Jane Smith", university: "Strathmore", game: "DOTA 2", rating: 2750 },
    { name: "Mike Johnson", university: "KU", game: "CS:GO", rating: 2700 },
  ];

  const news = [
    { title: "UoN Dominates Regional Tournament", date: "2024-03-10" },
    { title: "New Esports Arena Opens at Strathmore", date: "2024-03-08" },
    { title: "KU Team Qualifies for Continental Championship", date: "2024-03-05" },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-16 animate-fade-up">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Kenyan University Esports Rankings
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Tracking competitive gaming excellence across Kenyan universities
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="glass-card flex items-center p-2 rounded-lg">
            <Search className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search universities, players, or tournaments..."
              className="w-full bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Rankings Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 mb-16 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center mb-6">
            <Trophy className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold">University Rankings</h2>
          </div>
          <div className="grid gap-4">
            {universities.map((uni) => (
              <div key={uni.name} className="flex items-center justify-between p-4 hover-scale bg-white/50 rounded-lg">
                <div className="flex items-center">
                  <span className="text-lg font-semibold mr-4">#{uni.rank}</span>
                  <span className="text-lg">{uni.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-4">{uni.points} pts</span>
                  {uni.change === "up" && <ArrowUp className="w-5 h-5 text-green-500" />}
                  {uni.change === "down" && <ArrowDown className="w-5 h-5 text-red-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
        {/* Top Players */}
        <div className="glass-card rounded-xl p-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center mb-6">
            <Users className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold">Top Players</h2>
          </div>
          <div className="grid gap-4">
            {topPlayers.map((player) => (
              <div key={player.name} className="p-4 hover-scale bg-white/50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{player.name}</span>
                  <span className="text-sm text-gray-600">{player.rating} MMR</span>
                </div>
                <div className="text-sm text-gray-600">
                  {player.university} • {player.game}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* News Feed */}
        <div className="glass-card rounded-xl p-6 animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <div className="flex items-center mb-6">
            <Gamepad className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold">Latest News</h2>
          </div>
          <div className="grid gap-4">
            {news.map((item) => (
              <div key={item.title} className="p-4 hover-scale bg-white/50 rounded-lg">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <time className="text-sm text-gray-600">{item.date}</time>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
