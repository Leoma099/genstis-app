<template>
    <div class="card card-body shadow-sm rounded-0 border-0">
        <div class="table-responsive">
            <table class="table table-bordered table-hover mb-0">
                <thead>
                    <tr>
                        <th class="table-header">STAFF NAME</th>
                        <th class="table-header">EMAIL</th>
                        <th class="table-header">MOBILE NUMBER</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                        <td>{{ item.full_name }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.mobile_number }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import apiClient from "@/services/authorization";
export default
{
    data()
    {
        return {
            items: [] // Store fetched staff accounts
        };
    },

    methods:
    {
        async fetchStaffData()
        {
            try
            {
                const response = await apiClient.get('/get-staff'); // Adjust API route if needed
                this.items = response.data;
            }
            catch (error)
            {
                console.error('Error fetching staff data:', error);
            }
        }
    },

    mounted()
    {
        this.fetchStaffData(); // Fetch data when component is mounted
    }
};
</script>

<style scoped>
.table-header {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 10px;
    background-color: #a200ff;
    color: #ffffff;
}
</style>
