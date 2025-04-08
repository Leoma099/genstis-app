<template>
    <div>
        <p class="mb-0">
            <span class="vh-text-bold">
                {{ item.notified_by.full_name }}
            </span>{{ item.message }}.
        </p>
    </div>
</template>

<script>
export default
{
    props:
    {
        item: Object,
    },
}
</script>