export default [
    {
        path: '/administration/user-management',
        name: 'Administration / User Management',
        component: () => import('@/views/pages/administration/userManagement'),
        meta:
        {
            name: 'User Accounts',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create Administration / User Management',
                    component: () => import('@/views/pages/administration/userManagement'),
                    meta:
                    {
                        name: 'Create User Account',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':id',
                    name: 'View Administration / User Management',
                    component: () => import('@/views/pages/administration/userManagement'),
                    meta:
                    {
                        name: 'View User Account',

                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Administration / User Management',
                                component: () => import('@/views/pages/administration/userManagement'),
                                meta:
                                {
                                    name: 'Edit User Account',

                                    page: 'edit',
                                    subPage: 'main',
                                },
                            },
                        ],
                },
            ],
    },
];