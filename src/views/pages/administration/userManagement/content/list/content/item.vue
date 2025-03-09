<template>
    <tr>
        <td class="table-data">{{ item.full_name }}</td>
        <td class="table-data">{{ item.email }}</td>
        <td class="table-data">{{ item.mobile_number }}</td>
        <td class="table-data">{{ formatRole(item.user.role) }}</td>
        <td class="table-data">
            <router-link
                :to="`/administration/user-management/${item.id}`"
                class="btn btn-outline-info btn-sm me-2">
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
        item: Object,
    },
    
    mounted()
    {
        this.toast = useToast();
    },

    methods:
    {
        formatRole(role)
        {
            if(role === 1)
            {
                return "Admin"
            }
            else if(role === 2)
            {
                return "Staff"
            }
            else if(role === 3)
            {
                return "User"
            }
            else
            {
                return "n/a"
            }
        },

        async deleteAccount()
        {
            if(!confirm("Are you sure you want to delete this account?"))
            {
                return;
            }

            try
            {
                await apiClient.delete(`account/${this.item.id}`);
                this.toast.success("User account deleted successfully!");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            catch(error)
            {
                console.error("Error deleting account:", error);
                this.toast.error("User account deleted unsuccessfully!");
            }
        },
    }
}
</script>

<style scoped>
.table-header {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 10px;
    background-color: #2369c1;
    color: #ffffff;
}
</style>