<template>
    <div class="col-8 mx-auto">
      <form @submit.prevent="submit()">
        <div class="row">
          <div class="col-md-4">
            <div class="card card-body shadow-sm rounded-0 border-0">
              <h3>{{ form.ticket_order }}</h3>
  
              <div>
                <label class="form-label">* Assigned By:</label>
                <input
                  type="text"
                  class="form-control form-control-sm rounded-0"
                  :value="formatStaff(form.assigned_by)"
                  disabled
                />
              </div>
              <div>
                <label class="form-label">* Completed Date:</label>
                <input
                  type="text"
                  class="form-control form-control-sm rounded-0"
                  v-model="form.completed_date"
                  disabled
                />
              </div>
              <div>
                <label class="form-label">* Time:</label>
                <input
                  type="text"
                  class="form-control form-control-sm rounded-0"
                  v-model="form.completed_time"
                  disabled
                />
              </div>
            </div>
          </div>
  
          <div class="col-md-8">
            <div class="card card-body shadow-sm rounded-0 border-0">
              <div>
                <label class="form-label">* Rate:</label>
                <div class="d-flex align-items-center mb-2">
                  <i
                  v-for="star in 3"
                  :key="star"
                  class="bx"
                  :class="[
                    hoveredStar >= star || form.rate >= star
                      ? 'bxs-star text-warning'
                      : 'bx-star text-secondary'
                  ]"
                  style="font-size: 2rem; cursor: pointer; transition: color 0.2s;"
                  @mouseover="hoveredStar = star"
                  @mouseleave="hoveredStar = 0"
                  @click="form.rate === star ? form.rate = 0 : form.rate = star"
                  ></i>
                  <span class="ms-3 fs-6">{{ rateLabel }}</span>
                </div>
              </div>


  
              <div>
                <label class="form-label">* Comment:</label>
                <textarea
                  rows="10"
                  class="form-control form-control-sm rounded-0"
                  v-model="form.comment"
                  placeholder="Type your comment here"
                ></textarea>
              </div>
            </div>
  
            <div class="text-end mt-3">
              <button
                type="submit"
                class="btn btn-sm btn-warning rounded-0"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import apiClient from "@/services/authorization";
  
  export default {
    data() {
      return {
        form: {
          ticket_order: "",
          assigned_by: "",
          completed_date: "",
          completed_time: "",
          rate: "",
          comment: "",
          ticket_id: this.$route.query.id,
        },
        staffs: [],
        hoveredStar: 0,
      };
    },

    computed: {
      rateLabel() {
        switch (this.form.rate) {
          case 3:
            return "Excellent";
          case 2:
            return "Good";
          case 1:
            return "Bad";
          default:
            return "No rating selected";
        }
      },
    },

  
    mounted() {
      console.log("TICKET ID:", this.form.ticket_id);
      this.fetchTicketData();
      this.fetchStaffs();
      this.fetchUserDetails();
    },
  
    methods: {
      async fetchTicketData() {
        try {
          const response = await apiClient.get(`/ticket/${this.form.ticket_id}`);
          const ticket = response.data;
          console.log(response.data);
  
          this.form.ticket_order = ticket.ticket_order;
          this.form.assigned_by = ticket.assigned_by;
          this.form.completed_date = ticket.completed_date;
          this.form.completed_time = ticket.completed_time;
        } catch (error) {
          console.error("Failed to fetch ticket data:", error.response?.data || error.message);
        }
      },
  
      async fetchStaffs() {
        try {
          const response = await apiClient.get("/get-staff");
          this.staffs = response.data;
        } catch (error) {
          console.error("Error fetching staffs:", error);
        }
      },
  
      fetchUserDetails() {
        this.form.full_name = localStorage.getItem("full_name") || "";
        this.form.account_id = localStorage.getItem("user_id") || "";
      },
  
      formatStaff(staffId) {
        const staff = this.staffs.find((s) => s.id === staffId);
        return staff ? staff.full_name : "N/A";
      },
  
      async submit() {
        try {
          this.form.rate = parseInt(this.form.rate); // Convert rate to integer
  
          const response = await apiClient.post("/customer-feedback", this.form);
          console.log(response.data);
          alert("Feedback has been submitted");
          this.$router.push("/user/feedback");
        } catch (error) {
          console.error("Error submitting feedback:", error.response?.data || error.message);
          alert("Feedback has not been submitted");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* You can add styles here if needed */
  </style>
  