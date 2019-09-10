<template>
    <div>
        <input type="checkbox"
               :checked="anyRemanining"
               @change="allChecked">
        <span>Check All</span>
    </div>
</template>
<script>
export default {
    name: 'ToDoCheckAll',
    props: {
        anyRemaining: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        allChecked() {
          eventBus.$emit('checkAllChanged', this.anyRemaining)
        },
    }
}
</script>
<style>

</style>