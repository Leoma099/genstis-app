export default [
    {
        path: '/staff/report',

        name: 'Reports',

        component: () => import('@/views/pages/staff/report'),

        meta:
        {
            name: 'Reports'
        }
    },
];