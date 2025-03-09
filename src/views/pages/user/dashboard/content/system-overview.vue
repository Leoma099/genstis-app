<template>

    <div class="row">

        <div class="col-md-4">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <div class="mt-2">
                    <h2 class="mb-0">{{ totalTickets }}</h2>
                </div>
                <p class="mb-0">Total Ticket</p>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <div class="mt-2">
                    <h2 class="mb-0">{{ resolvedTickets }}</h2>
                </div>
                <p class="mb-0">Total Resolved Tickets</p>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <div class="mt-2">
                    <h2 class="mb-0">{{ notCompletedTickets }}</h2>
                </div>
                <p class="mb-0">Not Completed Tickets</p>
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
        return {
            ticket: [],
            resolvedTickets: 0,
            notCompletedTickets: 0,
        };
    },

    computed:
    {
        totalTickets()
        {
            return this.ticket.length;
        },
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
                const ticketResponse = await apiClient.get('/ticket');
                this.ticket = ticketResponse.data;

                const statusResponse = await apiClient.get('/status');
                this.resolvedTickets = statusResponse.data.resolved;
                this.notCompletedTickets = statusResponse.data.unresolved;
            }
            catch(error)
            {
                console.error("Error loading data:", error);
            }

        }

    }
};
</script>

<style>

</style>