<template>
  
    <div class="mt-3 col-4 mx-auto">

        <div class="card card-body shadow-sm border-0 rounded-0">

            <!-- Show loading spinner if isLoading is true -->
            <div v-if="isLoading" class="loading-overlay">
                <div class="spinner"></div>
            </div>

            <form @submit.prevent="submit()">

                <div class="mb-3">

                <p><strong>PERSONAL ACCOUNT</strong></p>

                <div class="form-group mb-3">
                        <label class="form-label"><strong>* Full Name:</strong></label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            placeholder="ex. Juan Dela Cruz"
                            v-model="form.full_name" required>
                    </div>

                    <div class="form-group mb-3">
                        <label class="form-label"><strong>* Email:</strong></label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            placeholder="ex. juan_delacruz@gmail.com"
                            v-model="form.email" required>
                    </div>

                    <div class="form-group mb-3">
                        <label class="form-label"><strong>* Address:</strong></label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            placeholder="ex. Philippines"
                            v-model="form.address" required>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label class="form-label"><strong>* Date of Birth:</strong></label>
                                <input
                                    type="date"
                                    class="form-control form-control-sm rounded-0"
                                    v-model="form.date_of_birth" required>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label class="form-label"><strong>* Mobile Number:</strong></label>
                                <input
                                    type="text"
                                    class="form-control form-control-sm rounded-0"
                                    placeholder="ex. 09XXXXXXXXX"
                                    v-model="form.mobile_number" required>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="text-end">
                    <router-link :to="'/administration/user-management'" type="button" class="btn btn-secondary btn-sm rounded-0 me-3">Cancel</router-link>
                    <button
                        type="submit"
                        class="btn btn-primary btn-sm rounded-0">
                        Submit
                    </button>
                </div>

            </form>

        </div>

    </div>

</template>

<script>
import apiClient from "@/services/authorization";
import { useToast } from "vue-toastification";
export default
{
    data()
    {
        return{

            form:
            {
                full_name: "",
                address: "",
                date_of_birth: this.getCurrentDate(),
                mobile_number: "",
                email: "",
            },
            isLoading: false,  // Track if the login is in progress

        }
    },

    mounted()
    {
        this.fetchAccountData();
        this.toast = useToast();
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

        async submit()
        {
            this.isLoading = true; // Show loading spinner when login starts
            try
            {
                const response = await apiClient.put(`/account/${this.$route.params.id}`, this.form)
                console.log("User account update successfully:", response.data);
                this.toast.success("User account updated successfully!");
                setTimeout(() => {
                    this.$router.push(`/administration/user-management/${this.$route.params.id}`);
                }, 1000)
            }
            catch(error)
            {
                console.log("Error occured:", error);
                this.toast.error("User account updated unsuccessfully!")
            }
            finally
            {
                this.isLoading = false; // Hide the loading spinner after login is complete
            }
        },

        async fetchAccountData()
        {
            try
            {
                const ticketResponse = await apiClient.get(`/account/${this.$route.params.id}`);
                this.form = ticketResponse.data;
                console.log("Fetched account:", ticketResponse.data);
            }
            catch(error)
            {
                console.error("Error occured:", error);
            }
        },

        handleFileUpload(event)
        {
            this.form.photo = event.target.files[0];
        }
    }
}
</script>

<style scoped>
/* Add styles for the loading spinner */
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.spinner {
    border: 4px solid #f3f3f3; /* Light grey */
    border-top: 4px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>