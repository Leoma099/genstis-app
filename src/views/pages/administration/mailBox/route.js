export default [
    {
        path: '/administration/mail-box',
        name: 'Administration / Mailbox',
        component: () => import('@/views/pages/administration/mailBox'),
        meta:
        {
            name: 'Mailbox',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create Administration / Mailbox',
                    component: () => import('@/views/pages/administration/mailBox'),
                    meta:
                    {
                        name: 'Create Mail',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':code',
                    name: 'View Administration / Mailbox',
                    component: () => import('@/views/pages/administration/mailBox'),
                    meta:
                    {
                        name: 'View Mail',

                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Administration / Mailbox',
                                component: () => import('@/views/pages/administration/mailBox'),
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