<template>
  <div class="home">
    <HelloWorld msg="Твой список дел на сегодня"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
<style>
  .home {
    display: flex;
  }
</style>