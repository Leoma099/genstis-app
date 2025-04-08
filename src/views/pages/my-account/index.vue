<template>
    <h1 class="page-title mb-0">Profile Account</h1>

    <div class="mt-3">

        <div class="row">

            <div class="col-md-4">
                <div class="card card-body shadow-sm border-0 rounded-0">

                    <div class="mb-3">
                        <div v-if="user.photo">
                            <img :src="userPhoto" class="img-fluid" alt="">
                        </div>
                    </div>

                </div>
            </div>

            <div class="col-md-8">
                <div class="card card-body shadow-sm border-0 rounded-0">

                    <div class="row">

                        <div class="col-md-6">

                            <h3 class="page-title">Account Info</h3>

                            <p><strong class="me-3">Full name:</strong>{{ user.full_name }}</p>
                            <p><strong class="me-3">Email Address:</strong>{{ user.email }}</p>
                            <p><strong class="me-3">Department:</strong>{{ user.department }}</p>
                            <p><strong class="me-3">Position:</strong>{{ user.position }}</p>
                            <p><strong class="me-3">Address:</strong>{{ user.address }}</p>
                            <p><strong class="me-3">Mobile Number:</strong>{{ user.mobile_number }}</p>
                            <p><strong class="me-3">Date of Birth:</strong>{{ user.date_of_birth }}</p>

                        </div>

                        <div class="col-md-6">

                            <h3 class="page-title">System Info</h3>

                            <p><strong class="me-3">Username:</strong>{{ user.username }}</p>
                            <p><strong class="me-3">Role:</strong>{{ formatRole(user.role) }}</p>

                        </div>

                    </div>

                </div>
            </div>

        </div>

    </div>
</template>
  
<script>
export default
{
    data()
    {
        return {
            user: null, // Holds user data
        };
    },

    computed:
    {
        // User's photo URL or fallback to default image
        userPhoto() {
        if (this.user && this.user.photo) {
            return `http://127.0.0.1:8000/storage/${this.user.photo}`;
        }
        return 'https://www.example.com/default-profile-image.png';
        },
    },

    created()
    {
        this.fetchUserData(); // Fetch user data when the component is created
    },

    methods:
    {
        fetchUserData()
        {
            // This method could fetch the user's data either from the backend API or from localStorage
            const user = {
                full_name: localStorage.getItem('full_name'),
                email: localStorage.getItem('email'),
                department: localStorage.getItem('department'),
                position: localStorage.getItem('position'),
                address: localStorage.getItem('address'),
                mobile_number: localStorage.getItem('mobile_number'),
                date_of_birth: localStorage.getItem('date_of_birth'),
                username: localStorage.getItem('username'),
                role: localStorage.getItem('role'),

                photo: localStorage.getItem('photo'),
            };

            if (user.full_name)
            {
                this.user = user;
            }
        },

        formatRole(role)
        {
            switch (parseInt(role))
            {
                case 1: return 'Admin';
                case 2: return 'Staff';
                case 3: return 'Client';
                default: return 'Unknown';
            }
        }
    },
};
</script>

<style scoped>
.page-title
{
    color: #a200ff;
}
</style>
  