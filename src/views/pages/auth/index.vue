<template>
    <div class="animate animate-fade-in">
        <div class="login-body">
            <div class="login-wrapper">
                <div class="left">
                    <div>
                        <div class="login-image">
                            <p class="mb-0">Welcome to</p>
                        </div>
                        <div>
                            <h1>ITSO JOB ORDER TICKETING SYSTEM</h1>
                        </div>
                    </div>
                </div>

                <div class="right">
                    <!-- Show loading spinner if isLoading is true -->
                    <div v-if="isLoading" class="loading-overlay">
                        <div class="spinner"></div>
                    </div>

                    <form @submit.prevent="submit">
                        <div>
                            <div class="right-image">
                                <img src="/assets/images/cc_logo.png" alt="">
                            </div>
                            <p class="login-title">Columban College, Inc.</p>
                        </div>
                        <h4>LOGIN</h4>

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

export default {
    data() {
        return {
            form: {
                username: "",
                password: "",
            },
            isLoading: false,  // Track if the login is in progress
        };
    },

    mounted() {
        this.toast = useToast();
    },

    methods: {
        async submit() {
            this.isLoading = true; // Show loading spinner when login starts

            try {
                // Use the Axios instance for the login request
                const response = await apiClient.post('/login', this.form);

                // Save the token and user details to localStorage
                localStorage.setItem('access_token', response.data.token);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('username', response.data.username);

                localStorage.setItem('full_name', response.data.full_name);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('department', response.data.department);
                localStorage.setItem('position', response.data.position);
                localStorage.setItem('address', response.data.address);
                localStorage.setItem('mobile_number', response.data.mobile_number);
                localStorage.setItem('date_of_birth', response.data.date_of_birth);

                localStorage.setItem('photo', response.data.photo);
                localStorage.setItem("user_id", response.data.id);

                // Redirect after a short delay
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000); // Delay of 1 second

                this.toast.success("Login successfully!");
            } catch (error) {
                this.toast.error("Login unsuccessfully!");
                console.error('Login failed:', error.response?.data || error.message);
            } finally {
                this.isLoading = false; // Hide the loading spinner after login is complete
            }
        },
    },
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
