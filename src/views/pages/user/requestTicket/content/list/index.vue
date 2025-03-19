<template>
    <div class="d-flex justify-content-between align-items-center">
        <p class="page-title mb-0">My Tickets</p>
    </div>

    <div class="mt-4">
        <div class="card card-body shadow-sm border-0 rounded-0">

            <div class="d-flex justify-content-between align-items mb-3">
                 <div>
                    <router-link to="/user/request-ticket/create" class="btn rounded-0 button-color">Request Ticket</router-link>
                 </div>
                 <div class="col-md-4">
                    <input type="text" class="form-control form-control-sm rounded-0" placeholder="Type your search here">
                 </div>
            </div>

            <div class="table-responsive">
                <table class="table table-bordered table-hover mb-0">
                    <thead>
                        <tr>
                            <th class="table-header">TICKET ORDER</th>
                            <th class="table-header">SUBJECT</th>
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
                            :item="item"/>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import apiClient from "@/services/authorization";
import ItemComponent from "./content/item.vue"
export default {
    data() {
        return {
            items: [],
        };
    },

    components:
    {
        ItemComponent,
    },

    mounted() {
        this.fetchTickets();
    },

    methods: {
        async fetchTickets() {
            try {
                const response = await apiClient.get('/ticket');
                this.items = response.data;
                console.log("Tickets fetched successfully:", response.data);
            } catch (error) {
                console.error("Failed to fetch tickets:", error);
            }
        },
    },
};
</script>

<style scoped>
.page-title {
    font-weight: 600;
    font-size: 1.5rem;
    color: #a200ff;
}
.button-color {
    background-color: #a200ff;
    color: #ffffff;
}
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
