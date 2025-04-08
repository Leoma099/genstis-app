<template>

    <li>
        <router-link :to="'/user/dashboard'">
            <i class="bx bxs-dashboard"></i>Dashboard
        </router-link>
    </li>

    <li>
        <router-link :to="'/user/request-ticket'">
            <i class="bx bxs-dashboard"></i>Request Ticket
        </router-link>
    </li>

    <li>
        <router-link :to="'/user/on-call'">
            <i class="bx bxs-dashboard"></i>On-Call
        </router-link>
    </li>

    <li>
        <router-link :to="'/user/feedback'">
            <i class="bx bxs-dashboard"></i>Feedback
        </router-link>
    </li>

</template>