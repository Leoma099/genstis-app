<template>
    <div class="animate animate-fade-in">

        <div class="login-body">

            <div class="login-wrapper">

                <div class="left">

                    <div>
                        
                        <div class="login-image">
                            <img src="/assets/images/gensts-ccs.png" alt="">
                        </div>

                        <div>
                            <p>Welcome to</p>
                            <h3>ITSO-CCI Ticketing System</h3>
                            <small>
                                ITSO-CCI Ticketing System is a web-based General System Ticketing Service designed for Columban College, Inc. (CCI) to streamline technical support requests. It allows users to submit, track, and manage tickets efficiently, ensuring a smooth resolution process for IT and system-related issues.
                            </small>
                        </div>

                    </div>

                </div>

                <div class="right">

                    <form @submit.prevent="submit()">

                        <div>
                            <div class="right-image">
                                <img src="/assets/images/cc_logo.png" alt="">
                            </div>
                            <p class="login-title">Columban College, Inc.</p>
                        </div>
                        <h4>LOGIN TO TICKET SYSTEM</h4>

                        <div class="form-group mb-3">
                            <label for=""><strong>Username:</strong></label>
                            <div class="login-input">
                                <input type="text" placeholder="Enter your username" v-model="form.username" required>
                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <label for=""><strong>Password:</strong></label>
                            <div class="login-input">
                                <input type="password" placeholder="Enter your password" v-model="form.password" required>
                            </div>
                        </div>

                        <div class="login-button">
                            <button type="submit">Login</button>
                        </div>

                    </form>

                </div>

            </div>

        </div>

    </div>

</template>

<script>
import apiClient from "@/services/authorization"; // Import the Axios instance
import { useToast } from "vue-toastification";
export default
{
    data() {
        return {
            form:
            {
                username: "",
                password: "",
            },
        };
    },

    mounted()
    {
        this.toast = useToast()
    },

    methods:
    {
        async submit() {
            try {
                // Use the Axios instance for the login request
                const response = await apiClient.post('/login', this.form);

                // Save the token and user details to localStorage
                localStorage.setItem('access_token', response.data.token);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('full_name', response.data.full_name);
                localStorage.setItem("school_number", response.data.school_number);
                localStorage.setItem('photo', response.data.photo);
                localStorage.setItem("user_id", response.data.id);

                // Redirect after a short delay
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000); // Adjust delay as needed
                this.toast.success("Login successfully!")
            } catch (error) {
                this.toast.error("Login unsuccessfully!")
                console.error('Login failed:', error.response?.data || error.message);
            }
        }
    }
};
</script>

<style scoped>
.animation {
    animation-duration: 1s;
    animation-fill-mode: none;
}
.animation-fade-in {
    animation-name: fadeIn;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.page-title {
    font-weight: 600;
    font-size: 1.5rem;
    color: #2369c1;
}
</style>
