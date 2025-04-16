import React, { useState } from "react";
import { Circles } from "react-loader-spinner";

import CreateURL from "../urls/CreateURL";
import useAuth from "../auth/AuthContext";
import GetResult from "../urls/GetResult";

const CreateUrl = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await CreateURL(originalUrl, user.username);
      const taskId = result.data.task_id;

      const poll = async () => {
        const res = await GetResult(taskId);

        if (res.short_url) {
          console.log(res.short_url);
          setLoading(false);
        } else if (res.status === "pending") {
          setTimeout(poll, 2000);
        } else {
          console.log("Unknown error");
          setLoading(false);
        }
      };

      poll();
    } catch (err) {
      setStatusMsg("Error connecting to server.");
      setLoading(false);
    }

  };

  return (
    <div className="flex items-center justify-center bg-gray-100 h-[800px]">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          URL Shortener
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter your long URL"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Shorten URL
          </button>
        </form>
        {loading && (
          <div className="flex justify-center mt-4">
            <Circles
              height="40"
              width="40"
              color="#3B82F6"
              ariaLabel="circles-loading"
              visible={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateUrl;
