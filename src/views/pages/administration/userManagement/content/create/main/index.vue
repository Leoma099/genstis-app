<template>
  
    <div class="mt-3 col-4 mx-auto">

        <div class="card card-body shadow-sm border-0 rounded-0">

            <form @submit.prevent="submit()">

                <p><strong>Fill-out the form appropriately. </strong></p>
                
                <div class="mb-3">

                    <p>PERSONAL ACCOUNT</p>

                    <div class="row">
                        <div class="col-md-8">
                            <div class="form-group mb-3">
                                <label class="form-label">* Full Name:</label>
                                <input
                                    type="text"
                                    class="form-control form-control-sm rounded-0"
                                    placeholder="ex. Juan Dela Cruz"
                                    v-model="form.full_name" required>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-3">
                                <label class="form-label">* Photo:</label>
                                <input 
                                    type="file"
                                    class="form-control form-control-sm rounded-0"
                                    @change="handleFileUpload">
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label class="form-label">* Address:</label>
                        <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            placeholder="ex. Philippines"
                            v-model="form.address" required>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label class="form-label">* Date of Birth:</label>
                                <input
                                    type="date"
                                    class="form-control form-control-sm rounded-0"
                                    v-model="form.date_of_birth" required>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label class="form-label">* Mobile Number:</label>
                                <input
                                    type="text"
                                    class="form-control form-control-sm rounded-0"
                                    placeholder="ex. 09XXXXXXXXX"
                                    v-model="form.mobile_number" required>
                            </div>
                        </div>
                    </div>

                </div>

                <hr>

                <!-- SYSTEM INFORMATION -->
                <div class="mb-3">

                    <p>SYSTEM ACCOUNT</p>

                    <div class="row">
                        <div class="col-md-9">
                            <div class="form-group mb-3">
                                <label class="form-label">* Email:</label>
                                <input
                                    type="text"
                                    class="form-control form-control-sm rounded-0"
                                    placeholder="ex. juan_delacruz@gmail.com"
                                    v-model="form.email" required>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group mb-3">
                                <label class="form-label">* Role:</label>
                                <select class="form-select form-select-sm rounded-0" v-model="form.role" required>
                                    <option value="1">Admin</option>
                                    <option value="2">Staff</option>
                                    <option value="3">User</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label class="form-label">* Username:</label>
                                <input
                                    type="text"
                                    class="form-control form-control-sm rounded-0"
                                    placeholder="ex. juandelacruz"
                                    v-model="form.username" required>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label class="form-label">* Password:</label>
                                <input
                                    type="text"
                                    class="form-control form-control-sm rounded-0"
                                    placeholder="ex. juandelacruz123"
                                    v-model="form.password" required>
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
                photo: null,
                address: "",
                date_of_birth: this.getCurrentDate(),
                mobile_number: "",
                email: "",
                role: "3",
                username: "",
                password: "",
                number: "",
            }

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

        async submit()
        {
            try
            {
                let formData = new FormData();

                formData.append("full_name", this.form.full_name);
                if (this.form.photo)
                {
                    formData.append("photo", this.form.photo); // ✅ Attach file
                }
                formData.append("address", this.form.address);
                formData.append("date_of_birth", this.form.date_of_birth);
                formData.append("mobile_number", this.form.mobile_number);
                formData.append("email", this.form.email);
                formData.append("role", this.form.role);
                formData.append("username", this.form.username);
                formData.append("password", this.form.password);
                formData.append("number", this.form.number);

                const response = await apiClient.post("/account", formData, {
                    headers: { "Content-Type": "multipart/form-data" } // ✅ Important for file upload
                });
                this.toast.success("User account created successfully!")
                this.$router.push('/administration/user-management');
                console.log(response.data);
            }
            catch(error)
            {
                this.toast.error("User account created unsuccessfully!")
                console.error("Error", error)
            }
        },

        handleFileUpload(event)
        {
            this.form.photo = event.target.files[0];
        }
    }
}
</script>

<style>

</style>