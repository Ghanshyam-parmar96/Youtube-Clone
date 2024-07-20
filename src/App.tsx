
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout';
import { lazy } from 'react';
import './App.css'

const Home = lazy(() => import('./pages/home/Home'));
const WatchVideo = lazy(() => import('./pages/watchVideo/WatchVideo'));
const Search = lazy(() => import('./pages/search/Search'));
const Channel = lazy(() => import('./pages/channel/Channel'));
const ChannelHome = lazy(() => import('./pages/channel/ChannelHome'));
const ChannelVideos = lazy(() => import('./pages/channel/ChannelVideos'));
const ChannelPlayLists = lazy(() => import('./pages/channel/ChannelPlayLists'));
const Playlist = lazy(() => import('./pages/playlist/Playlist'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path="/" element={<Home />} />
      <Route path="/watch" element={<WatchVideo />} />
      <Route path="/search" element={<Search />} />
      <Route path="/playlist" element={<Playlist />} />
      <Route path="/channel/:channelId" element={<Channel />}>
        <Route path='/channel/:channelId/home' element={<ChannelHome />} />
        <Route path='/channel/:channelId/videos' element={<ChannelVideos />} />
        <Route path='/channel/:channelId/playlists' element={<ChannelPlayLists />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App
