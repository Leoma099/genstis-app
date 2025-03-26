<template>
    <nav>
        <div class="component-left">
            <a href="javascript:void(0);" @click="toggleSidebar()">
            <i class="bx bx-menu"></i>
            </a>
        </div>

        <div class="component-right">

            <!-- Notification Dropdown -->
            <a
              class="icon-badge notification-container"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight">
              <i class="bx bxs-bell"></i>
            </a>

            <!-- Profile Icon -->
            <router-link :to="'/my-account'" class="profile">
                <div class="profile-img me-3">
                    <!-- Display user photo or fallback to default image -->
                    <img :src="userPhoto" alt="User Photo" />
                </div>
                <div>
                    <p class="mb-0">{{ userName }}</p>
                </div>
            </router-link>
        </div>
        <off-canvas-component />
    </nav>
</template>

<script>
import OffCanvasComponent from "./offcanvas/index.vue";
export default
{
    data()
    {
        return {
            dropdownOpen: false,
            notifications: Array.from({ length: 30 }, (_, i) => `Notification ${i + 1}`), // Example: 20 notifications
            user: null, // Will store user data here
        };
    },

    components:
    {
        OffCanvasComponent
    },

    computed:
    {
        // User's name (will display "Loading..." until fetched)
        userName()
        {
            return this.user ? this.user.full_name : 'Loading...'; // Show loading text until user data is fetched
        },

        // User's photo URL or fallback to default image
        userPhoto()
        {
            if (this.user && this.user.photo) {
            return `http://127.0.0.1:8000/storage/${this.user.photo}`; // Make sure this URL points to the correct path
            }
            return 'https://www.example.com/default-profile-image.png'; // Fallback image if no photo is available
        }
    },

    methods:
    {
        toggleDropdown()
        {
            this.dropdownOpen = !this.dropdownOpen;
        },

        closeDropdown(event)
        {
            if (!this.$el.contains(event.target))
            {
                this.dropdownOpen = false;
            }
        },
        
        // Fetch user data from localStorage
        fetchUserData()
        {
            const user =
            {
                full_name: localStorage.getItem('full_name'),
                photo: localStorage.getItem('photo'), // Assuming you've stored the photo path
                role: localStorage.getItem('role'),
                user_id: localStorage.getItem('user_id'),
            };

            if (user.full_name)
            {
                this.user = user; // Populate the user object if data exists in localStorage
            }
        },

        toggleSidebar()
        {
            const sidebar = document.querySelector('.sidebar');
            const contentArea = document.querySelector('.content-area');

            if (sidebar.classList.contains('closed')) {
                sidebar.classList.remove('closed');
                contentArea.style.marginLeft = '230px';
            } else {
                sidebar.classList.add('closed');
                contentArea.style.marginLeft = '0';
            }
        }

    },

    mounted()
    {
        // Fetch the user data once the component is mounted (user is logged in)
        this.fetchUserData(); // Retrieve user data from localStorage
        
        // Close dropdown if click is outside of component
        document.addEventListener("click", this.closeDropdown);
    },

    beforeUnmount()
    {
        document.removeEventListener("click", this.closeDropdown);
    },
};
</script>

<style scoped>
/* Base styles */
nav {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background: #a200ff;
  color: white;
}

/* Icon Badge Styles */
.icon-badge {
  position: relative;
  cursor: pointer;
  margin-right: 20px;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  font-size: 12px;
  padding: 3px 7px;
  border-radius: 50%;
}

/* Notification Dropdown */
.notification-container {
  position: relative;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 30px;
  background: white;
  color: black;
  width: 250px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
  z-index: 1000;
  max-height: auto;
}

.dropdown li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.dropdown li:hover {
  background: #f5f5f5;
}

.dropdown .empty {
  text-align: center;
  padding: 10px;
  color: gray;
}

/* Scrollbar when 15+ notifications */
.scrollable {
  max-height: 300px; /* Limit height */
  overflow-y: auto;
}

/* Custom Scrollbar Styling */
.scrollable::-webkit-scrollbar {
  width: 6px;
}

.scrollable::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.scrollable::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.scrollable::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Profile Image */
.profile-img img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.profile {
  display: flex;
  align-items: center;
}
</style>
