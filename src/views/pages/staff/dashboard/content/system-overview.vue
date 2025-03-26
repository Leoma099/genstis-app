<template>
    <div class="row">
      <!-- Total Tickets -->
      <div class="col-md-4">
        <div class="card card-body shadow-sm border-0 rounded-0">
          <div class="mt-2">
            <h2 class="mb-0">{{ totalTickets }}</h2>
          </div>
          <p class="mb-0">Total Ticket</p>
        </div>
      </div>
  
      <!-- Total Resolved Tickets -->
      <div class="col-md-4">
        <div class="card card-body shadow-sm border-0 rounded-0">
          <div class="mt-2">
            <h2 class="mb-0">{{ resolvedTickets }}</h2>
          </div>
          <p class="mb-0">Resolved Tickets</p>
        </div>
      </div>
  
      <!-- Total Not Completed Tickets -->
      <div class="col-md-4">
        <div class="card card-body shadow-sm border-0 rounded-0">
          <div class="mt-2">
            <h2 class="mb-0">{{ notCompletedTickets }}</h2>
          </div>
          <p class="mb-0">Unresolved Tickets</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from "@/services/authorization"; // Ensure the path to apiClient is correct
  
  export default {
    data() {
      return {
        ticket: [],
        resolvedTickets: 0, // Initialize to 0
        notCompletedTickets: 0, // Initialize to 0
      };
    },
  
    computed: {
      totalTickets() {
        return this.ticket.length;
      },

    },
  
    created() {
      this.loadData();
    },
  
    methods: {
      async loadData() {
        try {
          const ticketResponse = await apiClient.get("/ticketAssigned");
          this.ticket = ticketResponse.data;
  
          // Assuming ticket data has a "status" or a similar property to indicate if the ticket is resolved
          this.resolvedTickets = this.ticket.filter(ticket => ticket.status === 3).length;
          this.notCompletedTickets = this.ticket.filter(ticket => ticket.status === 4).length;
        } catch (error) {
          console.error("Error loading data:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* You can add your styles here */
  </style>
  