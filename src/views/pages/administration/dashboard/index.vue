<template>

    <div class="animate animate-fade-in">

        <h1 class="page-title mb-0 me-3">DASHBOARD</h1>

        <div class="mt-4">
            <system-overview/>
        </div>

        <div class="mt-4">
            <div class="row">
                <div class="col-md-8">
                    <recent-activity />
                </div>
                <div class="col-md-4">
                    <tickets-component />
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import SystemOverview from "./content/system-overview.vue";
import TicketsComponent from "./content/tickets";
import RecentActivity from './content/recent-activity.vue';
export default
{
    components:
    {
        SystemOverview,
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
    color: #a200ff;
}
.button-color {
    background-color: #a200ff;
    color: #ffffff;
}
</style>