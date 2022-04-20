<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/addlist">Addlist</router-link> |
      <router-link to="/search">Search</router-link> |
      <router-link to="/list">List</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>

export default {

}
</script>


<style>

</style>
