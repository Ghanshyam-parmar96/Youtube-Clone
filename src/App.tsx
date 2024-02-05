
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css'
import Layout from './Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* <Route path="/" component={<Home/>} /> */}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App
