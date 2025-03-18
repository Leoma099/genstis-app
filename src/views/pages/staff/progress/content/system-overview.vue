<template>
    <div class="row">
        <div class="col-md-3">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <h2>{{ ticket }}</h2>
                <p>Total Tickets</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <h2>{{ pending }}</h2>
                <p>Total Pending</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <h2>{{ resolved }}</h2>
                <p>Total Resolved</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <h2>{{ unresolved }}</h2>
                <p>Total Unresolved</p>
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
            ticket: 0,
            pending: 0,
            resolved: 0,
            unresolved: 0,
        };
    },
};
</script>

<style scoped>
/* You can add your styles here */
</style>
