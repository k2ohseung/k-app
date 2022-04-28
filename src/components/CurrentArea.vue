<template>
  <div>
  現在位置： {{latitude}}、{{longitude}}
    
  </div>
</template>

<script>
export default {
data(){
    return {
      latitude: 0,
      longitude: 0
  }},


mounted() {
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
}
</script>

<style>

</style>