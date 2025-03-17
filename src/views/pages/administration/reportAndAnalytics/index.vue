<template>

    <div class="d-flex justify-content-between align-items-center">
        <p class="page-title mb-0">Report and Analytics</p>
        <div>
            <button
                type="button"
                class="btn btn-primary rounded-0 me-3">
                Exports
            </button>
            <button
                type="button"
                class="btn btn-primary rounded-0"
                data-bs-toggle="modal" data-bs-target="#exampleModal">
                Filter
            </button>
        </div>
    </div>

    <div class="mt-4">
        <overview-component />
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
        <resolved-by-staff-component />
    </div>

    <filter-modal />

</template>

<script>
import OverviewComponent from "./content/overview.vue";
import FilterModal from "./components/modal/index.vue";
import ResolvedByStaffComponent from './content/resolvedByStaff.vue';
import StatisticsComponent from "./content/ticketStatistic.vue";
import TicketsComponent from "./content/statusStatistic.vue";
export default
{
    components:
    {
        OverviewComponent,
        FilterModal,
        ResolvedByStaffComponent,
        StatisticsComponent,
        TicketsComponent,
    }
}
</script>

<style scoped>
.page-title
{
    font-weight: 600;
    font-size: 1.5rem;
    color: #a200ff;
}
</style>