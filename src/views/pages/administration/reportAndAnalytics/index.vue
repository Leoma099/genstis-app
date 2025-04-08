<template>

    <div class="d-flex justify-content-between align-items-center">
        <h1 class="page-title mb-0">Report and Analytics</h1>
    </div>

    <div class="mt-4">
        <div class="row">
            <div class="col-md-4">
                <status-component />
            </div>
            <div class="col-md-4">
                <priority-component />
            </div>
            <div class="col-md-4">
                <asignee-component />
            </div>
        </div>
    </div>

    <div class="mt-4">
        <statistics-component />
    </div>

    <div class="mt-4">
        <resolved-by-staff-component />
    </div>

    <filter-modal />

</template>

<script>
// import OverviewComponent from "./content/overview.vue";
import FilterModal from "./components/modal/index.vue";
import ResolvedByStaffComponent from './content/resolvedByStaff.vue';
import StatisticsComponent from "./content/ticketStatistic.vue";
import StatusComponent from "./content/status.vue";
import PriorityComponent from "./content/priority.vue";
import AsigneeComponent from "./content/asignee.vue";
export default
{
    components:
    {
        // OverviewComponent,
        FilterModal,
        ResolvedByStaffComponent,
        StatisticsComponent,
        StatusComponent,
        PriorityComponent,
        AsigneeComponent
    }
}
</script>

<style scoped>
.page-title
{
    color: #a200ff;
}
</style>