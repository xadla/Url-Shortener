import React from "react";


const Services = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-indigo-700 mb-4">Our Services</h1>
          <p className="mt-2 text-gray-600 text-lg">
            We provide a variety of services to help you manage and shorten your URLs efficiently.
          </p>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">Custom URL shortening</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">Analytics and tracking for your links</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">Secure and reliable link management</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Services;
