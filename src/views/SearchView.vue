<template>
  <div>
    <h1> Search Page</h1>
  <CategoryView/>
  <!-- 現在位置取得 -->
  現在位置：
  {{latitude}}、{{longitude}}
    
    <p><button class="btn" @click="search">検索</button></p>
  </div>
</template>

<script>
import CategoryView from '@/components/CategoryView.vue'


export default {
  components:{
    CategoryView
  },
  methods:{
  search(){
  }
},
  
  data(){
    return {
      latitude: 0,
      longitude: 0
  }},


mounted() {
  //現在位置取得
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position){
          let coords = position.coords;
          this.latitude = coords.latitude;
          this.longitude = coords.longitude;
        }.bind(this),
      );
    }
  },
  computed: {

},
} 
</script>


<style scoped>

</style>