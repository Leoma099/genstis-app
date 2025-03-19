<template>

    <p class="page-title mb-0">Feedback</p>



    <div class="card card-body shadow-sm rounded-0 border-0 mt-4">

        <div class="table-responsive">
            <table class="table table-bordered table-hover mb-0">
                <thead>
                    <tr>
                        <th class="table-header">TICKET ORDER</th>
                        <th class="table-header">DEPARTMENT</th>
                        <th class="table-header">SUBJECT</th>
                        <th class="table-header">PRIORITY LEVEL</th>
                        <th class="table-header">STATUS</th>
                        <th class="table-header">ASIGNEE</th>
                        <th class="table-header">REQUEST DATE</th>
                        <th class="table-header">COMPLETED DATE</th>
                        <th class="table-header">ACTION</th>
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
        this.fetchTickets();
    },

    methods:
    {
        async fetchTickets()
        {
            try
            {
                const response = await apiClient.get('/ticket');
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
    font-weight: 600;
    font-size: 1.5rem;
    color: #a200ff;
}
.table-header
{
    font-size: 0.85rem;
    font-weight: 600;
    padding: 10px;
    background-color: #a200ff;
    color: #ffffff;
}
</style>