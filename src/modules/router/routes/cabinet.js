export default [
  {
    name: 'cabinet.dashboard',
    path: 'dashboard',
    component: () => import('@/views/Dashboard'),
    meta: {title: 'Admin'}
  },
  {
    name: 'cabinet.users',
    path: 'users',
    component: () => import('@/views/users/List'),
    meta: {title: 'Users'}
  },
  {
    name: 'cabinet.avis',
    path: 'avis',
    component: () => import('@/views/avis/Avis'),
    meta: {title: 'Avis'}
  },
  {
    name: 'cabinet.messages',
    path: 'messages',
    component: () => import('@/views/messages/List'),
    meta: {title: 'Messages'}
  },
  {
    name: 'cabinet.ads.campaigns',
    path: 'campaigns',
    component: () => import('@/views/ads/Index'),
    meta: {title: 'Ads Campagins'}
  },
  {
    name: 'cabinet.avis.claims',
    path: 'avis-claims',
    component: () => import('@/views/avis/Claims'),
    meta: {title: 'Avis Claims'}
  },
  {
    name: 'cabinet.avis.comments',
    path: 'avis-comments',
    component: () => import('@/views/avis/Comments'),
    meta: {title: 'Avis Comments'}
  },
  {
    name: 'cabinet.avis.ratings',
    path: 'avis-ratings',
    component: () => import('@/views/avis/Ratings'),
    meta: {title: 'Avis Ratings'}
  },
  {
    name: 'cabinet.parties',
    path: 'parties',
    component: () => import('@/views/parties/Parties'),
    meta: {title: 'Parties'}
  },
  {
    name: 'cabinet.parties.comments',
    path: 'parties-comments',
    component: () => import('@/views/parties/Comments'),
    meta: {title: 'PartiesComments'}
  },
  {
    name: 'cabinet.parties.ratings',
    path: 'parties-ratings',
    component: () => import('@/views/parties/Ratings'),
    meta: {title: 'Parties Ratings'}
  },
  {
    name: 'cabinet.parties.claims',
    path: 'parties-claims',
    component: () => import('@/views/parties/Claims'),
    meta: {title: 'Parties Claims'}
  },
  {
    name: 'cabinet.settings',
    path: 'settings',
    component: () => import('@/views/settings/Settings'),
    meta: {title: 'Settings'}
  },
  {
    name: 'cabinet.profile',
    path: 'profile',
    component: () => import('@/views/Profile')
  }
]