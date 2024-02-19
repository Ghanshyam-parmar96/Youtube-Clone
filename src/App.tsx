
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css'
import Layout from './Layout';
import Home from './pages/home/Home';
import WatchVideo from './pages/watchVideo/WatchVideo';
import Search from './pages/search/Search';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home/>} />
      <Route path="/watch" element={<WatchVideo/>} />
      <Route path="/search" element={<Search/>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App
