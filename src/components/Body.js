import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import MovieInfo from "./MovieInfo";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import MoviesByActor from "./MoviesByActor";

const Body = () => {
  
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/movieinfo/:id",
      element: <MovieInfo />,
    },
    {
      path: "/castmovie/:id",
      element: <MoviesByActor />,
    },
  ]);

  return ( 
      <div>
        <RouterProvider router={appRouter} />
      </div>
  );
};

export default Body;