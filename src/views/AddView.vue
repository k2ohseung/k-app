<template>
  <div>
    <h1>add page</h1>

    分類 : <select v-model="newcategory1">
      <option v-for="cat in category" :key="cat.id" :value="cat.category1">{{ cat.category1 }}</option>
      </select>
      <form @submit.prevent="addCategory()">
        <input type="text" :disabled="etc1" v-model="newcategory11"><br>
      </form>
    種類 : <select v-model="newcategory2">
      <option v-for="cat in category2" :key="cat.id" :value="cat.category2">{{ cat.category2 }}</option>
        </select>
        <form @submit.prevent="addCategory2()">
        <input type="text" :disabled="etc2" v-model="newcategory22">
        </form><br>
    販売先: <button @click="getCurrentPosition">現在地からから当てはまる店舗検索</button><br>
    値段: <input v-model="newinfor_p1" type="text">円 <br>
    内容量: <input v-model="newinfor_t1" type="text">
    <p><button class="btn" @click="addlist">追加</button></p>
    <p><button class="btn" @click="save">保存</button></p>
    <!-- <p><button class="btn" @click="restore">restore</button></p> -->
  </div>
</template>

<script>

export default {

  //ページ読み込んだら自動読み込み
  created(){
    this.$store.dispatch("restore");
    // this.cate1=this.$store.state.infor;
    // this.cate2=this.$store.state.infor;
  },
  data(){
    return {
      category: [
        { id: 1, category1: '日用品' },
        { id: 2, category1: '食材' },
        { id: 3, category1: 'その他' }
      ],
      category2:[
        { id: 1 ,category2 :"ごま油"},
        { id: 2 ,category2 :"トイレットペーパ"},
        { id: 3 ,category2 :"その他"},
      ],
      nextCategoryId: 4,
      nextCategory22Id:4,
      newcategory1: '',
      newcategory11: '',
      newcategory2: '',
      newcategory22: '',
      newinfor_p1:"",
      newinfor_t1:"",
      cate1:[],
      cate2:[],
    }
  },
methods:{
  //テキスト入力してエンター押したらcategory にpushされる
  //newcategory11はテキストタグ1の変数
  addCategory() {
    this.category.push({ id: this.nextCategoryId, category1: this.newcategory11})
    this.nextCategoryId++
    this.newcategory11=""
  },
  //newcategory22はテキストタグ2の変数
  addCategory2() {
    this.category2.push({ id: this.nextCategory22Id, category2: this.newcategory22})
    this.nextCategory22Id++
    this.newcategory22=""
  },
  //テキスト入力してエンター押したらcategory にpushされる


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
      infor_p1:this.newinfor_p1,
      infor_t1:this.newinfor_t1,
    })

    //追加したら入力されてるのを空白にする
    this.newcategory1=""
    this.newcategory11=""
    this.newcategory2=""
    this.newcategory22=""
    this.newinfor_p1=""
    this.newinfor_t1=""
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
  }
}

}
</script>


<style scoped>
.information_t1 {
margin-right: 5px;
}
  

</style>

