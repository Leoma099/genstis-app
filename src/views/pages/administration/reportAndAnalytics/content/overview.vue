<template>
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
        this.fetchStatusData();
        this.fetchPriorityLevelData();
    },

    methods:
    {
        async loadData()
        {
            try
            {
                const response = await apiClient.get("/ticket");
                this.ticket = response.data;
            }
            catch(error)
            {
                console.error("Error loading data:", error);
            }
        },

        async fetchStatusData()
        {
            try
            {
                const response = await apiClient.get("/ticketStat");

                this.totalPending = response.data.pending;
                this.totalProgress = response.data.inProgress;
                this.totalResolved = response.data.resolved;
                this.totalUnresolved = response.data.unresolved;
            }
            catch(error)
            {
                console.error("Error loading data:", error);
            }
        },

        async fetchPriorityLevelData()
        {
            try
            {
                const response = await apiClient.get("/ticketStats");

                this.totalLow = response.data.low;
                this.totalMedium = response.data.medium;
                this.totalHigh = response.data.high;
                this.totalEmergency = response.data.emergency;
            }
            catch(error)
            {
                console.error("Error loading data:", error);
            }
        }
    }
}
</script>

<style>

</style>