// assets
import {
  IconTypography,
  IconPalette,
  IconBusinessplan,
  IconShadow,
  IconWindmill,
  IconUser,
  IconLockAccess,
  IconUsers,
  IconUserX
} from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconBusinessplan,
  IconUser,
  IconLockAccess,
  IconUsers,
  IconUserX
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  // title: 'Utilities',
  type: 'group',
  children: [
    // {
    //   id: 'util-typography',
    //   title: 'Typography',
    //   type: 'item',
    //   url: '/utils/util-typography',
    //   icon: icons.IconTypography,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'util-color',
    //   title: 'Color',
    //   type: 'item',
    //   url: '/utils/util-color',
    //   icon: icons.IconPalette,
    //   breadcrumbs: true
    // },
    // {
    //   id: 'business-logics',
    //   title: 'Business Logics',
    //   type: 'item',
    //   url: 'business-logics',
    //   icon: icons.IconBusinessplan,
    //   breadcrumbs: true
    // },

    {
      id: 'icons',
      title: 'Business Logics',
      type: 'collapse',
      icon: icons.IconBusinessplan,
      children: [
        {
          id: 'tabler-icons',
          title: 'Leads',
          type: 'item',
          url: 'logics/leads',
          breadcrumbs: false
        },
        {
          id: 'rfq',
          title: 'RFQ',
          type: 'item',
          // external: true,
          // target: '_blank',
          url: 'logics/rfq',
          breadcrumbs: false
        },
        {
          id: 'projects',
          title: 'Project',
          type: 'item',
          // external: true,
          // target: '_blank',
          url: 'logics/projects',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'profiles',
      title: 'Profiles',
      type: 'item',
      url: '/profile',
      icon: icons.IconUser,
      breadcrumbs: false
    },
    {
      id: 'roles-access',
      title: 'Roles Access',
      type: 'item',
      url: '/roles-access',
      icon: icons.IconLockAccess,
      breadcrumbs: false
    },
    {
      id: 'icons',
      title: 'User',
      type: 'collapse',
      icon: icons.IconUsers,
      children: [
        {
          id: 'task-detail',
          title: 'Task Detail',
          type: 'item',
          // external: true,
          // target: '_blank',
          url: 'user/task-detail',
          breadcrumbs: false
        },
        {
          id: 'user-detail',
          title: 'User Detail',
          type: 'item',
          // external: true,
          // target: '_blank',
          url: 'user/user-detail',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'ManagerPanel',
      title: 'Manager Panel',
      type: 'item',
      url: '/Manager-Panel',
      icon: icons.IconUserX,
      breadcrumbs: false
    },
    {
      id: 'attendanceapproval',
      title: 'Attendance Approval',
      type: 'item',
      url: '/attendance-Panel',
      icon: icons.IconUserX,
      breadcrumbs: false
    }
  ]
};

export default utilities;
