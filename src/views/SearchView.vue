<template>
  <div>
    <h3> Search Page </h3>
    <hr>
      <div class="reff"><li>商品名で検索できます</li>
    <li>近いところから表示されます</li>
    <li>距離は直線距離なので多少は誤差があります</li>
      </div>
    <hr>
    <input type="text" v-model="searchName">
    <div>
      <!-- 現在地からデータまでの距離を算出するコード必要 -->
    <!-- <table>
      <th class="blues">近い順</th>
      <th v-for="(infor2,index) in search_name" :key="index">
          <tr>{{index+1}}</tr></th> 
    </table> -->
    <table><th class="blues">商品名</th>
          <th v-for="(infor2,index) in search_name" :key="index">
          <tr>{{infor2.name}}</tr></th>
    </table>
    
    
    <table>
      <th class="blues">1個(m,g)あたり価格(税込)</th>
      <th v-for="(infor2,index) in search_name" :key="index">
          <tr>{{ infor2.infor_p0.toLocaleString({ maximumFractionDigits: [3] })}} 円</tr></th> 
    </table>
    <table>
      <th class="blues">販売規格(個,m,g,ml)</th>
      <th v-for="(infor2,index) in search_name" :key="index">
          <tr>{{ infor2.infor_t11 }}    入り   *  {{ infor2.infor_t12 }}  ({{ infor2.category3 }})</tr></th> 
    </table>
    <table>
      <th class="blues">販売価格(税込)</th>
      <th v-for="(infor2,index) in search_name" :key="index">
          <tr>{{ infor2.infor_p1 }} 円</tr></th> 
    </table>
    <table>
      <th class="blues">現在地からの距離</th>
      <th v-for="(infor2,index) in search_name" :key="index">
          <tr>約  {{distance(latitude,longitude,infor2.location1[0],infor2.location1[1]).toFixed(2)}}km</tr></th> 
    </table>
    <table>
      <th class="blues">現在地からの徒歩</th>
      <th v-for="(infor2,index) in search_name" :key="index">
          <tr>約  {{Math.floor(distance(latitude,longitude,infor2.location1[0],infor2.location1[1])*15)}}分</tr></th> 
    </table>
    <table>
      <th class="blues">店に行く(正確度 <strong style=color:red>中</strong>)</th>
      <th v-for="(infor2,index) in search_name" :key="index">
          <tr><a target="_blank" :href='"https://www.google.com/maps/search/?api=1&query="+(infor2.location1[0])+"%2C"+(infor2.location1[1])'>{{ infor2.location0 }}</a>  </tr></th> 
    </table>
    <table>
      <th class="blues">店に行く(正確度 <strong style=color:red>高</strong>)</th>
      <th v-for="(infor2,index) in search_name" :key="index">
          <tr><a target="_blank" :href='"https://www.google.com/maps/search/?api=1&query="+(infor2.location0)'>{{ infor2.location0 }} </a></tr></th> 
    </table>
    <table>
      <th class="blues">更新日</th>
      <th v-for="(infor2,index) in search_name" :key="index">
          <tr>{{ infor2.written.toDate().toLocaleString() }}</tr></th> 
    </table>
          </div>
  </div>
</template>
//
<script>
import {db, storage} from "@/firebase/firesbase";
import {collection  , doc, onSnapshot, query, orderBy, } from "firebase/firestore"
import {getDownloadURL, ref, uploadBytesResumable, deleteObject,where, getDocs,deleteDoc,} from 'firebase/storage';

export default {


  data(){
      return {
        list:[],
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
    const q = query(collection(db,`list`),orderBy("infor_p0"))
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
          // console.log('added',change.doc.data())
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
      
      return this.list.filter(infor => {
        if(this.searchName.length>0)
          return infor.name.includes(this.searchName)
        })
      
    },
  },
  methods:{
    async removeMenu(id, photo) {
      //削除ボタンをクリックした商品データをfirestore内から削除
      const delQuery = query(collection(db, 'list'), where('id', '==', id))
      const delSnapshot = await getDocs(delQuery);
      delSnapshot.forEach((delSnap) => {
        // console.log(doc.id, " => ", doc.data());
        console.log(delSnap.id);
        deleteDoc(doc(db, 'list', delSnap.id));
      });
      //storage内の画像データも同時に削除
      if(photo) {
        const delPhotoRef = ref(storage, `images/${photo}`);
        deleteObject(delPhotoRef).then(() => {
          console.log("Photo deleted successfully")
        }).catch((error) => {
          console.log("Error Photo deleted", error)
        });
        // console.log('インデックス',id);
      }

    },
    imgUpload() {
      //ファイルの取得
      this.file = this.$refs.imgUp.files[0];
      //画像ファイルへの参照を作成
      const userImageRef = ref(storage, `images/${this.file.name}`)
      //画像ファイルのアップロードメソッド
      uploadBytesResumable(userImageRef, this.file).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
        getDownloadURL(snapshot.ref)
        .then((downloadURL) => {
          //firestoreにURLとファイル名を保存するため
          this.menuImgUrl = downloadURL;
          this.menuImgFile = this.file.name;
          console.log('Success!', downloadURL);
        })
        .catch((error) => {
          console.error(error)
        })
      });
    },
    
  }
  }

</script>


<style scoped>
  table{
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    border:1;
    word-break:break-all
    }
    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
    .blues{
        color:white;
        background-color: #1E90FF;
    }
</style>




