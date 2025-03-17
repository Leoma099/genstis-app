<template>

    <div class="col-4 mx-auto">

        <div class="card card-body shadow-sm rounded-0 border-0">

            <p><strong>Fill-up the form appropriately.</strong></p>

            <!-- Show loading spinner if isLoading is true -->
            <div v-if="isLoading" class="loading-overlay">
                <div class="spinner"></div>
            </div>

            <form @submit.prevent="submit()">

                <div class="form-group mb-3">
                    <label for="" class="form-label">* Subject:</label>
                    <select name="" id="" class="form-select form-select-sm rounded-0" v-model="form.subject">
                        <option value="0" disabled>-- Select Issue --</option>
                        <option value="1">Desktop</option>
                        <option value="2">Laptop</option>
                        <option value="3">Printer Service</option>
                        <option value="4">Software Installation</option>
                        <option value="5">Internet Connection</option>
                        <option value="6">Wireless Connection</option>
                        <option value="7">New User ( Microsoft Account )</option>
                        <option value="8">Login Issues</option>
                        <option value="9">Other</option>
                    </select>
                </div>

                <div class="form-group mb-3">
                    <label class="form-label">* Department:</label>
                    <select name="" id="" class="form-select form-select-sm rounded-0" v-model="form.department">
                        <option value="0" disabled>-- Select Department --</option>
                        <option value="1">CBA - College of Business and Administration</option>
                        <option value="2">CASED - College of Arts and Science Educations</option>
                        <option value="3">Registrar</option>
                        <option value="4">Cashier</option>
                        <option value="5">Accounting</option>
                    </select>
                </div>

                <div class="form-group mb-3">
                    <label class="form-label">* Priority Level:</label>
                    <select name="" id="" class="form-select form-select-sm rounded-0" v-model="form.priority_level">
                        <option value="0" disabled>-- Select Priority Level --</option>
                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                        <option value="4">Emergency</option>
                    </select>
                </div>

                <div class="form-group mb-3">
                    <label class="form-label">* Request Date:</label>
                    <input type="date" class="form-control form-control-sm rounded-0" placeholder="ex. Juan Dela Cruz" v-model="form.request_date">
                </div>

                <div class="form-group mb-3">
                    <label class="form-label mb-0">* Problem Description:</label>
                    <textarea name="" id="" cols="30" rows="5" class="form-control form-control-sm rounded-0" placeholder="ex. Your problem in detail" v-model="form.description"></textarea>
                </div>

                <div class="form-group mb-3">
                    <label class="form-label mb-0">* Attachment:</label>
                    <input type="file" class="form-control form-control-sm rounded-0" @change="handleFileUpload">
                </div>

                <div class="text-end">

                    <router-link :to="'/user/request-ticket'" class="btn btn-sm btn-secondary rounded-0 me-3">Cancel</router-link>
                    <button type="submit" class="btn btn-sm btn-primary rounded-0">Submit</button>

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
                school_number: "",
                subject: "0",
                department: "0",
                priority_level: "1",
                request_date: this.getCurrentDate(),
                completed_date: "",
                description: "",
                assigned_by: "",
                attachment_photo: "null",
            },
            isLoading: false,  // Track if the login is in progress
        }
    },

    created()
    {
        this.fetchUserDetails();

        if (!this.form.account_id)
        {
            alert("You must be logged in to submit a ticket.");
            this.$router.push("/login");
        }
    },

    mounted()
    {
        this.toast = useToast()
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

        handleFileUpload(event)
        {
            this.form.attachment_photo = event.target.files[0];
        },

        fetchUserDetails()
        {
            this.form.full_name = localStorage.getItem("full_name") || "";
            this.form.school_number = localStorage.getItem("school_number") || "";
            this.form.account_id = localStorage.getItem("user_id") || "";
        },

        async submit()
        {
            this.isLoading = true; // Show loading spinner when login starts
            try
            {
                let formData = new FormData();
                formData.append("account_id", this.form.account_id);  // Automatically fetched
                formData.append("full_name", this.form.full_name);    // Automatically fetched
                formData.append("school_number", this.form.school_number);  // Automatically fetched
                formData.append("subject", this.form.subject);
                formData.append("department", this.form.department);
                formData.append("priority_level", this.form.priority_level);
                formData.append("request_date", this.form.request_date);
                formData.append("completed_date", this.form.completed_date);
                formData.append("description", this.form.description);

                if (this.form.attachment_photo) {
                    formData.append("attachment_photo", this.form.attachment_photo);
                }

                const response = await apiClient.post("/ticket", formData);

                console.log(response.data);
                this.toast.success("Request ticket created successfully!");
                setTimeout(() => {
                    this.$router.push('/user/request-ticket');
                }, 1000);
            }
            catch(error)
            {
                this.toast.error("Request ticket created unsuccessfully!");
                console.error("Error occurred:", error);
            }
            finally
            {
                this.isLoading = false; // Hide the loading spinner after login is complete
            }

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