<template>
  <div>
    <h1> Search Page </h1>
    <input type="text" v-model="searchName">
    <p><button class="btn"  @click="search" >商品名で検索</button></p>
    <table >
      <thead>
        <tr>
            <th>商品名</th>
            <th>店舗名</th>
            <th>現在地からの距離</th>
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
    
      {{distta0}} 
  </div>
</template>

<script>


export default {


  data(){
      return {
        onoff:false,
        searchName:"",
        latitude: 0,
        longitude: 0,
        location0:"(店名)",
        location1:"座標",
        times:"",
        infor_p0:"",
        filter:null,
        distta0:"",
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
  
    search(){ 
      this.onoff=true
      
    }, 


    
    distta(lat, lng){
      let A = { x: lat, y: lng};
      return A
    },


  


    distta2(){
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
// https://qiita.com/kawanet/items/a2e111b17b8eb5ac859a 2箇所座標で距離キュとく
// https://teratail.com/questions/341461   vue.jsでボタンクリックで絞り込み検索結果を表示
// https://teratail.com/questions/178834?sort=2
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




