<template>

    <div class="animate animate-fade-in">

        <div class="d-flex justify-content-between align-items-center">
            <h1 class="page-title mb-0">Ticket List</h1>
            
        </div>

        <div class="mt-4">

            <div class="card card-body shadow-sm border-0 rounded-0">

                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <router-link
                            :to="'/administration/ticket-management/create'"
                            class="btn rounded-0 button-color">
                            Create New Ticket
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <input type="text" v-model="searchQuery" @input="fetchTickets" placeholder="Type your search here"
                            class="form-control rounded-0">
                    </div>
                </div>

                <div class="table-responsive table-scrollable">
                    <table class="table table-bordered table-hover mb-0">
                        <thead>
                            <tr>
                                <th class="table-header">TICKET ORDER</th>
                                <th class="table-header">CLIENT NAME</th>
                                <th class="table-header">DEPARTMENT</th>
                                <th class="table-header">SUBJECT</th>
                                <th class="table-header">PRIORITY</th>
                                <th class="table-header">ASSIGNEE</th>
                                <th class="table-header">STATUS</th>
                                <th class="table-header">REQUEST DATE</th>
                                <th class="table-header">COMPLETED DATE</th>
                                <th class="table-header">ACTION</th>
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

        <reason-modal :selectedItem="selectedItem" :updateItem="updateItem" :selectItem="selectItem"/>
        <reason-view-modal :selectedItem="selectedItem" :updateItem="updateItem" :selectItem="selectItem"/>
    </div>

</template>

<script>
import apiClient from "@/services/authorization";
import ItemComponent from "./content/item.vue";

import ReasonModal from './content/components/reason';
import ReasonViewModal from './content/components/reason-view.vue';
export default
{

    data()
    {
        return{
            reasonModal: false,

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

        ReasonModal,
        ReasonViewModal
    },

    mounted()
    {
        this.fetchTickets();
    },

    computed:
    {
        hasSelectedItem()
        {
            return Object.keys(this.selectedItem).length > 0;
        }
    },

    methods:
    {
        async fetchTickets()
        {
            try
            {
                this.isLoading = true;
                setTimeout(async () => {

                    const response = await apiClient.get('/ticket', {
                        params:
                        {
                            search: this.searchQuery,
                            page: this.currentPage,
                            perPage: this.perPage
                        }
                    });
                    this.items = response.data;
                    console.log("Fetch ticket successfully:", response.data);

                    this.isLoading = false;

                }, 1000);
            }
            catch(error)
            {
                console.error("Fetch ticket failed:", error)
            }
        },

        selectItem(item)
        {
            this.selectedItem = item;
        },

        updateItem(updatedData)
        {
            const ticket = this.items.find(row => row.id == this.selectedItem.id);

            ticket.approval_status = updatedData.approval_status;
            ticket.approved_by = updatedData.approved_by;
            ticket.approved_date = updatedData.approved_date;
        }
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