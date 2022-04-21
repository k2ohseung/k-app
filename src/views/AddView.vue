<template>
  <div>
    <h1>add page</h1>

    分類 : <select v-model="newcategory1">
      <option v-for="cat in category" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
      </select>
      <form @submit.prevent="addCategory()">
        <input type="text" :disabled="etc1" v-model="newcategory11"><br>
      </form>
    種類 : <select v-model="newcategory2">
      <option v-for="cat in category2" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
        </select>
        <form @submit.prevent="addCategory2()">
        <input type="text" :disabled="etc2" v-model="newcategory22">
        </form><br>
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
      category: [
        { id: 1, name: '日用品' },
        { id: 2, name: '食材' },
        { id: 3, name: 'その他' }
      ],
      category2:[
        { id: 1 ,name :"ごま油"},
        { id: 2 ,name :"トイレットペーパ"},
        { id: 3 ,name :"その他"},
      ],
      nextCategoryId: 4,
      nextCategory22Id:4,
      newcategory1: '',
      newcategory11: '',
      newcategory2: '',
      newcategory22: '',
      newinfor_p1:"",
      newinfor_t1:"",
    }
  },
methods:{
  addCategory() {
    this.category.push({ id: this.nextCategoryId, name: this.newcategory11})
    this.nextCategoryId++
    this.newcategory11=""
  },
  addCategory2() {
    this.category2.push({ id: this.nextCategoryId, name: this.newcategory22})
    this.nextCategory22Id++
    this.newcategory22=""
  },
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
    //categori11 をcategori に戻す必要あり
    
  
  getCurrentPosition(){

    },
    },




computed:{
  // infor(){
  //   return this.$store.state.infor
  // },
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

