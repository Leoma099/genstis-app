<template>

    <div class="modal fade" id="reasonViewDeclineModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            rows="10"
                            class="form-control form-control-sm rounded-0"
                            placeholder="Type your comment here"
                            ></textarea>
                        </div>
                        <div class="text-end mt-3">
                            <button type="button" class="btn btn-sm btn-secondary rounded-0 me-3" data-bs-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {

}
</script>

<style>

</style>