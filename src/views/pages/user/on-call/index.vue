<template>

    <div class="animate animate-fade-in">

        <div class="d-flex justify-content-between align-items-center">
            <h1 class="page-title mb-0">ON-CALL</h1>
        </div>

        <div class="mt-4">
            <staff-list/>
        </div>

    </div>

</template>

<script>
import StaffList from "./content/staff-list.vue";
export default
{
    components:
    {
        StaffList,
    }
}
</script>

<style scoped>
.animate
{
    animation-duration: 1s;
    animation-fill-mode: none;
}
.animate-fade-in
{
    animation-name: fadeIn;
}

@keyframes fadeIn{
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}
.page-title {
    color: #007bff;
}
.button-color {
    background-color: #007bff;
    color: #ffffff;
}
</style>