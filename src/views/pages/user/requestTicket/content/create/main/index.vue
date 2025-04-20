<template>

    <div class="col-4 mx-auto">

        <div class="card card-body shadow-sm rounded-0 border-0">

            <p><strong>Fill-up the form appropriately.</strong></p>

            <!-- Show loading spinner if isLoading is true -->
            <div v-if="isLoading" class="loading-overlay">
                <div class="spinner"></div>
            </div>

            <form @submit.prevent="submit()">

                <h3 class="text-secondary">{{ form.ticket_order }}</h3>

                <div class="form-group mb-3">
                    <label for="" class="form-label">* Subject:</label>
                    <select name="" id="" class="form-select form-select-sm rounded-0" v-model="form.subject" required>
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

                <!-- <div class="form-group mb-3">
                    <label class="form-label">* Department:</label>
                    <input
                        type="text"
                        class="form-control form-control-sm rounded-0"
                        :value="formatDepartment(form.department)">
                </div> -->

                <div class="form-group mb-3">
                    <label class="form-label">* Priority Level:</label>
                    <select name="" id="" class="form-select form-select-sm rounded-0" v-model="form.priority_level" required>
                        <option value="0" disabled>-- Select Priority Level --</option>
                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                        <option value="4">Emergency</option>
                    </select>
                </div>

                <div class="form-group mb-3">
                    <label class="form-label">* Photo:</label>
                    <input type="file" class="form-control form-control-sm rounded-0" @change="handleFileUpload">
                </div>

                <div class="form-group mb-3">
                    <label class="form-label mb-0">* Problem Description:</label>
                    <textarea name="" id="" cols="30" rows="5" class="form-control form-control-sm rounded-0" placeholder="ex. Your problem in detail" v-model="form.description"></textarea>
                </div>

                <!-- <div class="form-group mb-3">
                    <label class="form-label mb-0">* Attachment:</label>
                    <input type="file" class="form-control form-control-sm rounded-0" @change="handleFileUpload">
                </div> -->

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
                ticket_order: "",
                full_name: "",
                department: "",
                subject: "0",
                priority_level: "1",
                request_date: this.getCurrentDate(),
                completed_date: "",
                description: "",
                assigned_by: "",
                photo: null,
            },
            isLoading: false,  // Track if the login is in progress
            ticketCount: 1, // Initialize ticket counter
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

        this.form.ticket_order = this.generateTicketNumber();
    },

    mounted()
    {
        this.toast = useToast();
        this.form.ticket_order = this.generateTicketNumber();
    },

    methods:
    {
        generateTicketNumber()
        {
            // Generate ticket number in the format TO#00001
            const ticketNumber = `TO#${Math.ceil(Math.random() * 10000)}`;
            this.form.ticket_order = ticketNumber; // Assign to form.ticket_order
            return ticketNumber;
        },

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
            this.form.photo = event.target.files[0];
        },

        fetchUserDetails()
        {
            this.form.full_name = localStorage.getItem("full_name") || "";
            this.form.department = localStorage.getItem("department") || "";
            this.form.account_id = localStorage.getItem("user_id") || "";
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

        async submit()
        {
            this.isLoading = true;

            // Ensure ticket_order is not empty
            if (!this.form.ticket_order) {
                this.form.ticket_order = this.generateTicketNumber();
            }

            try {
                let formData = new FormData();

                formData.append("ticket_order", this.form.ticket_order); // Make sure it's included
                formData.append("account_id", this.form.account_id);
                formData.append("full_name", this.form.full_name);
                formData.append("school_number", this.form.school_number);
                formData.append("subject", this.form.subject);
                formData.append("department", this.form.department);
                formData.append("priority_level", this.form.priority_level);
                formData.append("request_date", this.form.request_date);
                formData.append("completed_date", this.form.completed_date);
                formData.append("description", this.form.description);

                if (this.form.photo) {
                    formData.append("photo", this.form.photo);
                }

                const response = await apiClient.post("/ticket", formData, {
                    headers: { "Content-Type": "multipart/form-data" } // ✅ Important for file upload
                });

                console.log(response.data);
                this.toast.success("Request ticket created successfully!");
                setTimeout(() => {
                    this.$router.push('/user/request-ticket');
                }, 1000);
            } catch (error) {
                this.toast.error("Request ticket creation failed!");
                console.error("Error occurred:", error);
            } finally {
                this.isLoading = false;
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