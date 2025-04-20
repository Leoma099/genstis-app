<template>
  <div class="row">
    <!-- Total Tickets -->
    <div class="col-md-6">
      <div class="card card-body shadow-sm border-0 rounded-0">
        <h3 class="mb-0"><strong>Total Tickets</strong></h3>
        <small>Total count of all active support tickets</small>
        <div class="mt-2">
          <h2 class="mb-0">{{ totalTickets }}</h2>
        </div>
      </div>
    </div>

    <!-- Total Priority -->
    <div class="col-md-6">
      <div class="card card-body shadow-sm border-0 rounded-0">
        <h3 class="mb-0"><strong>Ticket Priority</strong></h3>
        <small>All priority in tickets</small>

        <div class="mt-2">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h2 class="mb-0">{{ priority.low }}</h2>
              <small>Low</small>
            </div>

            <div>
              <h2 class="mb-0">{{ priority.medium }}</h2>
              <small>Medium</small>
            </div>

            <div>
              <h2 class="mb-0">{{ priority.high }}</h2>
              <small>High</small>
            </div>

            <div>
              <h2 class="mb-0">{{ priority.emergency }}</h2>
              <small>Emergency</small>
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
      ticket: [], // Data for tickets
      priority: { // Data for priority levels
        low: 0,
        medium: 0,
        high: 0,
        emergency: 0,
      },
    };
  },

  computed: {
    // Computes the total number of tickets
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
        // Fetch all tickets
        const ticketResponse = await apiClient.get("/ticketAssigned");
        this.ticket = ticketResponse.data;

        // Fetch priority stats
        const priorityResponse = await apiClient.get("/priorityStats");
        this.priority = priorityResponse.data;

        // Ensure priority is an array of ticket objects
        this.priority.low = this.priority.filter(ticket => ticket.priority_level === 1).length;
        this.priority.medium = this.priority.filter(ticket => ticket.priority_level === 2).length;
        this.priority.high = this.priority.filter(ticket => ticket.priority_level === 3).length;
        this.priority.emergency = this.priority.filter(ticket => ticket.priority_level === 4).length;

        console.log(priorityResponse.data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },
  },
};
</script>

<style scoped>
.card {
  height: 200px;
}
</style>
