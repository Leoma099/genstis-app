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

    <li>
        <router-link :to="'/administration/report-and-analytics'">
            <i class="bx bxs-report"></i>Report and Analytics
        </router-link>
    </li>

    <li>
        <router-link :to="'/administration/team'">
            <i class="bx bxs-group"></i>Team
        </router-link>
    </li>

    <!-- <li>
        <router-link :to="'/administration/customer-feedback'">
            <i class="bx bxs-group"></i>Customer Feedback
        </router-link>
    </li> -->

    <!-- <li>
        <router-link :to="'/administration/operator'">
            <i class="bx bxs-cog"></i>Operator
        </router-link>
    </li> -->

</template>