<template>
  <div>
    <h1>list page</h1>
    <div>
    <input v-if="false" type="text" v-model="searchName">
        <table >
      <thead>
        <tr>
            <th>商品名</th>
            <th>店舗名</th>
            <th>現在地からの直線距離,時間</th>
            <th>1個(m,g)あたり価格</th>
            <th>販売規格(個,m,g)</th>
        </tr>
      </thead>
      <tbody v-if="true">
        <tr v-for="infor2 in search_name" :key="infor2.id">
            <td>{{ infor2.name }}</td>
            <!-- <td><a target="_blank" :href='"https://www.google.com/search?q=" + (infor2.location1.lat)+"%2C"+(infor2.location1.lng)'>{{ infor2.location0 }}</a></td> -->
            <td>(座標検索)<a target="_blank" :href='"https://www.google.com/maps/search/?api=1&query="+(infor2.location1.lat)+"%2C"+(infor2.location1.lng)'>{{ infor2.location0 }}</a>  (店名検索)<a target="_blank" :href='"https://www.google.com/maps/search/?api=1&query="+(infor2.location0)'>{{ infor2.location0 }} </a></td>
            <td>{{distance(latitude,longitude,infor2.location1.lat,infor2.location1.lng).toFixed(2)}}km,     徒歩:約{{Math.floor(distance(latitude,longitude,infor2.location1.lat,infor2.location1.lng)*15)}}分</td>
            <td>{{ infor2.infor_p0.toLocaleString({ maximumFractionDigits: [3] })}}円</td>
            <td>{{ infor2.infor_t1 }}</td>
        </tr>
    </tbody>
    </table>
  </div>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import {db} from "@/firebase/firesbase";
import {collection ,   onSnapshot, query, orderBy, } from "firebase/firestore"

export default {

  
data(){
      return {
        searchName:"",
        latitude: 0,
        longitude: 0,
        location0:"(店名)",
        location1:"座標",
        times:"",
        infor_p0:"",
        filter:null,
      }
      
    },
    mounted() {
      const q = query(collection(db,`list`),orderBy("id"))
    onSnapshot(q,snapshot=>{
      const allId=snapshot.docs.map(doc =>{
        return doc.data().id;
      })
      if(allId.length>0){
        this.id=allId.reduce((a,b)=>a>b ? a:b);
      }
    snapshot.docChanges().forEach(change =>{
      if(change.type === 'added'){
        this.list.push(change.doc.data());
          console.log('added',change.doc.data())
          }
      if(change.type === 'removed') {
          console.log('removed', change.doc.data());
          const currentArry = this.list.filter(menu => {
            return menu.id !== change.doc.data().id;
          })
          this.list = currentArry;
        }
    })
  })
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
    distance() {
      // 関数の返り値に別の関数を定義し、別の関数内で引数を受け取ってあげる
      return function(lat0,lng0,lat,lng) {
        let disx=lat0-lat;
        let disy=lng0-lng;
      let result1=Math.sqrt(Math.abs(disx*disx) + Math.abs(disy*disy))*100;
      return result1
      }
    },
    onoff(){
      if(this.searchName===""){
        return false}
        else{
          return true}
      },
    
    infor(){
      return this.$store.state.infor
    },
    search_name(){
      return this.infor.filter(infor => {
          return infor.name.includes(this.searchName)
        })
      
    },
  },

}

</script>

<style scoped>

table{
        border-collapse: collapse;
        width:100%
    }
    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
    th {
        color:white;
        background-color: #1E90FF;
    }
</style>