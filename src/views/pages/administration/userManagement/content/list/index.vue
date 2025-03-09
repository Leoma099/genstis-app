<template>

    <div class="animate animate-fade-in">

        <div class="d-flex justify-content-between align-items-center">
            <p class="page-title mb-0">User Account List</p>
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
                                <th class="table-header">FULL NAME</th>
                                <th class="table-header">EMAIL</th>
                                <th class="table-header">MOBILE NUMBER</th>
                                <th class="table-header">ROLE</th>
                                <th class="table-header">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <item-component
                                v-for="(item, index) in items"
                                :key="index"
                                :item="item" />
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
                const response = await apiClient.get('/account');
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
    background: #007bff;
    color: white;
    border-color: #007bff;
}

.pagination-buttons button:disabled {
    background: #eee;
    cursor: not-allowed;
}
</style>