import React, { useState } from "react";
import { Circles } from "react-loader-spinner";
import { BiCheckboxChecked } from "react-icons/bi";
import { HiXCircle } from "react-icons/hi";
import { toast } from "react-toastify";

import CreateURL from "../urls/CreateURL";
import useAuth from "../auth/AuthContext";
import GetResult from "../urls/GetResult";

const CreateUrl = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(null);
  const [link, setLink] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(null);
    setErrorMessage("");
    setLoading(true);
    setLink("");

    try {
      const result = await CreateURL(originalUrl, user.username);
      if (!result.data.task_id) {
        setErrorMessage(result.data.message);
        setLoading(false);
        setError(false);
        return;
      }
      const taskId = result.data.task_id;

      const poll = async () => {
        const res = await GetResult(taskId);

        if (res.short_url) {
          setMessage(`This is the Short URL`);
          setLink(res.short_url);
          toast.success("New URL added to Your Storage!");
          setError(true);
          setLoading(false);
        } else if (res.status === "pending") {
          setTimeout(poll, 2000);
        } else {
          setErrorMessage("Unknown error");
          setLoading(false);
        }
      };

      poll();
    } catch (err) {
      setErrorMessage("Unkown error occurd please try again");
      console.log(err);
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
        <p className="text-2xl text-[#8E1616] text-center mt-4">
          {
            error !== null ?
            error === true ? "" : <HiXCircle className="inline text-2xl" />
            : ""
          }
          { errorMessage }
        </p>
        <p className="text-2xl text-[#00580c] text-center mt-4">
          {
            error !== null ?
            error === true ? <BiCheckboxChecked className="inline text-2xl" /> : ""
            : ""
          }
          <a href={`http://127.0.0.1:8000/urls/${link}`} className="text-neutral-600 underline decoration-transparent hover:decoration-neutral-600">
          { message } 
          </a>
        </p>
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
