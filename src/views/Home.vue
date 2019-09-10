<template>
  <div class="home">
    <ToDoList msg="Твой список дел на сегодня"/>
  </div>
</template>

<script>
// @ is an alias to /src
// import ToDoList from '@/components/ToDoList.vue'
import ToDoList from '../components/ToDoList'

export default {
  name: 'home',
  components: {
    ToDoList
  }
}
</script>
<style>
  .home {
    display: flex;
  }
</style>