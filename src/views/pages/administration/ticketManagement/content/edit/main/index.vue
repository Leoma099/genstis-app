<template>
    
    <div class="col-5 mx-auto">

        <div class="card card-body shadow-sm border-0 rounded-0">

            <div v-if="isLoading" class="loading-overlay">
                <div class="spinner"></div>
            </div>

            <form @submit.prevent="submit()">
                
                <div class="mb-3">
                    <div class="form-group mb-3">
                        <label class="form-label">* Full Name:</label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            placeholder="ex. Juan Dela Cruz"
                            v-model="form.full_name"
                            disabled
                        />
                    </div>

                    <div class="form-group mb-3">
                        <label class="form-label">* Department:</label>
                        <select class="form-select form-select-sm rounded-0" v-model="form.department" disabled>
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

                <hr>

                <div class="mb-3">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="form-group mb-3">
                                <label class="form-label">* Subject:</label>
                                <select class="form-select form-select-sm rounded-0" v-model="form.subject" disabled>
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
                        <div class="col-md-4">
                            <div class="form-group mb-3">
                                <label class="form-label">* Photo:</label>
                                <input type="file" class="form-control form-control-sm rounded-0" @change="handleFileUpload" disabled>
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label class="form-label">* Assigned To:</label>
                        <select class="form-select form-select-sm rounded-0" v-model="form.assigned_by" required>
                            <option value="" disabled selected>-- Select Staff --</option>
                            <option v-for="(staff, index) in staffs" :key="index" :value="staff.id">
                                {{ staff.full_name }}
                            </option>
                        </select>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label class="form-label">* Priority Level:</label>
                                <select class="form-select form-select-sm rounded-0" v-model="form.priority_level" disabled>
                                    <option value="0" disabled>-- Select Level --</option>
                                    <option value="1">Low</option>
                                    <option value="2">Medium</option>
                                    <option value="3">High</option>
                                    <option value="4">Emergency</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label class="form-label">* Status:</label>
                                <select class="form-select form-select-sm rounded-0" v-model="form.status" required>
                                    <option value="0" disabled>-- Select Status --</option>
                                    <option value="1">Pending</option>
                                    <option value="2">In-Progress</option>
                                    <option value="3">Resolved</option>
                                    <option value="4">Not Completed</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label class="form-label">* Request Date:</label>
                                <input
                                    type="date"
                                    class="form-control form-control-sm rounded-0"
                                    v-model="form.request_date"
                                    disabled
                                />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label class="form-label">Completed Date:</label>
                                <input
                                    type="date"
                                    class="form-control form-control-sm rounded-0"
                                    v-model="form.completed_date"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label class="form-label mb-0">* Problem Description:</label>
                        <textarea
                            class="form-control form-control-sm rounded-0"
                            placeholder="Describe your problem in detail"
                            v-model="form.description"
                            disabled
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
import apiClient from "@/services/authorization"
import { useToast } from "vue-toastification";
export default
{
    data()
    {
        return{

            form:
            {
                full_name: "",
                department: "",
                subject: "",
                priority_level: "",
                status: "",
                description: "",
                assigned_by: "",
                request_date: "",
                completed_date: "",
                photo: null,
            },
            isLoading: false,  // Track if the login is in progress
            staffs: [],

        }
    },

    mounted()
    {
        console.log("Route ID:", this.$route.params.id);
        this.fetchStaffData();
        this.fetchBorrowData();
        this.toast = useToast();
    },

    methods:
    {
        async fetchStaffData()
        {
            try
            {
                const staffResponse = await apiClient.get('/get-staff'); // Assuming '/staff' endpoint provides staff data
                this.staffs = staffResponse.data; // Store staff data in the `staffs` array
                console.log("Fetched staff data:", this.staffs);
            }
            catch(error)
            {
                console.error("Error occured fetching staff data:", error);
            }
        },

        async fetchBorrowData()
        {
            try
            {
                const ticketResponse = await apiClient.get(`/ticket/${this.$route.params.id}`);
                this.form = ticketResponse.data;
                console.log("Fetched borrow:", ticketResponse.data);
            }
            catch(error)
            {
                console.error("Error occured:", error);
            }
        },

        async submit()
        {
            this.isLoading = true; // Hide the loading spinner after login is complete
            try
            {
                const response = await apiClient.put(`/ticket/${this.$route.params.id}`, this.form)
                console.log("Ticket update successfully:", response.data);
                this.toast.success("Ticket updated successfully!");
                setTimeout(() => {
                    this.$router.push("/administration/ticket-management");
                }, 1000)
            }
            catch(error)
            {
                console.log("Error occured:", error);
                this.toast.error("Ticket updated unsuccessfully!")
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
.page-title {
    font-weight: 600;
    font-size: 1.5rem;
    color: #2369c1;
}
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