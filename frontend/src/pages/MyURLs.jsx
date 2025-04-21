import React, { useState, useEffect } from "react";
import { FaCopy } from "react-icons/fa6";
import { LuCopyCheck } from "react-icons/lu";

import GetURLs from "../urls/GetURLs";

const MyURLs = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedUrlId, setCopiedUrlId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetURLs();
        setUrls(res);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch URLs");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCopy = (urlId, shortUrl) => {
    navigator.clipboard.writeText(`http://127.0.0.1:8000/urls/${shortUrl}`);
    setCopiedUrlId(urlId);
    setTimeout(() => setCopiedUrlId(null), 2000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Short URLs</h1>

      <div className="space-y-4">
        {urls.map((url) => (
          <div
            key={url.id}
            className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {url.visits} {url.visits === 1 ? "visit" : "visits"}
                  </span>
                </div>

                <a
                  href={url.original_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-lg font-medium text-gray-900 truncate hover:text-blue-600"
                >
                  {url.original_url}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-gray-100 rounded-md p-2">
                  <a
                    href={`http://127.0.0.1:8000/urls/${url.short_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-blue-600 hover:underline"
                  >
                    /{url.short_url}
                  </a>
                </div>

                <button
                  onClick={() => handleCopy(url.id, url.short_url)}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full"
                  title="Copy to clipboard"
                >
                  {copiedUrlId === url.id ? <LuCopyCheck /> : <FaCopy />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyURLs;