<template>
    <p class="page-title mb-0">My Account</p>

    <div class="col-8 a mx-auto mt-3">

        <div class="row">

            <div class="col-md-4">
                <div class="card card-body shadow-sm border-0 rounded-0">

                    <div class="mb-3">
                        <div v-if="user.photo">
                            <img :src="userPhoto" class="img-fluid" alt="">
                        </div>
                    </div>

                    <div>
                        <div class="d-flex justify-content-between align-items">
                            <div>
                                <p class="mb-0"><strong>Full Name:</strong></p>
                            </div>
                            <div>
                                <p class="mb-0">{{ user.full_name }}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="col-md-8">
                <div class="card card-body shadow-sm border-0 rounded-0">
                    <p class="mb-0"><strong>Activities</strong></p>
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
                photo: localStorage.getItem('photo'),
            };

            if (user.full_name)
            {
                this.user = user;
            }
        },
    },
};
</script>

<style scoped>
.page-title
{
    font-weight: 600;
    font-size: 1.5rem;
    color: #a200ff;
}
</style>
  