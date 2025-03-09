<template>

    <li>
        <router-link :to="'/administration/dashboard'">
            <i class="bx bxs-dashboard"></i>Dashboard
        </router-link>
    </li>

    <li>
        <router-link :to="'/administration/ticket-management'">
            <i class="bx bxs-receipt"></i>Ticket Management
        </router-link>
    </li>

    <li>
        <router-link :to="'/administration/user-management'">
            <i class="bx bxs-group"></i>User Management
        </router-link>
    </li>

    <!-- <li>
        <router-link :to="'/administration/mail-box'">
            <i class="bx bxs-receipt"></i>Mailbox
        </router-link>
    </li> -->

</template>