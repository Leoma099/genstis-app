<template>

    <div class="animate animate-fade-in">

        <div class="d-flex justify-content-between align-items-center">
            <p class="page-title mb-0">DASHBOARD</p>
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

    </div>

</template>

<script>
import SystemOverview from "./content/system-overview.vue";
import StatisticsComponent from "./content/statistics";
import TicketsComponent from "./content/tickets";
export default
{
    components:
    {
        SystemOverview,
        StatisticsComponent,
        TicketsComponent,
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