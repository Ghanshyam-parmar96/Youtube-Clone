
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css'
import Layout from './Layout';
import Home from './pages/home/Home';
import WatchVideo from './pages/watchVideo/WatchVideo';
import Search from './pages/search/Search';
import Channel from './pages/channel/Channel';
import ChannelHome from './pages/channel/ChannelHome';
import ChannelVideos from './pages/channel/ChannelVideos';
import ChannelPlayLists from './pages/channel/ChannelPlayLists';
import Playlist from './pages/playlist/Playlist';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/watch" element={<WatchVideo />} />
      <Route path="/search" element={<Search />} />
      <Route path="/playlist" element={<Playlist />} />
      <Route path="/channel/:channelId" element={<Channel />}>
        <Route path='/channel/:channelId' element={<ChannelHome />} />
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
