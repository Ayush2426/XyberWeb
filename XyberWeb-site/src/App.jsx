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
        path: "/*",
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
      }
    ]
  }
])


function App() {
  return <RouterProvider router={router} />;
}

export default App;