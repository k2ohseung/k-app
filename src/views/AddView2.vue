<template>  
  <div>
    <h3><p>Add page </p>  </h3>
    <hr>
      <li>全部入力する必要があります。<br>(入力が漏れてる場合は追加ができません)</li>
      <li>位置追加は地図で左クリックしたら入力されます
      <br>(<strong>"販売先の位置が選択されてません"</strong> がなくなったらOK)</li>
    <hr>
    <!-- 分類 : <select v-model="newcategory1">
      <option v-for="cat1 in category1List" :key="cat1" :value="cat1">{{ cat1 }}</option>
      </select><br>
        <input type="text" :disabled="etc1" v-model="newcategory11"><br>
    種類 : <select v-model="newcategory2"><br>
      <option v-for="cat2 in category2List" :key="cat2" :value="cat2">{{ cat2 }}</option>
        </select><br> -->
    単位 : <select v-model="newcategory3"><br>
      <option v-for="cat3 in category3List" :key="cat3" :value="cat3">{{ cat3 }}</option>
        </select><br>
        <input type="text" :disabled="etc3" v-model="newcategory33"><br>
    名前: <input v-model="name" type="text"><br>
    販売先: <input  id="hidden" v-model="newlocation1" ><input v-model="newlocation0" type="text"><br>
    (店舗名まで入力したら経路検索が容易になります)<br>
    値段(税込): <input v-model="newinfor_p1" type="number">円 <br>
    販売規格: <input   v-model="newinfor_t11" type="number">入り*
    <input   v-model="newinfor_t12" type="number">
    <p v-if="onoff2">入力されてない項目があります</p>
    <strong style=color:red;><p v-if="onoff">販売先の位置が選択されてません</p></strong>
      <p v-if="onoff==false">販売先の位置が選択されました</p>
    
    <p><button class="btn" :disabled="blank" @click="Addlist">追加</button></p>
    <!-- <label>メニュー画像：<input ref="imgUp" type="file" id="fileImg"></label> -->


    <!-- <button @click="imgUpload">IMGアップロード</button> -->
    <!-- <button @click="removeMenu(list.id, list.menuImgFile)">データ削除</button>  -->
    <gmap-map @click="place($event)" id="map" :zoom="19" :center="center" style="width:100%; height: 600px;" >
      <gmap-circle :center="center" :options="{ fillColor: '#0000FF', fillOpacity: 0.3, strokeWeight: 1, strokeColor: '#0000FF', radius: 25, clickable: false }" > </gmap-circle>
    </gmap-map> 
    
    
    <!-- <GM/> -->
  </div>
</template>

<script>
import {db,storage} from "@/firebase/firesbase";
import {collection ,serverTimestamp, addDoc , onSnapshot, query, orderBy, doc } from "firebase/firestore"
import {getDownloadURL, ref, uploadBytesResumable, deleteObject,where, getDocs,deleteDoc,} from 'firebase/storage';


export default {
  name:"App",

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
      list:[],
      id:0,
      category1:"",
      category2:"",
      name:"",
      location0:"",
      location1:[],
      infor_p0:"",
      infor_p1:"",
      infor_t1:"",
      center: {lat : "",lng : ""}, 
      existingPlace: null ,
      // newcategory1: '',
      // newcategory11: '',
      // newcategory2: '',
      // newcategory22: '',
      newcategory3: '',
      newcategory33: '',
      newinfor_p1:"",
      newinfor_t11:"",
      newinfor_t12:"",
      lat:"",
      lng:"",
      newlocation1:[this.lat,this.lng],
      newlocation0:"",
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
    Addlist(){
      addDoc(collection(db,"list"),{
        id:this.id+=1,
        // category1:this.newcategory1,
        // category2:this.newcategory2,
        category3:this.newcategory3,
        name:this.name,
        location0:this.newlocation0,
        location1:this.newlocation1,
        infor_p0:this.newinfor_p1/(this.newinfor_t11*this.newinfor_t12),
        infor_p1:this.newinfor_p1,
        infor_t11:this.newinfor_t11,
        infor_t12:this.newinfor_t12,
        written: serverTimestamp(),
        
        
        })
      .then((doc)=>{
        console.log(`データ追加に成功しました(${doc.id})`);
        //登録後てきすとをクリアにする
        this.name="";
        // this.newcategory1="";
        // this.newcategory2="";
        this.newlocation0="";
        this.newinfor_p1="";
        this.newinfor_t11="";
        this.newinfor_t12="";
        
      })
      .catch(error => {
        //エラー時の処理
        console.log(`データ追加に失敗しました(${error})`);
      })
    }, 
    place(event){
            if (event) {
              this.lat = event.latLng.lat()
              this.lng = event.latLng.lng()
              this.newlocation1[0]=this.lat
              this.newlocation1[1]=this.lng
            }
      },
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
    // save(){
    //   this.$store.dispatch("save")
    // },



      //クリックイベントで読み込み(現在OFFにしてる)  
  // restore(){
  //     this.$store.dispatch("restore")
  //   },
    // addlist(){
    // //現在ぺーじで入力されてる情報をstoreのaddlistに各項目で登録するメソッド
    //   this.$store.commit("addlist",{
    //     category1:this.newcategory1,
    //     category11:this.newcategory11,
    //     category2:this.newcategory2,
    //     category22:this.newcategory22,
    //     name:this.name,
    //     infor_p1:this.newinfor_p1,
    //     infor_p0:parseInt(this.newinfor_p1)/parseInt(this.newinfor_t1),
    //     infor_t1:this.newinfor_t1,
    //     location1: { lat:this.lat, lng: this.lng },
    //     location0:this.newlocation0
      
    //   })
    // //追加したら入力されてるのを空白にする
    //     this.newcategory1=""
    //     this.newcategory11=""
    //     this.newcategory2=""
    //     this.newcategory22="" 
    //     this.name=""
    //     this.newinfor_p1=""
    //     this.newinfor_t1=""
    //     this.newlocation1=""
    //     this.newlocation0=""
    // //追加したら入力されてるのを空白にする
    //   },
    // //テキストタグのcategori11をstoreのinforにpushする必要あり



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
  
  getCurrentPosition(){

    },
    

//常に更新
  computed:{
    onoff2(){
            return this.newcategory1===""||this.name==="" ||this.newcategory2===""||this.newinfor_p1===""||this.newinfor_t11===""||this.newinfor_t12===""||this.newlocation0===""? true : false
    },
    blank(){
      return this.newcategory1===""||this.name==="" ||this.newcategory2===""||this.newinfor_p1===""||this.newinfor_t11===""||""||this.newinfor_t12===""||this.newlocation0===""||this.lat==="" ? true : false
    },
    onoff(){
      return this.lat === '' ? true : false
    },
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
  //   category1List() {
  //     const result = this.list.map((item) => {
  //     return item.category1
  //   })
  //   //重複データを消す
      
  //     return new Set(result)
  // },
  //   category2List() {
      
  //     let result = this.list.map((item) => {
  //       if(this.newcategory1===item.category1 ){
  //     return item.category2 }
  //   })
  //   let result2=new Set(result)
  //   result2.delete(undefined)
  //       return result2
  // },
  category3List() {
      
      let result = this.list.map((item) => {
      return item.category3 
    })
    let result3=new Set(result)
    result3.delete(undefined)
        return result3
  },
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

