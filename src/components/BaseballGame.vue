<template>
  <div>
    <h1>{{result}}</h1>

    <input ref="answer" minlength="4" maxlength="4" v-model="value">
    <button  @click="numbercheck">入力</button>

    <div>試み:{{tries.length}}</div>
    <ul>
      <li v-for="t in tries" :key="t.index">
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
    }return array;
};
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
    
    numbercheck(){
      if(this.value===this.answer.join("")){   //answerは配列の値、joinを使って文字列に変換
        this.tries.push({
          try:this.value,
          result:"ホームラン"
        });
        this.result="ホームラン";
        alert("正解！新しいゲームを始めます");
        this.tries=[];
        this.value="";
        this.answer=getNumbers();
        this.$refs.answer.focus();
      }else{
        if(this.tries.length>=9){
          this.result=``;
          alert(`10回 間違いましたので失敗！答えは ${this.answer.join(',')}でした。`);
          alert("新しいゲームを始めます。");
          this.tries=[];
          this.answer=getNumbers();
          this.value="";
          this.$refs.answer.focus();
        }
        let strike=0;
        let ball=0;
        const answerArray=this.value.split('').map(v=>parseInt(v));    //文字列を分離して配列に変えるコード
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