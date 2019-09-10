<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> /
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 20px;
  min-width: 230px;
  max-width: 600px;
  margin: 20px auto 0;
  display: block;
  background: white;
  border-radius: 15px;
}
</style>
