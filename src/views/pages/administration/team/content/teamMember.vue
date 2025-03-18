<template>
    <div class="card card-body shadow-sm border-0 rounded-0">
        <p>Team Members</p>

        <div class="table-responsive">
            <table class="table table-bordered table-hover mb-0">
                <thead>
                    <tr>
                        <th class="table-header">MEMBER NAME</th>
                        <th class="table-header">TOTAL ASSIGNED</th>
                        <th class="table-header">TOTAL RESOLVED</th>
                    </tr>
                </thead>
                <tbody v-if="!isEmpty">
                </tbody>
                <tbody v-else>
                    <tr class="text-center">
                        No record
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
export default
{
    data()
    {
        return{
            isEmpty: true,
        }
    }
}
</script>

<style scoped>
.table-header {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 10px;
    background-color: #a200ff;
    color: #ffffff;
}
</style>