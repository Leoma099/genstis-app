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
                                v-model="form.assigned_by ">
                        </div>
                        <div>
                            <label class="form-label">* Completed Date:</label>
                            <input
                                type="text"
                                class="form-control form-control-sm rounded-0"
                                v-model="form.completed_date">
                        </div>
                        <div>
                            <label class="form-label">* Time:</label>
                            <input
                                type="text"
                                class="form-control form-control-sm rounded-0"
                                v-model="form.completed_time">
                        </div>

                    </div>

                </div>

                <div class="col-md-8">

                    <div class="card card-body shadow-sm rounded-0 border-0">

                        <div>
                            <label class="form-label">* Rate:</label>
                            <select
                                class="form-select form-select-sm rounded-0" v-model="form.rate">
                                <option value="" selected disabled>--Select Rate--</option>
                                <option value="3">Excellent</option>
                                <option value="2">Great</option>
                                <option value="1">Good</option>
                            </select>
                        </div>

                        <div>
                            <label class="form-label">* Comment:</label>
                            <textarea
                                rows="10"
                                class="form-control form-control-sm rounded-0"
                                v-model="form.comment"
                                placeholder="Type your comment here">
                            </textarea>
                        </div>

                    </div>

                    <div class="text-end mt-3">
                        <button
                            type="submit"
                            class="btn btn-sm btn-warning rounded-0">
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
export default
{
    data()
    {
        return{
            form:
            {
                ticket_order: "",
                assigned_by: "",
                completed_date: "",
                completed_time: "",
                rate: "",
                comment: "",

                ticket_id: this.$route.query.id,
            }
        }
    },

    mounted()
    {
        console.log("TICKET ID:", this.form.ticket_id);
        this.fetchTicketData();
        this.fetchUserDetails();
    },

    methods:
    {
        async fetchTicketData()
        {
            try
            {
                const response = await apiClient.get(`/ticket/${this.form.ticket_id}`);
                const ticket = response.data;
                console.log(response.data);

                this.form.ticket_order = ticket.ticket_order;
                this.form.assigned_by = ticket.assigned_by;
                this.form.completed_date = ticket.completed_date;
                this.form.completed_time = ticket.completed_time;
            }
            catch (error)
            {
                console.error("Failed to fetch equipment data:", error.response?.data || error.message);
            }
        },

        fetchUserDetails()
        {
            this.form.full_name = localStorage.getItem("full_name") || "";
            this.form.account_id = localStorage.getItem("user_id") || "";
        },

        async submit()
        {
            try
            {
                const response = await apiClient.post("/customer-feedback", this.form);
                console.log(response.data);
                alert("Feedback has been submitted");
                this.$router.push("/user/feedback");
            }
            catch (error)
            {
                console.error("Error submitting customer feedback request:", error.response?.data || error.message);
                alert("Feedback has not been submitted");
            }
        }
    }
}
</script>

<style>

</style>