import { Outlet } from 'react-router-dom'
import PageHeader from './layouts/PageHeader'
import Sidebar from './layouts/Sidebar'
// import ContentWrapper from './components/ContentWrapper'

const Layout = () => {
  return (
    <div className="max-w-screen-2xl mx-auto relative max-h-screen scrollbarHide font-Roboto">
      <PageHeader />
      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto h-[calc(100vh_-_64px)] scrollbarHide">
        <Sidebar/>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout