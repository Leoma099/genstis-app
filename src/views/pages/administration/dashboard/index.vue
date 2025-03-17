<template>

    <div class="animate animate-fade-in">

        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
                <p class="page-title mb-0 me-3">DASHBOARD</p>
                <div class="col-md-12">
                    <input type="text" class="form-control rounded-0" placeholder="Search here...">
                </div>
            </div>
            <router-link :to="'/administration/ticket-management/create'" class="btn rounded-0 button-color">Create New Ticket</router-link>
        </div>

        <div class="mt-4">
            <system-overview/>
        </div>

        <div class="mt-4">
            <div class="row">
                <div class="col-md-8">
                    <statistics-component />
                </div>
                <div class="col-md-4">
                    <tickets-component />
                </div>
            </div>
        </div>

        <div class="mt-4">
            <recent-activity />
        </div>

    </div>

</template>

<script>
import SystemOverview from "./content/system-overview.vue";
import StatisticsComponent from "./content/statistics";
import TicketsComponent from "./content/tickets";
import RecentActivity from './content/recent-activity.vue';
export default
{
    components:
    {
        SystemOverview,
        StatisticsComponent,
        TicketsComponent,
        RecentActivity,
    }
}
</script>

<style scoped>
.animate
{
    animation-duration: 1s;
    animation-fill-mode: none;
}
.animate-fade-in
{
    animation-name: fadeIn;
}

@keyframes fadeIn{
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}
.page-title {
    font-weight: 600;
    font-size: 1.5rem;
    color: #a200ff;
}
.button-color {
    background-color: #a200ff;
    color: #ffffff;
}
</style>