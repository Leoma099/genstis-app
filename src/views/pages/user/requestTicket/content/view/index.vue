<template>

    <h1 class="page-title mb-0">View List</h1>
    <router-link
        :to="'/user/request-ticket'">
        Go back to page
    </router-link>

    <div class="mt-4 col-4 mx-auto">
        <div class="card card-body shadow-sm rounded-0 border-0">
            <h2>REASON TO DECLINE:</h2>
            <textarea
                class="form-control form-control-sm rounded-0"
                rows="10"
                :value="item.reason"
                readonly>
            </textarea>
        </div>
    </div>

</template>

<script>
import apiClient from '@/services/authorization';

export default
{
    data()
    {
        return{
            item: {}
        }
    },

    mounted()
    {
        this.fetchTicketData();
    },

    methods:
    {
        async fetchTicketData()
        {
            try
            {
                const ticketResponse = await apiClient.get(`/ticket/${this.$route.params.id}`);
                this.item = ticketResponse.data;
                console.log("Fetched borrow:", ticketResponse.data);
            }
            catch(error)
            {
                console.error("Error occured:", error);
            }
        }
    }
}
</script>

<style scoped>
.page-title {
    color: #007bff;
}
</style>