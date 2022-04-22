<template>
  <div>
    <h1>list pagess</h1>
    <ul>
      <li v-for="list in addlist" :key="list.id"></li>
    </ul>
    <p>商品名 : </p>  <p>販売先 : {{}}</p><p>販売情報 : </p>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default {

  
data(){
  return {

  }
},
  computed:{
    addlist(){
      return this.$store.getters.filteredlist
    },
    
}
}

</script>
