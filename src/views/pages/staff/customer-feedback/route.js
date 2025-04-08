export default [
    {
        path: '/staff/customer-feedback',
        name: 'Staff / Customer Feedback',
        component: () => import('@/views/pages/staff/customer-feedback'),
        meta:
        {
            name: 'Customer Feedback',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create Staff / Customer Feedback',
                    component: () => import('@/views/pages/staff/customer-feedback'),
                    meta:
                    {
                        name: 'Create Customer Feedback',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':id',
                    name: 'View Staff / Customer Feedback',
                    component: () => import('@/views/pages/staff/customer-feedback'),
                    meta:
                    {
                        name: 'View Customer Feedback',

                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Staff / Customer Feedback',
                                component: () => import('@/views/pages/staff/customer-feedback'),
                                meta:
                                {
                                    name: 'Edit Customer Feedback',
                                    page: 'edit',
                                    subPage: 'main',
                                },
                            },
                        ],
                },
            ],
    },
];