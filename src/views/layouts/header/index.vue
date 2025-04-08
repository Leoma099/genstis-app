<template>

    <nav>

        <div class="component-left">
            <a href="javascript:void(0);" @click="toggleSidebar()">
            <i class="bx bx-menu"></i>
            </a>
        </div>

        <div class="component-right">

            <div class="icon-badge notification-container" @click="toggleDropdown">

                <i class="bx bxs-bell icon-size"></i>
                <span class="badge" v-if="notificationCount > 0">{{ notificationCount }}</span>

                <div
                  v-show="dropdownOpen"
                  class="dropdown">

                    <h4 class="mb-0" style="padding-inline: 10px;">Notification</h4>

                    <div v-if="items.length > 0">
                        <item-component
                            class="notification mt-2"
                            v-for="(item, index) in items"
                            :key="index"
                            :item="item"/>
                    </div>

                    <div class="notification-box mt-3"
                        v-else>
                        <p class="mb-0 text-center">No notifications</p>
                    </div>


                </div>

            </div>
            
            <router-link :to="'/my-account'" class="profile">

                <div class="profile-img me-3">
                    <img :src="userPhoto" alt="User Photo" />
                </div>
                <div>
                    <p class="mb-0">{{ userName }}</p>
                </div>

            </router-link>

        </div>

    </nav>

</template>

<script>
import apiClient from "@/services/authorization";
import ItemComponent from "./content/item.vue";
export default
{
  name: 'THisHEader',
    data()
    {
        return {
            dropdownOpen: false,
            items: [],
            user: null,
            isEmpty: false,
            interval: null,
            selectedItem: {},

            notificationCount: 0,
            notificationCountLoading: false,
            showNotificationCount: true,
        };
    },

    components:
    {
        ItemComponent
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
        },

        async fetchNotificationCount()
        {
            try
            {
                const response = await apiClient.get('/ticket-notifications');

                // Ensure response data is an array
                if (Array.isArray(response.data.data))
                {
                    this.items = response.data.data;
                    this.notificationCount = this.items.filter(item => !item.is_read).length;

                    console.log("Notification fetched successfully:", response.data.data);
                }
                else
                {
                    this.items = [];  // Set to an empty array if the response isn't an array
                    console.error("Fetched data is not an array:", response.data.data);
                }
            }
            catch(error)
            {
                console.error("Error occured:", error);
            }
        },

        selectItem(item)
        {
            this.selectedItem = item;
        },

        updateItem(updatedData)
        {
            let checkingItem = this.items.find(row => row.id == updatedData.id);

            checkingItem.is_read = updatedData.is_read;
        },

        toggleDropdown()
        {
            this.dropdownOpen = !this.dropdownOpen;

            if (this.dropdownOpen)
            {
                this.markNotificationsAsRead();
            }

            localStorage.setItem('notifications_read', 'true');
        },

        async markNotificationsAsRead()
        {
            try
            {
                await apiClient.post('/mark-notifications-read');
                this.items.forEach(item => item.is_read = 1);
                this.notificationCount = 0; // Reset notification count to 0 when the bell icon is clicked
            }
            catch (error)
            {
                console.error("Failed to mark notifications as read:", error);
            }
        },

        closeDropdown(event)
        {
            if (!this.$el.contains(event.target))
            {
                this.dropdownOpen = false;
            }
        },

        startRealTimeUpdates()
        {
            this.interval = setInterval(() => {
                if (!this.dropdownOpen)
                {
                    this.fetchNotificationCount(); // Fetch notifications only when the dropdown is closed
                }
            }, 5000); // Fetch every 5 seconds
        },
    },

    mounted()
    {
        this.fetchUserData();
        document.addEventListener("click", this.closeDropdown);
        this.fetchNotificationCount();
        this.startRealTimeUpdates();
    },

    beforeUnmount()
    {
        document.removeEventListener("click", this.closeDropdown);
        clearInterval(this.interval); // Clear interval on component unmount
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

.icon-badge {
position: relative;
cursor: pointer;
margin-right: 20px;
}

.badge {
position: absolute;
top: 10px;
right: -10px;
background: red;
color: white;
font-size: .5;
padding: 3px;
border-radius: 5px;
}

/* Notification Dropdown */
.notification-container {
position: relative;
}

.dropdown {
position: absolute;
right: -100px;
top: 60px;
background: white;
color: black;
width: 300px;
box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
border-radius: 5px;
overflow: hidden;
z-index: 1000;
max-height: auto;
padding: 10px;
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

.icon-size {
font-size: 1.5rem;
}

.notification
{
    transition: 0.1s ease-in-out;
    padding: 10px;
    border-radius: 5px;
}

.notification:hover
{
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
}

.notification-box
{
    background-color: #e0e0e0;
    padding: 10px;
    border-radius: 5px;
}

.notify-button
{
    transition: 0.1s ease-in-out;
}
.notify-button:hover
{
    background: #e0e0e0;
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
