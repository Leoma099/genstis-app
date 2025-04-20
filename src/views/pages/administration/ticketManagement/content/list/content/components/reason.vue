<template>

    <div class="modal fade" id="reasonDeclineModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content border-0">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">What reason?</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submit()">
                        <div class="form-group">
                            <label class="form-label">* Comment:</label>
                            <textarea
                            v-model="form.reason"
                            rows="10"
                            class="form-control form-control-sm rounded-0"
                            placeholder="Type your comment here"
                            ></textarea>
                        </div>
                        <div class="text-end mt-3">
                            <button type="button" class="btn btn-sm btn-secondary rounded-0 me-3" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-sm btn-primary rounded-0">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import apiClient from "@/services/authorization";
import { useToast } from "vue-toastification";
export default
{
    props:
    {
        selectItem: Function,
        updateItem: Function,
    },

    data()
    {
        return{
            form:
            {
                reason: "",
            }
        }
    },

    mounted()
    {
        this.toast = useToast();
        console.log("TESTSS:", this.selectItem);
    },

    methods:
    {
        async submit()
        {
            try
            {
                this.selectItem(this.item);

                const response = await apiClient.put(`/ticket/${this.item.id}/cancel`, {
                    reason: this.form.reason
                });
                
                if (response.status === 200) {
                    this.updateItem(response.data);
                    this.toast.success(`${this.item.ticket_order} is now canceled.`);

                    this.form.reason = ""; // Clear textarea
                }
            }
            catch(error)
            {
                this.toast.error("Failed to cancel ticket.");
                console.error(error);
            }
        }
    }
}
</script>

<style>

</style>