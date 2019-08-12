import React from 'react';
import { withRouter} from 'react-router-dom'

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Group = React.lazy(() => import('./views/Group'));
const Profile = React.lazy(() => import('./views/Profile'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/groups/:gid', exact: true,name: 'Group', component: withRouter(Group) },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: Profile },
];

export default routes;
