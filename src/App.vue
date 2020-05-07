<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      get userName() {
        return localStorage.getItem('userName');
      },
      set userName(val) {
        localStorage.setItem('userName', this.userName);
      }
    }
  }
}
</script>

<style>
</style>
