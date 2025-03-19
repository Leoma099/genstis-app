<template>
    <div class="card card-body shadow-sm border-0 rounded-0">
        <p>Team Members</p>

        <div class="table-responsive">
            <table class="table table-bordered table-hover mb-0">
                <thead>
                    <tr>
                        <th class="table-header">MEMBER NAME</th>
                        <th class="table-header">TOTAL ASSIGNED</th>
                        <th class="table-header">TOTAL RESOLVED</th>
                    </tr>
                </thead>
                <tbody v-if="!isEmpty">
                    <tr v-for="(staff, index) in staffList" :key="index">
                        <td>{{ staff.full_name }}</td>
                        <td>{{ staff.assigned }}</td>
                        <td>{{ staff.resolved }}</td>
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
</template>

<script>
import apiClient from "@/services/authorization";

export default {
    data() {
        return {
            staffList: [],
            isEmpty: true,
        };
    },
    created() {
        this.loadStaff();
    },
    methods: {
        async loadStaff() {
            try {
                const response = await apiClient.get("/staff-accounts");
                this.staffList = response.data;
                this.isEmpty = this.staffList.length === 0;
            } catch (error) {
                console.error("Error fetching staff:", error);
            }
        },
    },
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