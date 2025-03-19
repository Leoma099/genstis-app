<template>
    <tr>
        <td class="table-data">{{ item.ticket_order }}</td>
        <td class="table-data">{{ formatSubject(item.subject) }}</td>
        <td class="table-data">{{ formatStatus(item.status) }}</td>
        <td class="table-data">{{ formatAsignee(item.assigned_by) }}</td>
        <td class="table-data">{{ formatDate(item.created_at) }}</td>
        <td class="table-data">{{ formatDate(item.completed_at) }}</td>
        <td class="table-data">
            <router-link
                :to="`/user/request-ticket/${item?.id}`"
                class="btn btn-sm btn-outline-info me-3">
                <i class="bx bx-show"></i>
            </router-link>
            <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="deleteAccount()">
                <i class="bx bx-trash"></i>
            </button>
        </td>
    </tr>
</template>

<script>
import apiClient from "@/services/authorization"
import { useToast } from "vue-toastification";
export default
{
    props:
    {
        item: Object
    },

    mounted()
    {
        console.log("Item Data:", this.item); // Debugging: Check API response in console
        this.toast = useToast();
    },

    methods:
    {
        formatDate(date)
        {
            if (!date) return "N/A";

            return new Date(date).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
            })
        },

        formatSubject(subject) {
            const subjects = {
                1: "Desktop Computer",
                2: "Laptop Computer",
                3: "Printer Services",
                4: "Software Installation",
                5: "Internet Connection",
                6: "Wireless Connection",
                7: "New User (Microsoft Account)",
                8: "Login Issues",
                9: "Other"
            };
            return subjects[subject] || "N/A";
        },

        formatStatus(status) {
            const statuses = {
                1: "Pending",
                2: "In-Progress",
                3: "Resolved",
                4: "Unresolved"
            };
            return statuses[status] || "N/A";
        },

        formatAsignee(assigned_by) {
            if (!assigned_by) return "N/A"; // Handle null/undefined

            const assignedByNumber = Number(assigned_by); // Ensure it's a number
            const assignees = {
                1: "Robert John Javani Minimo",
                2: "Jacob R Canlas",
                3: "Jeryc Erjy Mapilisan"
            };
            return assignees[assignedByNumber] || "N/A";
        },

        async deleteAccount()
        {
            if(!confirm("Are you sure you want to delete this account?"))
            {
                return;
            }

            try
            {
                await apiClient.delete(`ticket/${this.item.id}`);
                this.toast.success("Request ticket deleted successfully!");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            catch(error)
            {
                console.error("Error deleting account:", error);
                this.toast.error("Request ticket deleted unsuccessfully!");
            }
        },
    }
};
</script>

<style scoped>
.table-data {
    font-size: 0.85rem;
    font-weight: 400;
    padding: 10px;
}
</style>
