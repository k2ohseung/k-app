<template>
  <div>
    <h1>add page</h1>
    
    分類 : <select v-model="newcategory1">
      <option value="">分類</option><option>日用品</option><option>食材</option><option class="etc0">その他</option></select>
      <input type="text" :disabled="etc1" v-model="newcategory11"><br>
    種類 : <select v-model="newcategory2">
      <option disabled value="">種類</option>
        <option>キッチン用品</option><option>トイレ用品</option><option>野菜</option>><option>惣菜</option><option class="etc0">その他</option></select>
        <input type="text" :disabled="etc2" v-model="newcategory22"><br>
    販売先: <button @click="getCurrentPosition">現在地からから当てはまる店舗検索</button><br>
    値段: <input v-model="newinfor_p1" type="text">円 <br>
    入り数: <input v-model="newinfor_t1" type="text">
    <p><button class="btn" @click="addlist">追加</button></p>
  </div>
</template>

<script>

export default {
  data(){
    return {
      newcategory1: '',
      newcategory11: '',
      newcategory2: '',
      newcategory22: '',
      newinfor_p1:"",
      newinfor_t1:"",
    }
  },
methods:{
  addlist(){
    this.$store.commit("addlist",{
      category1:this.newcategory1,
      category11:this.newcategory11,
      category2:this.newcategory2,
      category22:this.newcategory22,
      infor_p1:this.newinfor_p1,
      infor_t1:this.newinfor_t1,
    })
    this.newcategory1=""
    this.newcategory11=""
    this.newcategory2=""
    this.newcategory22=""
    this.newinfor_p1=""
    this.newinfor_t1=""
    
  },
    
    
  
  getCurrentPosition(){

    },
    },




computed:{
  etc1() {
    return this.newcategory1 === 'その他' ? false : true
  },
  etc2() {
    return this.newcategory2 === 'その他' ? false : true
  },
  cate1list(){
    return this.$store.getters.filteredlist
  

  },
}

}
</script>


<style scoped>
.information_t1 {
margin-right: 5px;
}
  

</style>

