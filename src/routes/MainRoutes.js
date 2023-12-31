import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Access from 'views/access';
import Projects from 'views/logics/project';
import BusinessRFQ from 'views/logics/rfq';
import Profiles from 'views/profiles';
import Employee from 'views/Employee/Employee';

import TaskPanel from 'views/task';
import Attendance from 'views/Attendance/Attendance';
// import Manager from 'Manager/Manager';
import UserDetails from 'views/Employee/userDetails';
import Manager from 'Manager/Manager';

// import BusinessLeads from 'views/logics';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
//Business-Logics Route
const BusinessLeads = Loadable(lazy(() => import('views/logics')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    
    {
      path: 'logics',
      children: [
        {
          path: 'leads',
          element: <BusinessLeads />
        }
      ]
    },
    {
      path: 'logics',
      children: [
        {
          path: 'rfq',
          element: <BusinessRFQ />
        }
      ]
    },
    {
      path: 'logics',
      children: [
        {
          path: 'projects',
          element: <Projects />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: '/profile',
      element: <Profiles />
    },
    {
      path: '/roles-access',
      element: <Access />
    },
    {
      path: '/task-panel',
      element: <TaskPanel/>,
    },
    {
      path: 'user',
      children: [
        {
          path: 'user-detail',
          element: <UserDetails />
        }
      ]
    },
    {
      path: 'user',
      children: [
        {
          path: 'task-detail',
          element: <Employee />
        }
      ]
    },
   
    {
      path: '/attendance-Panel',
      element: <Attendance />,
    },
    {
      path: '/Manager-Panel',
      element: <Manager />,
    }
  ]
};

export default MainRoutes;
