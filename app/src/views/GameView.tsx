import axios from "axios";
import { useEffect, useState } from "react";

const getGames = async () => {
  const response = await axios.get("http://localhost:5000/game");
  return response.data;
};

export const GameView = () => {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      const fetchedGames = await getGames();
      setGames(fetchedGames);
      setLoading(false);
    };

    fetchGames();
  });

  if (loading) {
    return <div>Loading</div>;
  }

  return <div>{games.map((game) => `${game.name} - ${game.createdAt}`)}</div>;
};
