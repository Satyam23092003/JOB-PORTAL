import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ApplyJob from "./Pages/ApplyJob";
import Application from "./Pages/Application";
import RecruiterLogin from "./components/RecruiterLogin";
import { AppContext } from "./context/AppContext";
import Dashboard from "./Pages/Dashboard";
import AddJob from "./Pages/AddJob";
import ManageJobs from "./Pages/ManageJobs";
import ViewApplications from "./Pages/ViewApplications";
import 'quill/dist/quill.snow.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


const App = () => {
  const { showRecruiterLogin,companyToken } = useContext(AppContext);
  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
       <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/application" element={<Application />} />
        <Route path="/dashboard" element={<Dashboard />}>
        {companyToken ?
         <>
          <Route path="add-job" element={<AddJob />} />
          <Route path="manage-job" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </> : null}
         
        </Route>
      </Routes>
    </div>
  );
};

export default App;
