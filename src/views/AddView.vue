<template>
  <div>
    <h1>add page</h1>
    分類 : <select v-model="newcategory1">
      <option disabled value="">分類</option><option>a</option></select><br>
    種類 : <select v-model="newcategory2">
      <option disabled value="">種類
        </option><option>b</option><option>bbbbbb2</option><option>その他</option></select><br>
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
      newcategory2: '',
      newinfor_p1:"",
      newinfor_t1:"",
    }
  },
methods:{
  addlist(){
    this.$store.commit("addlist",{
      category1:this.newcategory1,
      category2:this.newcategory2,
      infor_p1:this.newinfor_p1,
      infor_t1:this.newinfor_t1,
    })
    this.newcategory1=""
    this.newcategory2=""
    this.newinfor_p1=""
    this.newinfor_t1=""
    
  },
  getCurrentPosition(){

  },


},

}
</script>


<style scoped>
.information_t1 {
margin-right: 5px;
}
  

</style>

