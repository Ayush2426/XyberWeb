import React from 'react'
import LandingPage from './Pages/LandingPage'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import WorkshopPage from './Pages/WorkshopPage'
import GalleryPage from './Pages/GalleryPage'
import FeedbackPage from './Pages/FeedbackPage'
import Gallery from './Pages/GalleryPage'
import Feedback from './Pages/FeedbackPage'
import Contact from './Pages/ContactPage'
import About from './Pages/AboutPage'
import AuthModule from './Pages/AuthModule'
import BlogPage from './Pages/BlogPage';
import Blog from './Pages/BlogPage';
import CyberSecurityWorkshopPage from './Components/WorkshopInfoPages/CyberPage';
import PowerBiWorkshopPage from './Components/WorkshopInfoPages/PowerBi';
import GenerativeAiWorkshopPage from './Components/WorkshopInfoPages/GenAi';
import MlRoboticsWorkshopPage from './Components/WorkshopInfoPages/ML-Robotics';
import PythonProgrammingWorkshopPage from './Components/WorkshopInfoPages/Python';
import GoogleDorkingWorkshopPage from './Components/WorkshopInfoPages/GoogleDorking';
import PromptEngineeringWorkshopPage from './Components/WorkshopInfoPages/Prompt';
import WebDevelopmentWorkshopPage from './Components/WorkshopInfoPages/WebDev';
import AppDevelopmentWorkshopPage from './Components/WorkshopInfoPages/Appdev';

const RootLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

// export default function App() {
//   return (
//     <div>
//       {/* <LandingPage /> */}
//       {/* <WorkshopPage/> */}
//       {/* <Gallery/> */}
//       {/* <Feedback/> */}
//       {/* <Contact/> */}
//       {/* <About/> */}
//       {/* <AuthModule/> */}
//     </div>
//   )
// }


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/home/*",
        element: <LandingPage />,
      },
      {
        path: "/workshops",
        element: <WorkshopPage/>,
      },
      {
        path: "/gallery",
        element: <Gallery/>,
      },
      {
        path: "/blog/*",
        element: <Blog/>
      },
      {
        path: "/feedback",
        element: <Feedback/>
      },
      {
        path: "/contact",
        element: <Contact/>,
      },
      {
        path: "/about",
        element: <About/>,
      },
      {
        path: "authentication",
        element: <AuthModule/>
      },
      {
        path: "/cyber-security-essentials",
        element: <CyberSecurityWorkshopPage/>
      },
            {
        path: "/power-bi",
        element: <PowerBiWorkshopPage/>
      },
      {
        path: "/Ai-Modules",
        element: <GenerativeAiWorkshopPage/>
      },
      {
        path: "/ml-robotics",
        element: <MlRoboticsWorkshopPage/>
      },
      {
        path: "/python",
        element: <PythonProgrammingWorkshopPage/>
      },
      {
        path: "/google-dorking",
        element: <GoogleDorkingWorkshopPage/>
      },
      {
        path: "/prompt-engineering",
        element: <PromptEngineeringWorkshopPage/>
      },
      {
        path: "/web-dev",
        element: <WebDevelopmentWorkshopPage/>
      },
      {
        path: "/app-dev",
        element: <AppDevelopmentWorkshopPage/>
      }
    ]
  }
])


function App() {
  return <RouterProvider router={router} />;
}

export default App;