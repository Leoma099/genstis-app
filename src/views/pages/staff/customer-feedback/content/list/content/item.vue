<template>
    <tr>
        <td>{{ item.ticket_order }}</td>
        <td>{{ item.full_name }}</td>
        <td>{{ formatAsignee(item.assigned_by) }}</td>
        <td>{{ item.completed_date }}</td>
        <td>{{ formatTime(item.completed_time) }}</td>
        <td>{{ formatRate(item.rate) }}</td>
        <td>{{ item.comment }}</td>
    </tr>
</template>

<script>
import apiClient from "@/services/authorization";
import { useToast } from "vue-toastification";
export default
{
    props:
    {
        item: Object,
    },

    data() {
        return {
            staffs: [] // ✅ TOUCHED: Define staffs array for storing fetched staff data
        };
    },

    mounted()
    {
        this.toast = useToast();
        this.fetchStaffs();
    },

    methods:
    {
        formatAsignee(staffId)
        {
            // Find the staff member whose ID matches the assigned_by ID
            const staff = this.staffs.find(staff => staff.id === staffId);
            return staff ? staff.full_name : "N/A";  // If a match is found, return the staff's full name, otherwise return "N/A"
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
        },

        formatRate(rate)
        {
            const rates = {
                1: "Excellent",
                2: "Great",
                3: "Good",
                4: "Neutral",
                5: "Bad",
            };
            return rates[rate] || "N/A";
        },

        formatTime(time)
        {
            // ✅ TOUCHED: Format time like "12:44 PM"
            const [hour, minute] = time.split(':');
            const date = new Date();
            date.setHours(hour, minute);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        },
    }
}
</script>

<style>

</style>