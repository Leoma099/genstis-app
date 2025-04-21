<template>

    <div class="animate animate-fade-in">

        <div class="d-flex justify-content-between align-items-center">
            <h1 class="page-title mb-0">User Account List</h1>
        </div>

        <div class="mt-4">

            <div class="card card-body shadow-sm border-0 rounded-0">

                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <router-link
                            :to="'/administration/user-management/create'"
                            class="btn rounded-0 button-color">
                            Create New User
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <input type="text" v-model="searchQuery" @input="fetchAccount" placeholder="Type your search here"
                            class="form-control rounded-0">
                    </div>
                </div>

                <div class="table-responsive table-scrollable">
                    <table class="table table-bordered table-hover mb-0">
                        <thead>
                            <tr>
                                <th class="table-header">FULL NAME</th>
                                <th class="table-header">EMAIL</th>
                                <th class="table-header">MOBILE NUMBER</th>
                                <th class="table-header">ROLE</th>
                                <th class="table-header">ACTION</th>
                            </tr>
                        </thead>
                        <tbody v-if="!isEmpty">
                            <item-component
                                v-for="(item, index) in items"
                                :key="index"
                                :item="item" />
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

        }
    },

    components:
    {
        ItemComponent,
    },

    mounted()
    {
        this.fetchAccount();
    },

    methods:
    {
        async fetchAccount()
        {
            try
            {
                const response = await apiClient.get('/account',
                    {
                        params:
                        {
                            search: this.searchQuery,
                            page: this.currentPage,
                            perPage: this.perPage
                        }
                    }
                );
                this.items = response.data;
                console.log("Fetch account successfully:", response.data);
            }
            catch(error)
            {
                console.error("Fetch account failed:", error)
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