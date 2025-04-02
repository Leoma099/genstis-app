<template>
    
    <div @click="markAsUnread">
        <p>
            <span class="vh-text-bold">
                {{ item.notified_by.name }}
            </span>{{ item.message }}.
        </p>
        <small v-if="!markLoading">
            <span v-if="!item.is_read">
                UNREAD
            </span>
            <span v-else>
                READ
            </span>
        </small>
        <small v-else>
            Loading...
        </small>
    </div>
</template>

<script>
import apiClient from '@/services/authorization';


export default
{
    props:
    {
        item: Object,
        selectItem: Function,
        updateItem: Function,
    },

    data()
    {
        return {
            markLoading: false
        }
    },

    methods:
    {
        async markAsUnread()
        {
            if (!this.item.is_read)
            {
                this.selectItem(this.item);

                this.markLoading = true;

                const response = await apiClient.put(`/ticket-notification/${this.item.id}/read`);

                this.markLoading = false;

                if (response.status == 200)
                {
                    this.updateItem(response.data);

                    // this.$parent.reduceCount();
                }
            }
            
        }
    }
}
</script>