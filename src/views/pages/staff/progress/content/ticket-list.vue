<template>

    <div class="card card-body shadow-sm border-0 rounded-0">

        <div class="table-responsive">
            <table class="table table-bordered table-hover mb-0">
                <thead>
                    <tr>
                        <th class="table-header">TICKET ORDER</th>
                        <th class="table-header">DEPARTMENT</th>
                        <th class="table-header">CLIENT NAME</th>
                        <th class="table-header">SUBJECT</th>
                        <th class="table-header">PRIORITY</th>
                        <th class="table-header">ASSIGNEE</th>
                        <th class="table-header">STATUS</th>
                        <th class="table-header">REQUEST DATE</th>
                        <th class="table-header">COMPLETED DATE</th>
                        <th class="table-header">ACTION</th>
                    </tr>
                </thead>
                <tbody v-if="!isEmpty">
                </tbody>
                <tbody v-else>
                    <tr class="text-cente">
                        <td>No data</td>
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
.table-header
{
    font-size: 0.85rem;
    font-weight: 600;
    padding: 10px;
    background-color: #a200ff;
    color: #ffffff;
}
</style>