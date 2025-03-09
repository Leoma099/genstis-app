export default [
    {
        path: '/staff/ticket-management',
        name: 'Staff / Ticket Management',
        component: () => import('@/views/pages/staff/ticketManagement'),
        meta:
        {
            name: 'Ticket',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create Staff / Ticket Management',
                    component: () => import('@/views/pages/staff/ticketManagement'),
                    meta:
                    {
                        name: 'Create Ticket',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':id',
                    name: 'View Staff / Ticket Management',
                    component: () => import('@/views/pages/staff/ticketManagement'),
                    meta:
                    {
                        name: 'View Ticket',

                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Staff / Ticket Management',
                                component: () => import('@/views/pages/staff/ticketManagement'),
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