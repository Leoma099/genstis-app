<template>
    <form @submit.prevent="submit()">
      <div class="col-md-4">
        <div class="card card-body shadow-sm border-0 rounded-0">
          <div class="form-group mb-3">
            <label for="" class="form-lable">Full Name:</label>
            <input
              type="text"
              name=""
              id=""
              class="form-control form-control rounded-0"
              v-model="form.full_name"
            />
          </div>
  
          <div class="form-group mb-3">
            <label for="" class="form-lable">Address:</label>
            <input
              type="text"
              name=""
              id=""
              class="form-control form-control rounded-0"
              v-model="form.address"
            />
          </div>
  
          <div class="text-end">
            <button type="submit" class="btn btn-primary rounded-0">Submit</button>
          </div>
        </div>
      </div>
    </form>
  
    <!-- Reference to the off-canvas component -->
    <off-canvas-component ref="offCanvas" />
  
    <div class="mt-4">
      <button
        type="button"
        class="btn btn-primary position-relative rounded-0"
        data-bs-toggle="offcanvas"
        data-bs-target="#operatorOffcanvas"
        aria-controls="operatorOffcanvas"
        @click="resetNotificationCount">
        Inbox
        <!-- Notification badge -->
        <span
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          v-if="notificationCount > 0"
        >
          {{ notificationCount }}
          <span class="visually-hidden">unread messages</span>
        </span>
      </button>
    </div>
  
    <div class="card card-body shadow-0 rounded-0 border-0 mt-4">
      <div class="table-responsive">
        <table class="table table-bordered table-hover mb-0">
          <thead>
            <tr>
              <th class="table-header">TICKET ORDER</th>
              <th class="table-header">FULL NAME</th>
              <th class="table-header">ADDRESS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td class="table-data">{{ item.ticket_order }}</td>
              <td class="table-data">{{ item.full_name }}</td>
              <td class="table-data">{{ item.address }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import OffCanvasComponent from "./offcanvas/index.vue"; // Import the off-canvas component
  
  export default {
    components: {
      OffCanvasComponent,
    },
    data() {
      return {
        items: [],
        ticketCount: 1, // Initialize ticket counter
        form: {
          ticket_order: "",
          full_name: "",
          address: "",
        },
        notificationCount: 0, // Initialize notification count
      };
    },
    methods: {
      generateTicketNumber() {
        // Generate ticket number in the format TO#00001
        const ticketNumber = `TO#${String(this.ticketCount).padStart(5, "0")}`;
        this.ticketCount++; // Increment for the next ticket
        return ticketNumber;
      },
  
      // Reset notification count when inbox is opened
      resetNotificationCount() {
        this.notificationCount = 0;
      },
  
      async submit() {
        try {
          // Generate ticket number and assign it to the form
          this.form.ticket_order = this.generateTicketNumber();
  
          // Add the new ticket with ticket number to the items array
          this.items.push(Object.assign({}, this.form));
  
          // Clear form fields after submission
          this.form.full_name = "";
          this.form.address = "";
  
          // Show notification count after 2 seconds
          this.notificationCount++; // Increase notification count by 1
  
          // Trigger notification in off-canvas
          this.$refs.offCanvas.addNotification(
            `New ticket ${this.form.ticket_order} is submitted.`
          );
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .table-header {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 10px;
    background-color: #a200ff;
    color: #ffffff;
  }
  
  .table-data {
    font-size: 0.70rem;
    font-weight: 400;
    padding: 10px;
  }
  </style>
  