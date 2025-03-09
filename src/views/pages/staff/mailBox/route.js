export default [
    {
        path: '/staff/mail-box',
        name: 'Staff / Mailbox',
        component: () => import('@/views/pages/staff/mailBox'),
        meta:
        {
            name: 'Mailbox',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create Staff / Mailbox',
                    component: () => import('@/views/pages/staff/mailBox'),
                    meta:
                    {
                        name: 'Create Mail',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':code',
                    name: 'View Staff / Mailbox',
                    component: () => import('@/views/pages/staff/mailBox'),
                    meta:
                    {
                        name: 'View Mail',

                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Staff / Mailbox',
                                component: () => import('@/views/pages/staff/mailBox'),
                                meta:
                                {
                                    name: 'Edit Mail',

                                    page: 'edit',
                                    subPage: 'main',
                                },
                            },
                        ],
                },
            ],
    },
];