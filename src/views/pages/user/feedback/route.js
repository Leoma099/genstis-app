export default [
    {
        path: '/user/feedback',
        name: 'User / Feedback',
        component: () => import('@/views/pages/user/feedback'),
        meta:
        {
            name: 'Request Feedback',
            page: 'list',
        },
        children:
            [
                {
                    path: ':code',
                    name: 'Create Feedback / Feedback',
                    component: () => import('@/views/pages/user/feedback'),
                    meta:
                    {
                        name: 'Create Feedback',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':code',
                    name: 'View Feedback / Feedback',
                    component: () => import('@/views/pages/user/feedback'),
                    meta:
                    {
                        name: 'View Feedback',

                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Feedback / Feedback',
                                component: () => import('@/views/pages/user/feedback'),
                                meta:
                                {
                                    name: 'Edit Feedback',

                                    page: 'edit',
                                    subPage: 'main',
                                },
                            },
                        ],
                },
            ],
    },
];