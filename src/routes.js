import React from 'react';
import { withRouter} from 'react-router-dom'

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Group = React.lazy(() => import('./views/Group'));
const Profile = React.lazy(() => import('./views/Profile'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/groups/:gid', exact: true,name: 'Group', component: withRouter(Group) },
  { path: '/users/:id', exact: true, name: 'User Details', component: Profile },
];

export default routes;
