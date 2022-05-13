<template>
  <div>
    <h1> Search Page </h1>
    <input type="text" v-model="searchName">
        <table >
      <thead>
        <tr>
            <th>商品名</th>
            <th>店舗名</th>
            <th>現在地からの直線距離,時間</th>
            <th>1個(m,g)あたり価格</th>
        </tr>
      </thead>
      <tbody v-if="onoff">
        <tr v-for="infor2 in search_name" :key="infor2.id">
            <td>{{ infor2.name }}</td>
            <td>{{ infor2.location0 }}</td>
            <td>{{ distta(infor2.location1.lat, infor2.location1.lng) }}m ,徒歩:約{{times}}分</td>
            <td>{{ infor2.infor_p0 }}円</td>
        </tr>
    </tbody>
    </table>
    <button @click="calexe">btn</button>
    
  </div>
</template>

<script>


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
  
        
  //ページ開いたときに位置情報取得
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
  methods:{
    distta(lat, lng){
      let A = { x: lat, y: lng};
      return A},

    //   34.691092        現在地
    //   135.4969214      現在地
    //   34.69403710491371      セブンイレブン 福島店
    //   135.4871158286522      セブンイレブン 福島店  
    // 移動経路  1.4km 直線距離 0.96km
  //calexe は直線距離計算メソッド
  calexe(){
    let x1 = 34.691092; //現在地    this.latitude
    let y1 = 135.4969214;    //現在地    this.longitude
    let x2 = 34.69403710491371; //目的地    filterされた  search_name.lat
    let y2 = 135.4871158286522;    //目的地     filterされた  search_name.lng]



    let dis_x = x1 - x2;  
    let dix_y = y1 - y2;
    let result1 = Math.sqrt(Math.abs(dis_x*dis_x) + Math.abs(dix_y*dix_y))*100;
    console.log(result1);
    }
    
  },


  computed: {
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
      
      {return this.infor.filter(infor => {if(this.searchName.length>0)
          return infor.name.includes(this.searchName)
        })
    }

  }}}

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




