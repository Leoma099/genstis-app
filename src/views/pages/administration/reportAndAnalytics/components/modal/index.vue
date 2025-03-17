<template>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-0 border-0">
                <div class="modal-body">
                    <form @submit.prevent="submit()">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="col-md-4">
                                <p class="mb-0"><strong>Start Date</strong></p>
                            </div>
                            <div class="col-md-8">
                                <input type="date" class="form-control form-control-sm rounded-0">
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="col-md-4">
                                <p class="mb-0"><strong>End Date</strong></p>
                            </div>
                            <div class="col-md-8">
                                <input type="date" class="form-control form-control-sm rounded-0">
                            </div>
                        </div>
                        <div class="text-end">
                            <button
                                type="submit"
                                class="btn btn-primary rounded-0">
                                Search
                            </button>
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