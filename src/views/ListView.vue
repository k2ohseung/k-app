<template>
  <div>
    <h1>list page</h1>
    <p>商品名 : {{name}} </p>  <p>販売先 : {{location[1]}}</p><p>販売情報 : </p>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default {
data(){
  return {
    location:["コーナン","セリア"],
    name:["ポリ袋", "ゴミ箱"],
    category:["その他","日用品"],
    information_p:[],
    information_t1:[],
    information_t2:[],

  }
}
}
</script>
