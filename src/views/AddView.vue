<template>
  <div>
    <h1>add page</h1>
    分類 : <select v-model="category1">
      <option disabled value="">分類</option><option>a</option></select><br>
    種類 : <select v-model="category2">
      <option disabled value="">種類
        </option><option>b</option><option>bbbbbb2</option><option>その他</option></select><br>
    販売先: <button @click="getCurrentPosition">現在地からから当てはまる店舗検索</button><br>
    値段: <input class="information_p" type="text">円<br>
    販売形式: <input class="information_t1" type="text">入り数 : <input class="information-t2" type="text"><br>
    <p><button class="btn" @click="addlist">追加</button></p>
  </div>
</template>

<script>

export default {
  data(){
    return {
      category1: '',
      category2: '',
      choice:false,
      
    }
  },
methods:{
  addlist(){
    this.$store.commit("addlist",{
      category1:this.newcategory1,
      category2:this.newcategory2,
    })
    this.newcategory1=""
    this.newcategory2=""
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

