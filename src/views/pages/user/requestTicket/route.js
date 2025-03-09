export default [
    {
        path: '/user/request-ticket',
        name: 'Administration / Request Ticket',
        component: () => import('@/views/pages/user/requestTicket'),
        meta:
        {
            name: 'Request Ticket',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create Ticket / Request Ticket',
                    component: () => import('@/views/pages/user/requestTicket'),
                    meta:
                    {
                        name: 'Create Ticket',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':code',
                    name: 'View Ticket / Request Ticket',
                    component: () => import('@/views/pages/user/requestTicket'),
                    meta:
                    {
                        name: 'View Ticket',

                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Ticket / Request Ticket',
                                component: () => import('@/views/pages/user/requestTicket'),
                                meta:
                                {
                                    name: 'Edit Ticket',

                                    page: 'edit',
                                    subPage: 'main',
                                },
                            },
                        ],
                },
            ],
    },
];