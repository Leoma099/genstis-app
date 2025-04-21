<template>

    <h1 class="page-title mb-0">View User Account</h1>
    <small>
        <router-link
            :to="'/administration/user-management'">
            Go back to page
        </router-link>
    </small>

    <div class="mt-3">

        <div class="row">

            <div class="col-md-4">
                <div class="card card-body shadow-sm border-0 rounded-0">

                    <div class="mb-3">
                        <img :src="userPhoto" class="img-fluid" alt="">
                    </div>

                </div>
            </div>

            <div class="col-md-8">
                <div class="card card-body shadow-sm border-0 rounded-0">

                    <div class="row">

                        <div class="col-md-6">

                            <h3 class="page-title">Account Info</h3>

                            <p><strong class="me-3">Full name:</strong>{{ item.full_name }}</p>
                            <p><strong class="me-3">Email Address:</strong>{{ item.email }}</p>
                            <p><strong class="me-3">Department:</strong>{{ formatDepartment(item.department) }}</p>
                            <p><strong class="me-3">Position:</strong>{{ item.position }}</p>
                            <p><strong class="me-3">Address:</strong>{{ item.address }}</p>
                            <p><strong class="me-3">Mobile Number:</strong>{{ item.mobile_number }}</p>
                            <p><strong class="me-3">Date of Birth:</strong>{{ item.date_of_birth }}</p>

                        </div>

                        <div class="col-md-6">

                            <h3 class="page-title">System Info</h3>

                            <p><strong class="me-3">Username:</strong>{{ item.user?.username }}</p>
                            <p><strong class="me-3">Role:</strong>{{ formatRole(item.user?.role) }}</p>

                        </div>

                    </div>

                </div>
                <div class="text-end">
                    <router-link
                        :to="`/administration/user-management/${this.$route.params.id}/edit`"
                        class="btn btn-sm btn-warning rounded-0 mt-3">
                        UPDATE
                    </router-link>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
import apiClient from "@/services/authorization";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export default
{
    data()
    {
        return{
            item: {}
        }
    },

    computed:
    {
        userPhoto() {
            if (this.item && this.item.photo) {
                return `http://127.0.0.1:8000/storage/${this.item.photo}`;
            }
            return 'https://www.example.com/default-profile-image.png';
        }
    },

    mounted()
    {
        this.fetchAccountData();
    },

    methods:
    {
        getCurrentDate()
        {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        },

        async fetchAccountData()
        {
            try
            {
                const ticketResponse = await apiClient.get(`/account/${this.$route.params.id}`);
                this.item = ticketResponse.data;
                console.log("Fetched account:", ticketResponse.data);
            }
            catch(error)
            {
                console.error("Error occured:", error);
            }
        },

        formatRole(role)
        {
            switch (role)
            {
                case 1:
                    return "Admin";
                case 2:
                    return "Staff";
                case 3:
                    return "User";
                default:
                    return "Unknown";
            }
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

        formatDate(dateString)
        {
            if (!dateString) return '';
            const options = { year: 'numeric', month: 'long', day: '2-digit' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        },

        timeAgo(datetime)
        {
            return dayjs(datetime).fromNow();
        }
    }
}
</script>

<style scoped>
.page-title {
    color: #007bff;
}
</style>