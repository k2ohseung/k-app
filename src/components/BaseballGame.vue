<template>
  <div>
    <h1>{{result}}</h1>

    <input ref="answer" minlength="4" maxlength="4" v-model="value">
    <button @click="onSubmitForm">入力</button>

    <div>試み:{{tries.length}}</div>
    <ul>
      <li v-for="t in tries" :key="t">
      <div>{{t.try}}</div>
      <div>{{t.result}}</div></li>
    </ul>
  </div>
</template>

<script>

const getNumbers=()=>{
  const cadidates=[1,2,3,4,5,6,7,8,9];
  const array=[];
  for(let i=0; i<4; i+=1){
    const chosen=cadidates.splice(Math.floor(Math.random()*(9-i)),1)[0];
    array.push(chosen);
    }
}
export default { 
  data(){
    return {
      answer:getNumbers(),
      tries:[],
      value:"",
      result:"",
    }
  },
  methods:{
    onSubmitForm(){
      if(this.value===this.answer.join("")){
        this.tries.push({
          try:this.value,
          result:"homerun"
        });
        this.result="homerun";
        alert("新しいゲームを始めます");
        this.tries=[];
        this.value="";
        this.$refs.answer.focus();
      }else{
        let strike=0;
        let ball=0;
        const answerArray=this.value.splice("").map(v=>parseInt(v));    //文字列を数字に変えるコード
        for(let i=0; i<4; i+=1){
          if(answerArray[i]===this.answer[i]){ //数字の桁まであった場合
            strike++;
          }else if(this.answer.includes(answerArray[i])){    //数字だけ一致
            ball++
          }
        }
        this.tries.push({
          try:this.value,
          result:`${strike} ストライク,${ball} ボールです`})
      this.value="",
      this.$refs.answer.focus();
            }
    }
  }
}
</script>

<style>

</style>