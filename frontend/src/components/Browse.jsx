import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs, searchedQuery } = useSelector(store => store.job);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  const filteredJobs = allJobs.filter((job) => {
    if (!searchedQuery) return true;

    // Handle salary range like "6-10"
    if (searchedQuery.includes('-') && typeof job.salary === 'number') {
      const [min, max] = searchedQuery.split('-').map(Number);
      return job.salary >= min && job.salary <= max;
    }

    // Handle title or location filters
    return (
      job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchedQuery.toLowerCase())
    );
  });

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({filteredJobs.length})
        </h1>

        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}

          {/* Show if nothing found */}
          {filteredJobs.length === 0 && (
            <p className="text-center col-span-3 text-gray-500">
              No jobs found matching your filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
