import React from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  PathRouteProps 
} from "react-router-dom";
import Home from './pages/Home';
import DetailInfo from './pages/DetailInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import NotFound from './pages/NotFound';

const routes: PathRouteProps[] = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/people/:id",
    element: <DetailInfo />
  },
  {
    path: "*",
    element: <NotFound buttonText="Go to home page" />
  }
]


function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        { 
          routes.map(route => <Route key={route.path} {...route} />) 
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
