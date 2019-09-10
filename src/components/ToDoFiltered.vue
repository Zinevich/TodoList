<template>
    <div>
        <ElButton size="small"
                  plain class="filterButton"
                  @click="changeFilter('all')"
                  :class="{active: filter == 'all'}">All</ElButton>
        <ElButton size="small"
                  plain class="filterButton"
                  @click="changeFilter('active')"
                  :class="{active: filter == 'active'}">Active</ElButton>
        <ElButton size="small"
                  plain class="filterButton"
                  @click="changeFilter('completed')"
                  :class="{active: filter == 'completed'}">Completed</ElButton>
    </div>
</template>
<script>
    export default {
        name: 'ToDoFiltered',
        data() {
          return {
              filter: 'all',
          }
        },
        methods: {
            changeFilter(filter) {
              this.filter = filter;
                // eslint-disable-next-line no-undef
              eventBus.$emit('filterChange', filter)
            },
        },

    }
</script>
<style>
</style>