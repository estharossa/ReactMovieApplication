import React, { useEffect, useState } from "react";
import Movie from "../Model/Movie";

interface Props {
  dataSource: string;
}

interface State {
  result: Movie[];
  loading?: boolean;
  error?: any;
}

export default function FindMovies({ dataSource }: Props): State {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<Movie[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(dataSource);
        const json = await data.json();
        console.log(json)
        if (json) {
          setLoading(false);
          setResult(json.results);
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }

      setLoading(false);
    }

    fetchData();
  }, [dataSource]);

  return {error, loading, result};
}
