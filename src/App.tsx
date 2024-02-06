
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css'
import Layout from './Layout';
import Home from './pages/home/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home/>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App
