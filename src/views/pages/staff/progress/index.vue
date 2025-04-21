<template>

    <div class="animate animate-fade-in">

        <div class="d-flex justify-content-between align-items-center">
            <h1 class="page-title mb-0">PROGRESS</h1>
        </div>

        <div class="mt-4">
            <system-overview/>
        </div>

        <div class="mt-4">
            <ticket-list/>
        </div>

    </div>

</template>

<script>
import SystemOverview from "./content/system-overview.vue";
import TicketList from "./content/ticket-list.vue";
export default
{
    components:
    {
        SystemOverview,
        TicketList
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
    color: #007bff;
}
.button-color {
    background-color: #007bff;
    color: #ffffff;
}
</style>