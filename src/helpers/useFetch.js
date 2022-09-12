import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData(url,abortController) {
    await fetch(url, { signal: abortController.signal })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }
  useEffect(() => {
    const abortController = new AbortController();
    fetchData(url, abortController)
    return () => {
      abortController.abort();
    }
  }, [url])
  

  return { data, loading, error };
}
export default useFetch;
