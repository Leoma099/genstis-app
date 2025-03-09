<template>

    <div class="animate animate-fade-in">

        <p class="page-title mb-0">Create New User Account</p>

        <main-component v-if="$route.meta.subPage === 'main'" />

    </div>

</template>

<script>
import MainComponent from "./main";
export default
{
    name: 'Create',

    components:
    {
        MainComponent
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
    font-weight: 600;
    font-size: 1.5rem;
    color: #a200ff;
}
</style>