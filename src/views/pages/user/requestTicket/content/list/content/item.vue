<template>
    <tr>
        <td class="table-data">{{ item.ticket_order }}</td>
        <td class="table-data">{{ formatDepartment(item.department) }}</td>
        <td class="table-data">{{ formatSubject(item.subject) }}</td>
        <td class="table-data">{{ formatAsignee(item.assigned_by) }}</td>
        <td class="table-data">
            <span :class="formatStatus(item.status).badgeClass">
                {{ formatStatus(item.status).label }}
            </span>
        </td>
        <td class="table-data">{{ formatDate(item.created_at) }}</td>
        <td class="table-data">{{ formatDate(item.completed_at) }}</td>
    </tr>
</template>

<script>
import apiClient from "@/services/authorization"
import { useToast } from "vue-toastification";
export default
{
    data()
    {
        return {
            staffs: [] // Initialize as an empty array
        };
    },

    props:
    {
        item: Object
    },

    mounted()
    {
        console.log("Item Data:", this.item); // Debugging: Check API response in console
        this.toast = useToast();
        this.fetchStaffs();
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

        formatDepartment(department)
        {
            const departments =
            {
                1: "CBA - College of Business and Administration",
                2: "CASED - College of Arts and Science Education",
                3: "Registrar",
                4: "Payroll",
                5: "Accounting Finance",
                6: "Quality Assurance",
                7: "AASS",
                8: "HR - Human Resource",
                9: "MIS Office",
                10: "Rikdo Office",
                11: "Graduate School",
                12: "Museum",
                13: "Library",
                14: "Sewing",
                15: "Principal Office",
                16: "CESO Office",
                17: "Cashier",
                18: "CCS - College of Computer Studies",
            };
            return departments[department] || "N/A";
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

        formatStatus(status)
        {
            const statuses =
            {
                1: { label: "Pending", badgeClass: "badge text-bg-light" },  // Yellow
                2: { label: "In-Progress", badgeClass: "badge text-bg-primary" }, // Blue
                3: { label: "Resolved", badgeClass: "badge text-bg-success" }, // Green
                4: { label: "Unresolved", badgeClass: "badge text-bg-danger" } // Red
            };
            return statuses[status] || { label: "n/a", badgeClass: "badge bg-secondary" };
        },

        formatAsignee(staffId)
        {
            // Find the staff member whose ID matches the assigned_by ID
            const staff = this.staffs.find(staff => staff.id === staffId);
            return staff ? staff.full_name : "N/A";  // If a match is found, return the staff's full name, otherwise return "N/A"
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

        async fetchStaffs()
        {

            try
            {
                const response = await apiClient.get("/get-staff");
                this.staffs = response.data;  // Assign the response data directly to `staffs`
                console.log(this.staffs);  // Log the fetched staff data to check
            }
            catch(error)
            {
                console.error("Error fetching staffs:", error);
            }
        }
    }
};
</script>

<style scoped>
.table-header {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 10px;
    background-color: #2369c1;
    color: #ffffff;
}
.shimmer-loader {
    height: 16px;
    width: 100%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite linear;
    border-radius: 4px;
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }

    100% {
        background-position: 200% 0;
    }
}
</style>
