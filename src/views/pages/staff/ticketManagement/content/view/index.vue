<template>
    <p class="page-title mb-0">View Ticket</p>
    <small>
        <router-link
            :to="'/administration/ticket-management'">
            Go back to page
        </router-link>
    </small>
    
    <div class="col-5 mx-auto">

        <div class="card card-body shadow-sm border-0 rounded-0">

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
                                <input type="file" class="form-control form-control-sm rounded-0" @change="handleFileUpload">
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label class="form-label">* Assigned To:</label>
                        <select class="form-select form-select-sm rounded-0" v-model="form.assigned_by" disabled>
                            <option value="0" disabled>-- Select Staff --</option>
                            <option value="1">Robert John Javani Minimo</option>
                            <option value="2">Jacob R Canlas</option>
                            <option value="3">Jeryc Erjy Mapilisan</option>
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
                                <select class="form-select form-select-sm rounded-0" v-model="form.status" disabled>
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
                    <router-link :to="`/administration/ticket-management/${this.$route.params.id}/edit`" class="btn btn-primary btn-sm rounded-0">Edit</router-link>
                </div>

            </form>
            
        </div>

    </div>

</template>

<script>
import apiClient from "@/services/authorization"
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
            }

        }
    },

    mounted()
    {
        this.fetchBorrowData();
    },

    methods:
    {
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
    }
}
</script>

<style scoped>
.page-title {
    font-weight: 600;
    font-size: 1.5rem;
    color: #2369c1;
}
</style>