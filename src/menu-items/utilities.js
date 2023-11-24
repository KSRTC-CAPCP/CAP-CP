// assets
import { IconTypography, IconPalette, IconBusinessplan, IconShadow, IconWindmill, IconUser } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconBusinessplan,
  IconUser
  
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
    // {
    //   id: 'util-shadow',
    //   title: 'Shadow',
    //   type: 'item',
    //   url: '/utils/util-shadow',
    //   icon: icons.IconShadow,
    //   breadcrumbs: false
    // },
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
      icon: icons.IconUser,
      breadcrumbs: false
    }
  ]
};

export default utilities;

