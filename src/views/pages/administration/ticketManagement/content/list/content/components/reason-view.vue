<template>

    <div class="modal fade" id="reasonViewDeclineModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content border-0">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">What reason?</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <textarea
                        class="form-control form-control-sm rounded-0"
                        v-model="selectedItem.reason"
                        readonly>
                    </textarea>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default
{
    props:
    {
        selectedItem: Object,
        cancelStatus: Function,
        updateItem: Function
    },
}
</script>

<style>

</style>