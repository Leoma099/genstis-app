<template>

    <div class="sidebar" id="sidebar" >

        <div class="sidebar-logo">

            <img src="/assets//images/gensts-ccs.png" alt="">

        </div>

        <ul class="sidebar-nav">

            <admin-account v-if="role === 1"/>

            <staff-account v-if="role === 2"/>

            <user-account v-if="role === 3"/>

            <li>
                <a @click="logout"><i class="bx bxs-log-out me-2"></i>Logout</a>
            </li>

        </ul>

    </div>

</template>

<script>
import AdminAccount from "./content/admin.vue";
import StaffAccount from "./content/staff.vue";
import UserAccount from "./content/user.vue";
import { useToast } from "vue-toastification";
export default
{
    components:
    {
        AdminAccount,
        StaffAccount,
        UserAccount
    },

    data()
    {
        return{
            role: parseInt(localStorage.getItem('role')) || 0,
        }
    },

    mounted()
    {
        this.toast = useToast()
    },

    methods:
    {

        logout()
        {
            // Clear the localStorage
            localStorage.removeItem('role');
            localStorage.removeItem('access_token');
            localStorage.removeItem('full_name');
            localStorage.removeItem('school_number');
            localStorage.removeItem('account_id');
            localStorage.removeItem('photo');
            localStorage.removeItem('user_id');

            // Show the toast first
            this.toast.success("Logged out successfully!");

            // Redirect after short delay to allow the toast to show
            setTimeout(() => {
                window.location.href = '/signin';
            }, 1000); // 1 second delay (adjust if needed)
        }


    }
}
</script>

<style>

</style>