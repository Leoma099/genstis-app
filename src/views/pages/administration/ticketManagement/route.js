export default [
    {
        path: '/administration/ticket-management',
        name: 'Administration / Ticket Management',
        component: () => import('@/views/pages/administration/ticketManagement'),
        meta:
        {
            name: 'Ticket',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create Administration / Ticket Management',
                    component: () => import('@/views/pages/administration/ticketManagement'),
                    meta:
                    {
                        name: 'Create Ticket',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':id',
                    name: 'View Administration / Ticket Management',
                    component: () => import('@/views/pages/administration/ticketManagement'),
                    meta:
                    {
                        name: 'View Ticket',

                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Administration / Ticket Management',
                                component: () => import('@/views/pages/administration/ticketManagement'),
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