<template>
    <div>{{remaining}} items left</div>
</template>
<script>
export default {
    name: 'ToDoItemsRemaining',
    props: {
        remaining: {
            type: Number,
            required: true,
        }
    }
}
</script>
<style>
</style>