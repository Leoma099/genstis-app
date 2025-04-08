<template>
  <div class="row">
    <!-- Total Tickets -->
    <div class="col-md-4">
      <div class="card card-body shadow-sm border-0 rounded-0">
        <h3 class="mb-0"><strong>Total Tickets</strong></h3>
        <small>Total count of all active support tickets</small>
        <div class="mt-2">
          <h2 class="mb-0">{{ totalTickets }}</h2>
        </div>
      </div>
    </div>

    <!-- Total Users -->
    <div class="col-md-4">
      <div class="card card-body shadow-sm border-0 rounded-0">
        <h3 class="mb-0"><strong>Total Users</strong></h3>
        <small>Total count of all users</small>
        <div class="mt-2">
          <h2 class="mb-0">{{ totalAccount }}</h2>
        </div>
      </div>
    </div>

    <!-- Total Priority -->
    <div class="col-md-4">
      <div class="card card-body shadow-sm border-0 rounded-0">
        <h3 class="mb-0"><strong>Ticket Priority</strong></h3>
        <small>All priority in tickets</small>

        <div class="mt-2">
          
          <div class="d-flex justify-content-between align-items-center">

            <div>
              <h2 class="mb-0">{{ priority.low }}</h2>
              <smal>Low</smal>
            </div>

            <div>
              <h2 class="mb-0">{{ priority.medium }}</h2>
              <smal>Medium</smal>
            </div>

            <div>
              <h2 class="mb-0">{{ priority.high }}</h2>
              <smal>High</smal>
            </div>

            <div>
              <h2 class="mb-0">{{ priority.emergency }}</h2>
              <smal>Emergency</smal>
            </div>

          </div>

        </div>

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
      priority: [],
      low: 0,
      medium: 0,
      high: 0,
      emergency: 0,
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

        const priorityResponse = await apiClient.get("/priorityStats");
        this.priority = priorityResponse.data;

        this.low = this.priority.filter(ticket => ticket.priority_level === 1).length;
        this.medium = this.priority.filter(ticket => ticket.priority_level === 2).length;
        this.high = this.priority.filter(ticket => ticket.priority_level === 3).length;
        this.emergency = this.priority.filter(ticket => ticket.priority_level === 4).length;

        console.log(priorityResponse.data)

      } catch (error) {
        console.error("Error loading data:", error);
      }
    },
  },
};
</script>

<style scoped>
.card
{
  height: 200px;
}
</style>
