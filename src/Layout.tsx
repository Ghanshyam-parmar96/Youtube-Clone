import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
const PageHeader = lazy(() => import("./layouts/PageHeader"));
const Sidebar = lazy(() => import("./layouts/Sidebar"));

const Layout = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
    <div className="max-w-screen-2xl mx-auto relative max-h-screen scrollbarHide font-Roboto dark:bg-[#1f1f1f] dark:text-white">
      <PageHeader />
      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto h-[calc(100vh_-_64px)] scrollbarHide">
        <div className="sm:w-16 sm:mx-1 2xl:w-56">
          <Sidebar/>
        </div>
        <div className='w-full overflow-y-scroll' id="scrollableDiv">
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
    </Suspense>
  )
}

export default Layout