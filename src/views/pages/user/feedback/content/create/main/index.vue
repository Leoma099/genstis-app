<template>

    <div class="card card-body shadow-sm rounded-0 border-0 mx-auto col-md-4">

        <form @submit.prevent="submit()">

            <div class="form-group mb-3">
                <label for="" class="form-label">Deparment</label>
                <input
                    type="text"
                    class="form-control form-control-sm rounded-0"
                    :value="form.ticket_order"
                    readonly>
            </div>

            <div class="form-group mb-3">
                <label for="" class="form-label">Subject</label>
                <input type="text" class="form-control form-control-sm rounded-0" readonly>
            </div>

            <div class="form-group mb-3">
                <label for="" class="form-label">Priority Level</label>
                <input type="text" class="form-control form-control-sm rounded-0" readonly>
            </div>

            <div class="form-group mb-3">
                <label for="" class="form-label">Status</label>
                <input type="text" class="form-control form-control-sm rounded-0" readonly>
            </div>

            <div class="form-group mb-3">
                <label for="" class="form-label">Assigned By</label>
                <input type="text" class="form-control form-control-sm rounded-0" readonly>
            </div>

            <div class="form-group mb-3">
                <label for="" class="form-label">Reuqest Date</label>
                <input type="text" class="form-control form-control-sm rounded-0" readonly>
            </div>

            <div class="form-group mb-3">
                <label for="" class="form-label">Completed Date</label>
                <input type="text" class="form-control form-control-sm rounded-0" readonly>
            </div>

            <div class="form-group mb-3">
                <label for="" class="form-label">Comment</label>
                <textarea name="" id="" cols="30" rows="5" class="form-control form-control-sm"></textarea>
            </div>

            <div class="text-end">
                <button type="submit" class="btn btn-sm btn-primary rounded-0">
                    Submit
                </button>
            </div>

        </form>

    </div>

</template>

<script>
import apiClient from "@/services/authorization"
export default
{
    data()
    {
        return{

            form:
            {
                ticket_order: "",
                department: "",
                subject: "",
                priority_level: "",
                status: "",
                assigned_by: "",
                request_date: "",
                completed_date: "",
            },
            feedbacks: [],

        }
    },

    mounted()
    {
        this.fetchDate()
    },

    methods:
    {
        async fetchDate()
        {
            try
            {
                const response = await apiClient.get('/ticket');
                this.form = response.data;
                console.log("Fetched date successfully:", response.data);
            }
            catch(error)
            {
                console.error("Error occured:", error)
            }
        },

        async submit()
        {
            try
            {
                const response = await apiClient.post('/feedback');
                this.feedbacks = response.data;
            }
            catch(error)
            {
                console.log("Error occured:", error);
            }
        }
    }
}
</script>

<style>

</style>