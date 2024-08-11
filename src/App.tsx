import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { ROUTES } from "./config/constants";
import Body from "./Body";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import "./App.css";
import Users from "./pages/Users/Users";
import FeedbackForm from "./pages/ReviewForm/ReviewForm";
import Feedbacks from "./pages/Review/Review";

function App() {
  useEffect(() => {
    document.title = "Feedback";
  }, []);

  const routes = useRoutes([
    {
      path: ROUTES.signIn,
      element: <SignIn />,
    },
    {
      path: ROUTES.signUp,
      element: <SignUp />,
    },
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
      ],
    },
  ]);
  return <>{routes}</>;
}

export default App;
