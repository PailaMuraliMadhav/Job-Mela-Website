import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Footer = () => {
  const { user, totalRecruiterLogins, totalStudentLogins, totalActiveUsers } = useSelector(store => store.auth);

  // Define state for totalJobPosted
  const [totalJobPosted, setTotalJobPosted] = useState(null);

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchJobAnalytics = async () => {
      try {
        // Send GET request to the API
        const response = await axios.get("http://localhost:8000/api/v1/job/getTotalJobPostedLast30Days");

        

        // If request is successful, directly update the totalJobPosted state
        const fetchedTotalJobPosted = response.data.totalJobPosted;
        setTotalJobPosted(fetchedTotalJobPosted);

      } catch (error) {
        // Handle any error from the request
        console.error("Error fetching job analytics:", error);
      }
    };

    // Call the async function
    fetchJobAnalytics();

  }, []); // Only run once when component mounts

  return (
    <footer className="border-t border-t-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Job Mela</h2>
            <p className="text-sm">© 2025 Job Mela. All rights reserved.</p>
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Social Media Links */}
            <a href="https://facebook.com" className="hover:text-gray-400" aria-label="Facebook">
              {/* Facebook SVG */}
            </a>
            <a href="https://twitter.com" className="hover:text-gray-400" aria-label="Twitter">
              {/* Twitter SVG */}
            </a>
            <a href="https://linkedin.com" className="hover:text-gray-400" aria-label="LinkedIn">
              {/* LinkedIn SVG */}
            </a>
          </div>
        </div>

        {user && (
          <div className="mt-4 text-sm">
            {/* Analytics Card Container */}
            <div className="bg-gradient-to-r from-indigo-100 to-teal-100 p-6 rounded-lg shadow-lg text-gray-600">
              <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Monthly User Analytics</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Total Active Users Card */}
                <div className="flex flex-col items-center bg-white text-gray-1200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-500">
                  <div className="text-4xl font-bold text-indigo-500">
                    <i className="fas fa-users"></i> {totalActiveUsers}
                  </div>
                  <p className="text-lg mt-2">Total Active Users</p>
                  <p className="text-sm mt-1 text-gray-600">Users active in the last month</p>
                </div>

                {/* Monthly Student Logins Card */}
                <div className="flex flex-col items-center bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-4xl font-bold text-teal-500">
                    <i className="fas fa-graduation-cap"></i> {totalStudentLogins}
                  </div>
                  <p className="text-lg mt-2">Monthly Student Logins</p>
                  <p className="text-sm mt-1 text-gray-600">Students who logged in this month</p>
                </div>

                {/* Monthly Recruiter Logins Card */}
                <div className="flex flex-col items-center bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-4xl font-bold text-yellow-500">
                    <i className="fas fa-briefcase"></i> {totalRecruiterLogins}
                  </div>
                  <p className="text-lg mt-2">Monthly Recruiter Logins</p>
                  <p className="text-sm mt-1 text-gray-600">Recruiters who logged in this month</p>
                </div>

                {/* Monthly Job Posted Card */}
                <div className="flex flex-col items-center bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-4xl font-bold text-purple-500">
                    <i className="fas fa-briefcase"></i> {totalJobPosted !== null ? totalJobPosted : "Loading..."}
                  </div>
                  <p className="text-lg mt-2">Monthly Job Posted</p>
                  <p className="text-sm mt-1 text-gray-600">Jobs posted in the last 1 month</p>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </footer>
  );
}

export default Footer;
