export default [
    {
        path: '/administration/customer-feedback',
        name: 'Administration / Customer Feedback',
        component: () => import('@/views/pages/administration/customer-feedback'),
        meta:
        {
            name: 'Customer Feedback',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create Administration / Customer Feedback',
                    component: () => import('@/views/pages/administration/customer-feedback'),
                    meta:
                    {
                        name: 'Create Customer Feedback',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':id',
                    name: 'View Administration / Customer Feedback',
                    component: () => import('@/views/pages/administration/customer-feedback'),
                    meta:
                    {
                        name: 'View Customer Feedback',

                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Administration / Customer Feedback',
                                component: () => import('@/views/pages/administration/customer-feedback'),
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