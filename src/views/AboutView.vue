<template>
  <div class="about">
    <div>{{word}}</div>
    <form :submit="onSubmitForm">
<input type="text" v-model="value">
<button type="submit">enter</button>
    </form>
    <div>{{result}}</div>
  </div>
</template>


<script>
export default {
  components:{
  },
  data(){
    return {
      word:"マウス",
      result:"aaa",
      value:"",
    }
  },
  methods:{
    
    onSubmitForm(e){
      e.preventDefault ();
      if(this.word[this.word.length - 1]===this.value[0]){
        this.result="正解";
        this.word=this.value;
        this.value="";
        }else{
          this.result="不正解";
          this.value="";
        }
      }
    }
  }


</script>