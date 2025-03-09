<template>
    <div class="row">
      <!-- Total Users -->
      <div class="col-md-3">
        <div class="card card-body shadow-sm border-0 rounded-0">
          <div class="mt-2">
            <h2 class="mb-0">{{ totalAccount }}</h2>
          </div>
          <p class="mb-0">Total Users</p>
        </div>
      </div>
  
      <!-- Total Tickets -->
      <div class="col-md-3">
        <div class="card card-body shadow-sm border-0 rounded-0">
          <div class="mt-2">
            <h2 class="mb-0">{{ totalTickets }}</h2>
          </div>
          <p class="mb-0">Total Ticket</p>
        </div>
      </div>
  
      <!-- Total Resolved Tickets -->
      <div class="col-md-3">
        <div class="card card-body shadow-sm border-0 rounded-0">
          <div class="mt-2">
            <h2 class="mb-0">{{ resolvedTickets }}</h2>
          </div>
          <p class="mb-0">Resolved Tickets</p>
        </div>
      </div>
  
      <!-- Total Not Completed Tickets -->
      <div class="col-md-3">
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
        account: [],
        resolvedTickets: 0, // Initialize to 0
        notCompletedTickets: 0, // Initialize to 0
      };
    },
  
    computed: {
      totalTickets() {
        return this.ticket.length;
      },
  
      totalAccount() {
        return this.account.length;
      },
    },
  
    created() {
      this.loadData();
    },
  
    methods: {
      async loadData() {
        try {
          const ticketResponse = await apiClient.get("/ticket");
          this.ticket = ticketResponse.data;
  
          const accountResponse = await apiClient.get("/account");
          this.account = accountResponse.data;
  
          // Assuming ticket data has a "status" or a similar property to indicate if the ticket is resolved
          this.resolvedTickets = this.ticket.filter(ticket => ticket.status === 3).length;
          this.notCompletedTickets = this.ticket.filter(ticket => ticket.status !== 4).length;
  
          console.log(accountResponse.data);
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
  