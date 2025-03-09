export default [
    {
        path: '/staff/dashboard',

        name: 'Staff / Dashboard',

        component: () => import('@/views/pages/staff/dashboard'),

        meta:
        {
            name: 'Dashboard'
        }
    },
];