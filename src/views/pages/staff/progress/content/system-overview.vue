<template>
    <div class="row">
        <div class="col-md-3">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <h2>{{ totalTickets }}</h2>
                <p>Total Tickets</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <h2>{{ pending }}</h2>
                <p>Total Pending</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <h2>{{ resolvedTickets }}</h2>
                <p>Total Resolved</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <h2>{{ notCompletedTickets }}</h2>
                <p>Total Unresolved</p>
            </div>
        </div>
    </div>
</template>

<script>
import apiClient from "@/services/authorization"; // Ensure the path to apiClient is correct
export default
{
    data()
    {
        return {
            ticket: [],
            pending: 0,
            resolved: 0,
            unresolved: 0,
        };
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
                const ticketResponse = await apiClient.get("/ticketAssigned");
                this.ticket = ticketResponse.data;

                this.resolvedTickets = this.ticket.filter(ticket => ticket.status === 3).length;
                this.notCompletedTickets = this.ticket.filter(ticket => ticket.status === 4).length;
            }
            catch(error)
            {
                console.error("Error laoding data:", error);
            }
        }
    }
};
</script>

<style scoped>
/* You can add your styles here */
</style>
