import { arrayOf, node, object } from 'prop-types';
import { createContext, useEffect, useState } from 'react';

const JobContext = createContext();

const JobProvider = ({ init, children }) => {
  const [jobList, setJobList] = useState(init);

  const refreshJobList = async () => {
    try {
      const res = await fetch('/api/job-list');
      const latestJobList = await res.json();
      setJobList(latestJobList);
      // console.log('context ', latestJobList)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchJobList = async () => {
      try {
        // const res = await fetch('/api/getJobList');
        const res = await fetch('/api/job-list');
        const latestJobList = await res.json();
        setJobList(latestJobList);
        // console.log('context ', latestJobList)
      } catch (err) {
        console.error(err);
      }
    };
    if (!jobList || !jobList.length) {
      fetchJobList();
    }
  }, [jobList]);

  return (
    <JobContext.Provider value={{
      jobList,
      setJobList,
      refreshJobList,
    }}
    >
      {children}
    </JobContext.Provider>
  );
};

JobProvider.propTypes = {
  children: node.isRequired,
  init: arrayOf(object),
};

JobProvider.defaultProps = {
  init: [],
};

export { JobContext, JobProvider };
