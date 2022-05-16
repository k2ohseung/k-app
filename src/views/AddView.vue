<template>  
  <div>
    <h1>add page</h1>
    <!-- <CategoryView/> -->
    <hr>
    分類 : <select v-model="newcategory1">
      <option v-for="cat1 in category1List" :key="cat1" :value="cat1">{{ cat1 }}</option>
      </select><br>
      <!-- <form @submit.prevent="addCategory()"> -->
        <input type="text" :disabled="etc1" v-model="newcategory11"><br>
      <!-- </form> -->
    種類 : <select v-model="newcategory2"><br>
      <option v-for="cat2 in category2List" :key="cat2" :value="cat2">{{ cat2 }}</option>
        </select><br>
        <!-- <form @submit.prevent="addCategory2()"> -->
        <input type="text" :disabled="etc2" v-model="newcategory22"><br>
        <!-- </form><br> -->
    名前: <input v-model="name" type="text"><br>
    販売先: <input  id="hidden" v-model="newlocation1" ><input v-model="newlocation0" type="text"><br>
    値段: <input v-model="newinfor_p1" type="number">円 <br>
    内容量: <input v-model="newinfor_t1" type="number">
    <p><button class="btn" @click="addlist">追加</button></p>
    <!-- 保存メソッド -->
    <p><button class="btn" @click="save">保存</button></p>
    <!-- <p><button class="btn" @click="restore">restore</button></p> -->
    <gmap-map @click="place($event)" id="map" :zoom="18" :center="center" style="width:100%; height: 600px;" >
      <gmap-circle :center="center" :options="{ fillColor: '#0000FF', fillOpacity: 0.3, strokeWeight: 1, strokeColor: '#0000FF', radius: 25, clickable: false }" > </gmap-circle>
    </gmap-map> 
    
    
    <!-- <GM/> -->
  </div>
</template>

<script>
// import CategoryView from '@/components/CategoryView.vue'
// import GM from '@/components/GoogleMap.vue'
export default {
  components:{
    // GM
  // CategoryView
  },

  //ページ読み込んだら自動読み込み
  created(){
    this.$store.dispatch("restore");

  },
  data(){
    return {
      center: {lat : "",lng : ""}, 
      locPlaces: [], 
      existingPlace: null ,
      name:"",
      nextCategoryId: 4,
      nextCategory22Id:4,
      newcategory1: '',
      newcategory11: '',
      newcategory2: '',
      newcategory22: '',
      newinfor_p1:"",
      newinfor_t1:"",
      lat:"",
      lng:"",
      newlocation1:[this.lat,this.lng],
      newlocation0:"",
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
  methods:{
    place(event){
            if (event) {
              this.lat = event.latLng.lat()
              this.lng = event.latLng.lng()
              this.newlocation1[0]=this.lat
              this.newlocation1[1]=this.lng
            }
      },
  //テキスト入力してエンター押したらcategory にpushされる
  //newcategory11はテキストタグ1の変数
  // addCategory() {
  //   this.category.push({ id: this.nextCategoryId, category1: this.newcategory11})
  //   this.nextCategoryId++
  //   this.newcategory11=""
  // },
  //newcategory22はテキストタグ2の変数
  // addCategory2() {
  //   this.category2.push({ id: this.nextCategory22Id, category2: this.newcategory22})
  //   this.nextCategory22Id++
  //   this.newcategory22=""
  // },
  //テキスト入力してエンター押したらcategory にpushされる

//ローカルストレジに保存するメソッド
    save(){
      this.$store.dispatch("save")
    },



      //クリックイベントで読み込み(現在OFFにしてる)  
  // restore(){
  //     this.$store.dispatch("restore")
  //   },
    addlist(){
    //現在ぺーじで入力されてる情報をstoreのaddlistに各項目で登録するメソッド
      this.$store.commit("addlist",{
        category1:this.newcategory1,
        category11:this.newcategory11,
        category2:this.newcategory2,
        category22:this.newcategory22,
        name:this.name,
        infor_p1:this.newinfor_p1,
        infor_p0:parseInt(this.newinfor_p1)/parseInt(this.newinfor_t1),
        infor_t1:this.newinfor_t1,
        location1: { lat:this.lat, lng: this.lng },
        location0:this.newlocation0
      
      })
    //追加したら入力されてるのを空白にする
        this.newcategory1=""
        this.newcategory11=""
        this.newcategory2=""
        this.newcategory22="" 
        this.name=""
        this.newinfor_p1=""
        this.newinfor_t1=""
        this.newlocation1=""
        this.newlocation0=""
    //追加したら入力されてるのを空白にする
      },
    //テキストタグのcategori11をstoreのinforにpushする必要あり
    
  
  getCurrentPosition(){

    },
    },

//常に更新
  computed:{
    infor(){
      return this.$store.state.infor
    },
    etc1() {
      return this.newcategory1 === 'その他' ? false : true
    },
    etc2() {
    return this.newcategory2 === 'その他' ? false : true
    },
  //store のinforから抽出してcategory1を取り出す
    category1List() {
      const result = this.infor.map((item) => {
      return item.category1
    })
    //重複データを消す
      return new Set(result)
  },
    category2List() {
      const result = this.infor.map((item) => {
      return item.category2
    })
      return new Set(result)
  }
  },
}
</script>


<style scoped>
.information_t1 {
margin-right: 5px;
}
  #hidden{
    display:none;
  }

</style>

