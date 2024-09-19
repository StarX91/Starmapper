import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { gapi } from "gapi-script";
import Register from "./pages/Authentication/Register";
import Login from "./pages/Authentication/Login";
import Card from "./pages/StareXplorer/Card/Card";
import Navbar from "./pages/StareXplorer/Navbar/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import Map from "./pages/StareXplorer/Map/Map";
import { ProfileContext } from "./context/ProfileContext";
import ResetPassword from "./pages/Authentication/ResetPassword";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import EditProfile from "./pages/StareXplorer/Navbar/EditProfile";
import Edit from "./pages/StarStork/Dashboard/EditProfile";
import Subs from "./pages/Services/Settings/Subscription/Info";
import Profile from "./pages/Services/Settings/Profile/Info";
import Invoice from "./pages/Services/Settings/Invoices/Info";
import Edits from "./pages/Services/Dashboard/EditProfile";
import Board from "./pages/Services/Dashboard/Board";
import Main from "./pages/StarStork/Dashboard/Main";
import Mmain from "./pages/StarMarg/Dashboard/Mmain";
import Images from "./pages/StarMarg/CreateProject/Images";
import UploadImages from "./pages/StarMarg/CreateProject/Images";
import CreateProject from "./pages/StarMarg/CreateProject/CreateProject";
import TMain from "./pages/StarStork/Tasks/Tmain";
import Dmain from "./pages/StarStork/Detectors/Dmain";
import Info from "./pages/Services/Settings/Info";
import InfoSS from "./pages/StarStork/Settings/Profile/Info";
import Subscription from "./pages/StarStork/Settings/Subscription/Info";
import Invoices from "./pages/StarStork/Settings/Invoices/Info";
import ChangePassword from "./pages/StarStork/Settings/ChangePassword/Info";
import PhoneNumber from "./pages/StarStork/Dashboard/ChangePhoneNumber";
import { ProfileProvider } from "./context/ProfileImageContext";
import Imageset from "./pages/StarStork/AnnotationReportTask/CreateImageset";
import Tasks from "./pages/StarStork/AnnotationReportTask/CreateTasks";
import Annotation from "./pages/StarStork/AnnotationReportTask/Annotation";
// import Imageset from './pages/StarStork/AnnotationReportTask/CreateImageset';
// import VerifyOtp from './pages/StarStork/Dashboard/VerifyOtp';
// import ErrorBoundary from './components/ErrorBoundary';
import AnnotationTask from "./pages/StarStork/AnnotationReportTask/AnnotationTask";
import TrainingTask from "./pages/StarStork/TrainingTasks/TrainingTask";
import Setup from "./pages/StarStork/TrainingTasks/SetupPage";
import Report from "./pages/StarStork/TrainingTasks/Report";
import GoogleMap from "./pages/StarMarg/CreateProject/Map"
const clientId =
  "261778488059-r3p7jn1uctichj37qi3kq21j1fghclns.apps.googleusercontent.com";

const App = () => {
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    function start() {
      gapi.client
        .init({
          clientId: clientId,
          scope: "profile email",
        })
        .then(() => {
          console.log("GAPI client initialized");
        })
        .catch((error) => {
          console.error("Error initializing GAPI client:", error);
        });
    }
    gapi.load("client:auth2", start);
  }, []);

  return (
    <div className="w-full h-full bg-black">
      <ThemeProvider>
        <ProfileContext.Provider value={{ profileImg, setProfileImg }}>
          <ProfileProvider>
            <Router>
              {/* <ErrorBoundary> */}
              <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/services" element={<Board />} />
                <Route path="/services/edit-profile" element={<Edits />} />
                <Route path="/settings" element={<Info />} />
                <Route
                  path="/services/settings/subscription"
                  element={<Subs />}
                />
                <Route
                  path="/services/settings/profile"
                  element={<Profile />}
                />
                <Route
                  path="/services/settings/invoices"
                  element={<Invoice />}
                />
                <Route path="/ss/dashboard" element={<Main />} />
                <Route path="/sm/dashboard" element={<Mmain />} />
                <Route path="/images" element={<Images />} />
                {/* Define the route for UploadImages */}
                <Route path="/upload-images" element={<UploadImages />} />
                <Route
                  path="/create-project"
                  element={<CreateProject />}
                />{" "}
                {/* Create Project route */}
                <Route path="/ss/dashboard/tasks" element={<TMain />} />
                <Route path="/ss/dashboard/detectors" element={<Dmain />} />
                <Route path="/ss/edit-profile" element={<Edit />} />
                <Route path="/ss/settings" element={<InfoSS />} />
                <Route
                  path="/ss/settings/subscriptions"
                  element={<Subscription />}
                />
                <Route path="/ss/settings/invoices" element={<Invoices />} />
                <Route
                  path="/ss/settings/changepassword"
                  element={<ChangePassword />}
                />
                <Route path="/ss/art/create-imageset" element={<Imageset />} />
                <Route path="/ss/art/create-tasks" element={<Tasks />} />
                <Route
                  path="/ss/art/annotation-setup"
                  element={<Annotation />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/change-phone-number" element={<PhoneNumber />} />
                <Route path="/annotation-task" element={<AnnotationTask />} />
                <Route path="/training-task" element={<TrainingTask />} />
                <Route path="/setup" element={<Setup />} />
                <Route path="/report" element={<Report />} />
                {/* <Route path="/verify-otp" element={<VerifyOtp />} /> */}
                <Route path="/google_map" element={<GoogleMap/>} />
              </Routes>
              {/* </ErrorBoundary> */}
            </Router>
          </ProfileProvider>
        </ProfileContext.Provider>
      </ThemeProvider>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="sm:flex min-[320px]:flex-col">
        <Card />
        <Map />
      </div>
    </div>
  );
};

export default App;
