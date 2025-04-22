import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../auth/AuthContext';
import GetURLs from '../urls/GetURLs';

const UserProfile = () => {
  const { user } = useAuth();

  const [urls, setUrls] = useState([]);
  const [recentLinks, setRecentLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetURLs();
        setUrls(res);
        
        // Get recent links (last 3 created URLs)
        const recent = [...res]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 3)
          .map(link => ({
            id: link.id,
            short_url: link.short_url,
            original_url: link.original_url,
            visits: link.visits,
            created_at: link.created_at
          }));
        
        setRecentLinks(recent);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch URLs");
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  // Calculate statistics whenever urls changes
  const calculateStats = () => {
    if (!urls || urls.length === 0) {
      return {
        totalLinks: 0,
        totalClicks: 0,
        mostPopularLink: {
          url: '',
          clicks: 0,
          original: 'No links yet'
        }
      };
    }
  
    // Calculate total clicks
    const totalClicks = urls.reduce((sum, url) => sum + (url.visits || 0), 0);
  
    // Find most popular link
    const mostPopularLink = urls.reduce((max, url) => {
      return (url.visits || 0) > (max.visits || 0) ? url : max;
    }, urls[0]);
  
    return {
      totalLinks: urls.length,
      totalClicks,
      mostPopularLink: {
        url: mostPopularLink.short_url ? `http://127.0.0.1:8000/urls/${mostPopularLink.short_url}` : '',
        clicks: mostPopularLink.visits || 0,
        original: mostPopularLink.original_url || 'No links yet'
      }
    };
  };
  
  // give date
  const userCreated = new Date(user.created);
  
  // Get stats
  const userStats = calculateStats();

  // formatted Recent Links
  const formattedRecentLinks = recentLinks.map(link => ({
    id: link.id,
    shortUrl: `http://127.0.0.1:8000/urls/${link.short_url}`,
    originalUrl: link.original_url,
    clicks: link.visits,
    date: new Date(link.created_at).toISOString().split('T')[0] // Just the date part
  }));

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="flex items-center mb-12 pb-8 border-b border-gray-200">
        <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-5xl font-bold mr-8">
          {user.username.charAt(0).toUpperCase() || 'U'}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{user.username || 'User'}</h1>
          <p className="text-gray-500 text-sm">Member since: {userCreated.toLocaleDateString() || 'May 2022'}</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your URL Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Links Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">Total Links</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">{userStats.totalLinks}</p>
          </div>
          
          {/* Total Clicks Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">Total Clicks</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">{userStats.totalClicks}</p>
          </div>
          
          {/* Most Popular Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">Most Popular</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">{userStats.mostPopularLink.clicks} clicks</p>
            <p className="text-sm text-indigo-500 truncate mt-2">
              {userStats.mostPopularLink.url ? (
                <a href={userStats.mostPopularLink.url} target="_blank" rel="noopener noreferrer">
                  {userStats.mostPopularLink.url}
                </a>
              ) : (
                <span className="text-gray-400">{userStats.mostPopularLink.original}</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Links Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Shortened URLs</h2>
        {formattedRecentLinks.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
              <div className="col-span-4">Short URL</div>
              <div className="col-span-5">Original URL</div>
              <div className="col-span-1 text-center">Clicks</div>
              <div className="col-span-2">Date</div>
            </div>
            
            {/* Table Rows */}
            {formattedRecentLinks.map(link => (
              <div key={link.id} className="grid grid-cols-12 px-6 py-4 border-b border-gray-200 hover:bg-gray-50">
                <div className="col-span-4 text-indigo-600 font-medium">
                  <a href={link.shortUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {link.shortUrl.split('/').pop()}
                  </a>
                </div>
                <div className="col-span-5 text-gray-600 truncate" title={link.originalUrl}>
                  {link.originalUrl.substring(0, 40)}...
                </div>
                <div className="col-span-1 text-center text-gray-600">{link.clicks}</div>
                <div className="col-span-2 text-gray-500">{link.date}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-5">You haven't created any short URLs yet.</p>
            <Link to="/create-url" className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Create Your First Short URL
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
