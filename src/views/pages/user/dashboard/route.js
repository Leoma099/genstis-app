export default [
    {
        path: '/user/dashboard',

        name: 'user / Dashboard',

        component: () => import('@/views/pages/user/dashboard'),

        meta:
        {
            name: 'Dashboard'
        }
    },
];