<template>

    <div class="animate animate-fade-in">

        <div class="d-flex justify-content-between align-items-center">
            <p class="page-title mb-0">Ticket Lists</p>
        </div>

        <div class="mt-4">

            <div class="card card-body shadow-sm border-0 rounded-0">

                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="col-3">
                        <input
                            type="search"
                            class="form-control form-control-sm rounded-0"
                            placeholder="Type your search here">
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table table-bordered table-hover mb-0">
                        <thead>
                            <tr>
                                <th class="table-header">CLIENT NAME</th>
                                <th class="table-header">SUBJECT</th>
                                <th class="table-header">PRIORITY</th>
                                <th class="table-header">DESCRIPTION</th>
                                <th class="table-header">STATUS</th>
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
            isLoading: false,

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
                this.isLoading = true;
                setTimeout(async () => {

                    const response = await apiClient.get('/ticketAssigned');
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
.pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    font-size: 14px;
}

.entries-info {
    color: #666;
}

.pagination-buttons {
    display: flex;
    gap: 5px;
}

.pagination-buttons button {
    background: white;
    border: 1px solid #ddd;
    padding: 6px 10px;
    cursor: pointer;
    transition: 0.3s;
}

.pagination-buttons button:hover {
    background: #f0f0f0;
}

.pagination-buttons button.active {
    background: #a200ff;
    color: white;
    border-color: #a200ff;
}

.pagination-buttons button:disabled {
    background: #eee;
    cursor: not-allowed;
}
</style>