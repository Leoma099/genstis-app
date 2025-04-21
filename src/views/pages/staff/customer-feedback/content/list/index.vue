<template>

    <div class="animate animate-fade-in">
        
        <h1 class="page-title mb-0">List of Customer Feedback</h1>

        <div class="mt-4">

            <div class="card card-body shadow-sm border-0 rounded-0">

                <div class="d-flex justify-content-end align-items-center mb-3">

                    <div class="col-md-4">
                        <input type="text" v-model="searchQuery" @input="fetchFeedback" placeholder="Type your search here"
                            class="form-control rounded-0">
                    </div>

                </div>

                <div class="table-responsive table-scrollable">
                    <table class="table table-bordered table-hover mb-0">
                        <thead>
                            <tr>
                                <th class="table-header">TICKET ORDER</th>
                                <th class="table-header">CLIENT NAME</th>
                                <th class="table-header">ASSIGNED BY</th>
                                <th class="table-header">COMPLETED DATE</th>
                                <th class="table-header">TIME</th>
                                <th class="table-header">SCORE</th>
                                <th class="table-header">COMMENT</th>
                            </tr>
                        </thead>
                        <tbody v-if="!isEmpty">
                            <item-component
                             v-for="(item, index) in items"
                             :key="index"
                             :item="item"
                             :isLoading="isLoading"
                             :selectItem="selectItem"
                             :updateItem="updateItem"/>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="8" class="text-center">No Data Record</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- Pagination is here -->
                <div class="pagination-container">
                    <div class="entries-info">
                        Showing {{ (currentPage - 1) * perPage + 1 }} to {{ currentPage * perPage }} of {{ items.length }} records
                    </div>
                    <div class="pagination-buttons">
                        <!-- Pagination buttons here -->
                    </div>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
import apiClient from "@/services/authorization";
import ItemComponent from "./content/item.vue";
export default
{
    
    data()
    {
        return{

            items:[],
            searchQuery: "",
            isEmpty: false,
            perPage: 10,
            currentPage: 1,
            ticketCount: 1, // Initialize ticket counter
            selectedItem: {},

        }
    },

    components:
    {
        ItemComponent,
    },

    mounted()
    {
        this.fetchFeedback();
    },

    methods:
    {
        async fetchFeedback()
        {
            this.isEmpty = false;

            try
            {
                setTimeout(async () => {

                    const response = await apiClient.get('/customer-feedback', {
                        params:
                        {
                            search: this.searchQuery,
                            page: this.currentPage,
                            perPage: this.perPage
                        }
                    });
                    this.items = response.data;

                    this.isEmpty = this.items.length === 0;

                }, 1000);
            }
            catch(error)
            {
                console.error("Fetch ticket failed:", error);
                this.isEmpty = true;
            }
        },
    }
}
</script>

<style scoped>
.animate
{
    animation-duration: 1s;
    animation-fill-mode: none;
}
.animate-fade-in
{
    animation-name: fadeIn;
}

@keyframes fadeIn{
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}
.page-title {
    color: #007bff;
}
.button-color {
    background-color: #007bff;
    color: #ffffff;
}
.table-header {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 10px;
    background-color: #007bff;
    color: #ffffff;
}
.table-data {
    font-size: 0.70rem;
    font-weight: 400;
    padding: 10px;
}
.pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    font-size: 14px;
}
.table-scrollable
{
    max-height: 500px;
    overflow: hidden; /* Hidden by default */
}
.table-scrollable:hover
{
    overflow-y: auto; /* Show scrollbar when hovering */
}
</style>