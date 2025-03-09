<template>
  
    <div class="card card-body shadow-sm border-0 rounded-0">
        <p class="page-title mb-3">Users</p>

        <div class="activity-list">

            <div class="table-responsive">
                <table class="table table-bordered table-hover mb-0">
                    <thead>
                        <tr>
                            <th class="table-header">USERNAME</th>
                            <th class="table-header">EMAIL</th>
                            <th class="table-header">MOBILE NUMBER</th>
                        </tr>
                    </thead>
                    <tbody v-if="!isEmpty">
                        <tr v-for="(item, index) in items" :key="index">
                            <td>{{ item.user.username }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.mobile_number }}</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="8" class="text-center">No Data Record</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    </div>

</template>

<script>
import apiClient from "@/services/authorization";
export default
{
    data()
    {
        return{
            isEmpty: false,
            items: [],
        }
    },

    mounted()
    {
        this.fetchAccount();
    },

    methods:
    {
        async fetchAccount() {
    try {
        const response = await apiClient.get('/account');
        
        // Make sure the latest users are on top (newest first)
        const sortedData = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        // Keep only the top 6
        this.items = sortedData.slice(0, 5);
        this.isEmpty = this.items.length === 0;

        console.log("Fetch account successfully:", this.items);
    } catch (error) {
        console.error("Fetch account failed:", error);
    }
}

    }
}
</script>

<style scoped>
.activity-list {
    height: auto;
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
</style>