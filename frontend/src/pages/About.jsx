import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          About Me
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Hello! My name is <span className="font-semibold text-gray-800">Hadi</span>, and I am a student at 
          <span className="font-semibold text-blue-600"> Isfahan University of Technology</span>. I am passionate about software development and am actively seeking job opportunities to apply my skills and grow as a developer.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          I have experience working with modern technologies and tools, including:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li className="mb-2">
            <span className="font-semibold text-gray-800">Frontend:</span> React, Tailwind CSS
          </li>
          <li className="mb-2">
            <span className="font-semibold text-gray-800">Backend:</span> Django, REST APIs
          </li>
          <li className="mb-2">
            <span className="font-semibold text-gray-800">Databases:</span> MySQL, PostgreSQL, MongoDB
          </li>
          <li className="mb-2">
            <span className="font-semibold text-gray-800">DevOps:</span> Docker, Linux
          </li>
          <li className="mb-2">
            <span className="font-semibold text-gray-800">Others:</span> Git, CI/CD, Problem Solving
          </li>
        </ul>
        <p className="text-lg text-gray-600 mb-6">
          I am eager to contribute to innovative projects and collaborate with talented teams. My goal is to continuously learn and improve while delivering high-quality solutions.
        </p>
        <div className="text-center">
          <a
            href="mailto:hadinjr80@gmail.com"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
