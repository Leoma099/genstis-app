<template>
    <div class="d-flex justify-content-between alignitems-center">
        <p class="page-title mb-0">Reports</p>
        <div>
            <button class="btn btn-primary rounded-0 me-3">Exports</button>
            <button class="btn btn-primary rounded-0">Filter</button>
        </div>
    </div>

    <div class="mt-4">

        <div class="d-flex align-items-center mb-3">
            <p class="mb-0 me-3"><strong>Total Tickets:</strong></p>
            <p class="mb-0">{{ totalTickets }}</p>
        </div>

        <!-- This is overview and high level metrics -->
        <div class="row mb-3">
            <div class="col-md-3">
                <div class="card card-body shadow-sm border-0 rounded-0">
                    <div class="mt-2">
                        <h2 class="mb-0">{{ totalPending }}</h2>
                    </div>
                    <p class="mb-0"><strong>Pending</strong></p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card card-body shadow-sm border-0 rounded-0">
                    <div class="mt-2">
                        <h2 class="mb-0">{{ totalProgress }}</h2>
                    </div>
                    <p class="mb-0"><strong>In-Progress</strong></p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card card-body shadow-sm border-0 rounded-0">
                    <div class="mt-2">
                        <h2 class="mb-0">{{ totalResolved }}</h2>
                    </div>
                    <p class="mb-0"><strong>Resolved</strong></p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card card-body shadow-sm border-0 rounded-0">
                    <div class="mt-2">
                        <h2 class="mb-0">{{ totalUnresolved }}</h2>
                    </div>
                    <p class="mb-0"><strong>Unresolved</strong></p>
                </div>
            </div>
        </div>

        <!-- This is overview and high level metrics -->
        <div class="row mb-3">
            <div class="col-md-3">
                <div class="card card-body shadow-sm border-0 rounded-0">
                    <div class="mt-2">
                        <h2 class="mb-0">{{ totalLow }}</h2>
                    </div>
                    <p class="mb-0"><strong>Low</strong></p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card card-body shadow-sm border-0 rounded-0">
                    <div class="mt-2">
                        <h2 class="mb-0">{{ totalMedium }}</h2>
                    </div>
                    <p class="mb-0"><strong>Medium</strong></p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card card-body shadow-sm border-0 rounded-0">
                    <div class="mt-2">
                        <h2 class="mb-0">{{ totalHigh }}</h2>
                    </div>
                    <p class="mb-0"><strong>High</strong></p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card card-body shadow-sm border-0 rounded-0">
                    <div class="mt-2">
                        <h2 class="mb-0">{{ totalEmergency }}</h2>
                    </div>
                    <p class="mb-0"><strong>Emergency</strong></p>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import apiClient from "@/services/authorization";
export default
{
    data()
    {
        return{
            ticket: [],
            totalPending: 0,
            totalProgress: 0,
            totalResolved: 0,
            totalUnresolved: 0,
            totalLow: 0,
            totalMedium: 0,
            totalHigh: 0,
            totalEmergency: 0,
        }
    },

    computed:
    {
        totalTickets()
        {
            return this.ticket.length;
        }
    },

    created()
    {
        this.loadData();
    },

    methods:
    {
        async loadData()
        {
            try
            {
                const ticketResponse = await apiClient.get("/ticket");
                this.ticket = ticketResponse.data;
            }
            catch(error)
            {
                console.error("Error loading data:", error);
            }
        }
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