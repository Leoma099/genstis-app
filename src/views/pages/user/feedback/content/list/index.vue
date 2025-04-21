<template>

    <h1 class="page-title mb-0">Feedback</h1>



    <div class="card card-body shadow-sm rounded-0 border-0 mt-4">

        <div class="table-responsive">
            <table class="table table-bordered table-hover mb-0">
                <thead>
                    <tr>
                        <th class="table-header">TICKET ORDER</th>
                        <th class="table-header">ASSIGNED BY</th>
                        <th class="table-header">COMPLETED DATE</th>
                        <th class="table-header">TIME</th>
                        <th class="table-header">RATE</th>
                        <th class="table-header">COMMENT</th>
                    </tr>
                </thead>
                <tbody>
                    <item-component
                        v-for="(item, index) in items"
                        :key="index"
                        :item="item"
                        :isLoading="isLoading"/>
                </tbody>
            </table>
        </div>

    </div>

</template>

<script>
import apiClient from '@/services/authorization';
import ItemComponent from "./content/item.vue";
export default
{
    data()
    {
        return{
            items: [],
        }
    },

    components:
    {
        ItemComponent,
    },

    mounted()
    {
        this.fetchTicketFeedback();
    },

    methods:
    {
        async fetchTicketFeedback()
        {
            try
            {
                const response = await apiClient.get('/customer-feedback');
                this.items = response.data;
                console.log("Tickets fetched successfully:", response.data);
            }
            catch (error)
            {
                console.error("Failed to fetch tickets:", error);
            }
        },
    },
}
</script>

<style scoped>
.page-title
{
    color: #007bff;
}
.table-header
{
    font-size: 0.85rem;
    font-weight: 600;
    padding: 10px;
    background-color: #007bff;
    color: #ffffff;
}
</style>