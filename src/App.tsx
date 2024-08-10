import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { ROUTES } from "./config/constants";
import Body from "./Body";
// import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/SignIn/SignIn";
// import SignUp from "./pages/SignUp/SignUp";
// import VerifyOtp from "./pages/VerifyOtp/VerifyOtp";
import "./App.css";
import Users from "./pages/Users/Users";
import FeedbackForm from "./pages/ReviewForm/ReviewForm";
import Feedbacks from "./pages/Review/Review";
import CreateStudentForm from "./pages/CreateStudent/CreateStudent";

function App() {
  useEffect(() => {
    document.title = "Admin Panel";
  }, []);

  const routes = useRoutes([
    {
      path: ROUTES.signIn,
      element: <SignIn />,
    },
    // {
    //   path: ROUTES.signUp,
    //   element: <SignUp />,
    // },
    // {
    //   path: ROUTES.verifyOtp,
    //   element: <VerifyOtp />,
    // },
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: ROUTES.dashboard,
          element: <Dashboard />,
        },
        {
          path: ROUTES.users,
          element: <Users />,
        },
        {
          path: ROUTES.feedbackForm,
          element: <FeedbackForm />,
        },
        {
          path: ROUTES.feedbacks,
          element: <Feedbacks />,
        },
        {
          path: ROUTES.createStudentForm,
          element: <CreateStudentForm />,
        },
        // {
        //   path: ROUTES.forgotPassword,
        //   element: <></>,
        // },
        // {
        //   path: ROUTES.profile,
        //   element: <Profile />,
        // },
      ],
    },
  ]);
  return <>{routes}</>;
}

export default App;
