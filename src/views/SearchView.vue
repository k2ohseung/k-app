<template>
  <div>
    <h1> Search Page</h1>
    <input type="text" v-model="searchName">
    <p><button class="btn" @click="search">商品名で検索</button></p>
    <table v-if="onoff">
      <thead>
        <tr>
            <th>商品名</th>
            <th>店舗名</th>
            <th>現在地からの距離</th>
            <th>1個(m,g)あたり価格</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="infor2 in search_name" :key="infor2.id">
            <td>{{ infor2.name }}</td>
            <td>{{ infor2.location0 }}</td>
            <td>{{ infor2.distance }}m ,徒歩:{{times}}分</td>
            <td>{{ infor2.infor_p0 }}円</td>
        </tr>
    </tbody>
    </table>
  </div>
</template>

<script>


export default {

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
    
    search(){
      this.onoff=!this.onoff;
      //result に検索結果を代入するコード作成後、names,location0,distance,infor_p0を各々代入するコード作成
      // return this.names=this.infor,
      // console.log(this.names);
    },
  },
  data(){
    return {
      onoff:false,
      searchName:"",
      latitude: 0,
      longitude: 0,
      names:"",
      result:{},
      location0:"(店名)",
      location1:"座標",
      distance:"",
      times:"",
      infor_p0:"",
      infor_t1:"",
      filter:null,
    }
  },
  computed: {
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