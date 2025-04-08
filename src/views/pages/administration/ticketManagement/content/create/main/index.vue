<template>
    <div class="mt-3 col-4 mx-auto">
        <div class="card card-body shadow-sm border-0 rounded-0">
            <div v-if="isLoading" class="loading-overlay">
                <div class="spinner"></div>
            </div>

            <form @submit.prevent="submit">
                <h3 class="text-secondary">{{ form.ticket_order }}</h3>

                <p><strong>Fill out the form appropriately.</strong></p>

                <div class="mb-3">
                    <div class="form-group mb-3">
                        <label class="form-label">* Full Name:</label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            placeholder="ex. Juan Dela Cruz"
                            v-model="form.full_name"
                            required
                        />
                    </div>

                    <div class="form-group mb-3">
                        <label class="form-label">* Department:</label>
                        <select class="form-select form-select-sm rounded-0" v-model="form.department" required>
                            <option value="0" disabled>-- Select Department --</option>
                            <option value="1">CBA - College of Business and Administration</option>
                            <option value="2">CASED - College of Arts and Science Education</option>
                            <option value="3">Registrar</option>
                            <option value="4">Payroll</option>
                            <option value="5">Accounting Finance</option>
                            <option value="6">Quality Assurance</option>
                            <option value="7">AASS</option>
                            <option value="8">HR - Human Resource</option>
                            <option value="9">MIS Office</option>
                            <option value="10">Rikdo Office</option>
                            <option value="11">Graduate School Office</option>
                            <option value="12">Museum</option>
                            <option value="13">Library</option>
                            <option value="14">Sewing</option>
                            <option value="15">Principal Office</option>
                            <option value="16">CESO Office</option>
                            <option value="17">Cashier</option>
                            <option value="18">CCS - College of Computer Studies</option>
                        </select>
                    </div>
                </div>

                <hr />

                <div class="mb-3">
                    <div class="row">
                        <div class="col-md-7">
                            <div class="form-group mb-3">
                                <label class="form-label">* Subject:</label>
                                <select class="form-select form-select-sm rounded-0" v-model="form.subject" required>
                                    <option value="0" disabled>-- Select Issue --</option>
                                    <option value="1">Desktop Computer</option>
                                    <option value="2">Laptop Computer</option>
                                    <option value="3">Printer Services</option>
                                    <option value="4">Software Installation</option>
                                    <option value="5">Internet Connection</option>
                                    <option value="6">Wireless Connection</option>
                                    <option value="7">New User (Microsoft Account)</option>
                                    <option value="8">Login Issues</option>
                                    <option value="9">Other</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group mb-3">
                                <label class="form-label">* Priority Level:</label>
                                <select class="form-select form-select-sm rounded-0" v-model="form.priority_level" required>
                                    <option value="0" disabled>-- Select Level --</option>
                                    <option value="1">Low</option>
                                    <option value="2">Medium</option>
                                    <option value="3">High</option>
                                    <option value="4">Emergency</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label class="form-label mb-0">* Problem Description:</label>
                        <textarea
                            class="form-control form-control-sm rounded-0"
                            placeholder="Describe your problem in detail"
                            v-model="form.description"
                            required
                        ></textarea>
                    </div>
                </div>

                <div class="text-end mt-3">
                    <router-link to="/administration/ticket-management" class="btn btn-secondary btn-sm rounded-0 me-3">Cancel</router-link>
                    <button type="submit" class="btn btn-primary btn-sm rounded-0">Submit</button>
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
        return {
            form:
            {
                ticket_order: '',
                full_name: "",
                department: "0",
                subject: "0",
                priority_level: "1",
                status: "1",
                request_date: this.getCurrentDate(),
                completed_date: "",
                description: "",
                photo: "",
                assigned_by: "0",
            },
            isLoading: false,  // Track if the login is in progress
            ticketCount: 1, // Initialize ticket counter
        };
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

        async submit()
        {
            // Generate the ticket number before submitting
            this.form.ticket_order = this.generateTicketNumber();

            const formData = new FormData();
            // Append form fields to FormData
            for(let key in this.form)
            {
                formData.append(key, this.form[key]);
            }

            this.isLoading = true; // Show loading spinner when login starts

            try
            {
                const response = await apiClient.post("/ticket/walkin", formData);
                setTimeout(() => {
                    this.$router.push('/administration/ticket-management');
                }, 1000);
                console.log(response.data);
                this.toast.success("Ticket created successfully!")
            }
            catch(error)
            {
                this.toast.error("Ticket created unsuccessfully!")
                console.error("Error", error)
            }
            finally
            {
                this.isLoading = false; // Hide the loading spinner after login is complete
            }
        },

        handleFileUpload(event)
        {
            const file = event.target.files[0];

            if (file)
            {
                this.form.photo = file;
            }
        },
    }
};
</script>

<style scoped>
.page-title
{
    font-weight: 600;
    font-size: 1.5rem;
    color: #a200ff;
}
/* Add styles for the loading spinner */
.loading-overlay
{
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

.spinner
{
    border: 4px solid #f3f3f3; /* Light grey */
    border-top: 4px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin
{
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
