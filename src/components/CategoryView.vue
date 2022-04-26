<template>
  <div>
  分類 : <select v-model="newcategory1">
      <option v-for="cat1 in category1List" :key="cat1" :value="cat1">{{ cat1 }}</option><br>
      </select><br>
      <!-- <form @submit.prevent="addCategory()"> -->
        <input type="text" :disabled="etc1" v-model="newcategory11"><br>
      <!-- </form> -->
    種類 : <select v-model="newcategory2"><br>
      <option v-for="cat2 in category2List" :key="cat2" :value="cat2">{{ cat2 }}</option><br>
        </select><br> 
        <!-- <form @submit.prevent="addCategory2()"> -->
        <input type="text" :disabled="etc2" v-model="newcategory22">
        <!-- </form><br> -->
        <br>
        名前: <input v-model="name" type="text"><br>
  </div>
</template>

<script>
export default {
  data(){
    return {
      name:"",
      newcategory1: '',
      newcategory11: '',
      newcategory2: '',
      newcategory22: '',
    }
  },
  methods:{
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
  

  },

  
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

<style>

</style>