<template>
  <div>
    <h1> search page</h1>
    分類 : <select v-model="newcategory1">
      <option v-for="cat in category" :key="cat.id" :value="cat.category1">{{ cat.category1 }}</option>
      </select><br>
    種類 : <select v-model="newcategory2">
      <option v-for="cat in category2" :key="cat.id" :value="cat.category2">{{ cat.category2 }}</option>
        </select><br>
    名前: <input v-model="newinfor_name" type="text">
    
    <p><button class="btn" @click="search">検索</button></p>
  </div>
</template>

<script>


export default {
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
    newcategory1:[],
    newcategory2:[],
    newinfor_name:[],
  }},
methods:{
  search(){
  }
},
  
computed: {

}}
</script>


<style scoped>

</style>