export default [
    {
        path: '/user/feedback',

        name: 'user / Feedback',

        component: () => import('@/views/pages/user/feedback'),

        meta:
        {
            name: 'Feedback'
        }
    },
];