import { createContext, useState } from "react";

const JobContext = createContext();

const JobProvider = ({ children }) => {

  const [jobList, setJobList] = useState([]);

  const refreshJobList = async () => {
    try {
      const res = await fetch('/api/getJobList');
      const latestJobList = await res.json();
      setJobList(latestJobList);
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <JobContext.Provider value={{
      jobList,
      setJobList,
      refreshJobList
    }}>
      {children}
    </JobContext.Provider>
  );
};

export { JobContext, JobProvider };