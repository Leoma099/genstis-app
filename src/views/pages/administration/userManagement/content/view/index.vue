<template>

    <p class="page-title mb-0">View User Account</p>
    <small>
        <router-link
            :to="'/administration/user-management'">
            Go back to page
        </router-link>
    </small>

    <div class="col-8 a mx-auto mt-3">

        <div class="row">

            <div class="col-md-4">
                <div class="card card-body shadow-sm border-0 rounded-0">

                    <div class="mb-3">
                        <img :src="userPhoto" class="img-fluid" alt="">
                    </div>

                    <div>
                        <div class="d-flex justify-content-between align-items">
                            <div>
                                <p class="mb-0"><strong>Full Name:</strong></p>
                            </div>
                            <div>
                                <p class="mb-0">{{ item.full_name }}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="d-flex justify-content-between align-items">
                            <div>
                                <p class="mb-0"><strong>Username:</strong></p>
                            </div>
                            <div>
                                <p class="mb-0">{{ item.user?.username }}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="d-flex justify-content-between align-items">
                            <div>
                                <p class="mb-0"><strong>Email:</strong></p>
                            </div>
                            <div>
                                <p class="mb-0">{{ item.email }}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="d-flex justify-content-between align-items">
                            <div>
                                <p class="mb-0"><strong>Mobile Number:</strong></p>
                            </div>
                            <div>
                                <p class="mb-0">{{ item.mobile_number }}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="d-flex justify-content-between align-items">
                            <div>
                                <p class="mb-0"><strong>Birthdate:</strong></p>
                            </div>
                            <div>
                                <p class="mb-0">{{ formatDate(item.date_of_birth) }}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="d-flex justify-content-between align-items">
                            <div>
                                <p class="mb-0"><strong>Role:</strong></p>
                            </div>
                            <div>
                                <p class="mb-0">{{ formatRole(item.user?.role) }}</p>
                            </div>
                        </div>
                    </div>

                    <router-link
                        :to="`/administration/user-management/${this.$route.params.id}/edit`"
                        class="btn btn-sm btn-outline-warning rounded-0 mt-3">
                        UPDATE
                    </router-link>

                </div>
            </div>

            <div class="col-md-8">
                <div class="card card-body shadow-sm border-0 rounded-0">
                    <p class="mb-0"><strong>Activities</strong></p>

                    <div v-if="item.tickets && item.tickets.length" class="mt-3">
                        <div
                            v-for="ticket in item.tickets"
                            :key="ticket.id"
                            class="d-flex justify-content-between align-items-center border-bottom py-2"
                        >
                            <p class="mb-0">
                                Submitted a ticket: <strong>{{ ticket.subject }}</strong>
                            </p>
                            <small class="text-muted">{{ timeAgo(ticket.created_at) }}</small>
                        </div>
                    </div>

                    <p v-else class="text-muted mt-3 text-center">No submitted tickets yet.</p>
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
    font-weight: 600;
    font-size: 1.5rem;
    color: #a200ff;
}
</style>