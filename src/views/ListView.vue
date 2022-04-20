<template>
  <div>
    <h1>list page</h1>
    <p>商品名 : {{category2}} </p>  <p>販売先 : {{}}</p><p>販売情報 : </p>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default {

  
data(){
  return {
    location:["コーナン","その他"],
    category2:["ポリ袋", "その他"],
    category1:["その他","日用品"],
    infor_p:"",
    infor_t1:"",
    infor_t2:"",

  }
},
  computed:{
    addlist(){
      return this.$store.getters.filteredTasks
    },
}
}

</script>
