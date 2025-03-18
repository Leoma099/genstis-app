<template>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel">Notifications</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body" v-if="!isEmpty">
            <div v-for="(notification, index) in notifications" :key="index" class="notification">
                <p>{{ notification }}</p>
            </div>
        </div>
        <div class="offcanvas-body" v-else>
            <div class="notification-box">
                <p class="mb-0 text-center">No notifications</p>
            </div>
        </div>
    </div>
</template>

<script>
export default
{
    data()
    {
        return {
            notifications: [],
            isEmpty: true,
        };
    },
    methods:
    {
        addNotification(message) {
        // Add the notification message to the list
        this.notifications.push(message);
        },
    },
};
</script>
  
<style scoped>
.notification
{
    background-color: #4caf50;
    color: white;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}
.notification-box
{
    background-color: #e0e0e0;
    padding: 10px;
    border-radius: 5px;
}
</style>
  