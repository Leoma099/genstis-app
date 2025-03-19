<template>
    <div class="col-md-6">
        <div class="card card-body shadow-sm border-0 rounded-0">
            <p>Asigned Ticket</p>

            <div class="row">
                <div class="col-md-3">
                    <h3>{{ totalPending }}</h3>
                    <p>Pending</p>
                </div>
                <div class="col-md-3">
                    <h3>{{ totalProgress }}</h3>
                    <p>In-progress</p>
                </div>
                <div class="col-md-3">
                    <h3>{{ totalResolved }}</h3>
                    <p>Resolved</p>
                </div>
                <div class="col-md-3">
                    <h3>{{ totalUnresolved }}</h3>
                    <p>Unresolved</p>
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
                const response = await apiClient.get("/ticketStat");
                this.totalPending = response.data.pending;
                this.totalProgress = response.data.inProgress;
                this.totalResolved = response.data.resolved;
                this.totalUnresolved = response.data.unresolved;
            }
            catch (error)
            {
                console.error("Error loading ticket status:", error);
            }
        }

    }

}
</script>

<style>

</style>