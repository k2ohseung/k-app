<template> 
  <div>       
    <gmap-map @click="place($event)" id="map" :zoom="19" :center="center" style="width:100%; height: 600px;" >
      <gmap-circle :center="center" :options="{ fillColor: '#0000FF', fillOpacity: 0.3, strokeWeight: 1, strokeColor: '#0000FF', radius: 25, clickable: false }" > </gmap-circle>
    </gmap-map> 
  </div> 
</template> 
<script>

  export default { 
    data() { 
      return { 
        center: {lat : "",lng : ""}, 
        locPlaces: [], 
        locationMarkers: [ { position: this.center } ],
        existingPlace: null 
        }; 
        },
    methods:{
      place(event){
            if (event) {
                var lat = event.latLng.lat()
                var lng = event.latLng.lng()
                console.log(lat + ", " + lng)
            }
      }
    },
    mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position){
          let coords = position.coords;
          this.center.lat = coords.latitude;
          this.center.lng = coords.longitude;
        }.bind(this),
      );
    }
  },

  }; 
</script>

