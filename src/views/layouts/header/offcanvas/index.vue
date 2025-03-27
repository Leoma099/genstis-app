<template>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel">Notifications</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body" >

            <div
                v-if="!itemsLoading">
                <div v-if="items.length > 0">

                    <item-component
                    class="notification"
                        v-for="(item, index) in items"
                        :key="index"
                        :item="item"
                        :selectItem="selectItem"
                        :updateItem="updateItem"/>
                </div>

                <div class="notification-box"
                    v-else>
                    <p class="mb-0 text-center">No notifications</p>
                </div>
            </div>

            <p v-else>Loading...</p>
        </div>
    </div>
</template>

<script>
import apiClient from "@/services/authorization";

import ItemComponent from './content/item';

export default
{
    components:
    {
        ItemComponent,
    },

    data()
    {
        return {
            items: [],
            itemsLoading: false,
            isEmpty: true,

            count: 0,

            selectedItem: {},
        };
    },

    created()
    {
        this.fetchTicketNotifications();

        console.log(this, 'OFFCANVAS');
    },
    
    methods:
    {
        addNotification(message)
        {
            this.notifications.push(message);
        },

        async fetchTicketNotifications()
        {
            this.items = [];

            this.itemsLoading = true;

            const response = await apiClient.get('/ticket-notifications');

            this.itemsLoading = false;

            if (response.status == 200)
            {
                this.items = response.data.data;
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

        reduceCount()
        {
            this.$parent.reduceCount();
        }
    },
};
</script>
  
<style scoped>
.notification
{
    background-color: #b87aff;
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
  