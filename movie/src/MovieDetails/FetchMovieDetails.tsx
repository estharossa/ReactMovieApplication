import React, { useEffect, useState } from "react";
import Details from "../Model/Details";

interface Props {
  dataSource: string;
}

interface State {
  result: Details;
  loading?: boolean;
  error?: any;
}

export default function FetchMovieDetails({ dataSource }: Props): State {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<Details>({id: 0, title: '', poster_path: '', vote_average: 0, overview: ''});
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(dataSource);
        const json = await data.json();

        if (json) {
          let details: Details = {id: json.id, title: json.title, poster_path: json.poster_path, vote_average: json.vote_average, overview: json.overview}
          setLoading(false);
          setResult(details);
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
