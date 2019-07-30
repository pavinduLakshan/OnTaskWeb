import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Group = React.lazy(() => import('./views/Group'));
const Profile = React.lazy(() => import('./views/Profile'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/groups/:gid', name: 'Group', component: Group },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
