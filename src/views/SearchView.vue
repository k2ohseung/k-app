<template>
  <div>
    <h1> Search Page</h1>
  <CategoryView/>
  
    
    <p><button class="btn" @click="search">検索</button></p>
  </div>
</template>

<script>
import CategoryView from '@/components/CategoryView.vue'


export default {
  components:{
    CategoryView
  },
  data(){
    return {
  }},
methods:{
  search(){
  }
},
  
computed: {

}}
</script>


<style scoped>

</style>