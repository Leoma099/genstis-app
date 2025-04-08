<template>

    <li>
        <router-link :to="'/staff/dashboard'">
            <i class="bx bxs-dashboard"></i>Dashboard
        </router-link>
    </li>

    <li>
        <router-link :to="'/staff/ticket-management'">
            <i class="bx bxs-dashboard"></i>Ticket Management
        </router-link>
    </li>

    <li>
        <router-link :to="'/staff/progress'">
            <i class="bx bxs-dashboard"></i>Progress
        </router-link>
    </li>

    <li>
        <router-link :to="'/staff/customer-feedback'">
            <i class="bx bxs-dashboard"></i>Customer Feedback
        </router-link>
    </li>

</template>