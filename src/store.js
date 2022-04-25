import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    infor:[
      {
        id:1,
        category1:"その他",
        category2:"その他",
        name:"",  
        location:"その他",
        infor_p0:1000,
        infor_p1:10000,
        infor_t1:10,
      },
      {
        id:2,
        category1:"日用品",
        category2:"ティッシュ",
        name:"",
        location:"コーナン",
        infor_p0:22,
        infor_p1:1100,
        infor_t1:50,
      },
      {
        id:3,
        category1:"日用品",
        category2:"トイレットペーパー",
        name:"",
        location:"コーナン",
        infor_p0:22,
        infor_p1:1100,
        infor_t1:50,
      },
      {
        id:3,
        category1:"食品",
        category2:"ソーセージ",
        name:"",
        location:"ライフ",
        infor_p0:22,
        infor_p1:1100,
        infor_t1:50,
      },
    ],
    nextinforId:3,
    filter:null
},
actions:{
  save({state}){
    const data={
      infor:state.infor,
      nextinforId:state.nextinforId

    }
    localStorage.setItem("k-app",JSON.stringify(data))
  },
  restore({commit}){
    const data=localStorage.getItem("k-app")
    if(data){
      commit("restore",JSON.parse(data))
    }
  }

  // restore({commit}){   参照コード 
  //   const data=localStorage.getItem("task-app-data")
  //   if(data){
  //     commit("restore",JSON.parse(data))
  //   }
  // }


  },
mutations:{
  restore(state,{infor,nextinforId}){
    state.infor=infor
    state.nextinforId=nextinforId
  },

  
  // restore(state,{tasks,labels,nextTaskId,nextLabelId}){  参照コード 
  //   state.tasks=tasks
  //   state.labels=labels
  //   state.nextTaskId=nextTaskId
  //   state.nextLabelId=nextLabelId
  // }


  addlist(state,{category1,category11,category2,category22,infor_p1,infor_t1}){
    state.infor.push({
      id:state.nextinforId,category1,category11,category2,category22,infor_p1,infor_t1
    
    })
    state.nextinforId++
  },
},
getters:{
  // filteredlist(state){
    // if(!state.filter){
    //   return state.infor
    // }
    // return state.infor.filter(task=>{
    //   return task.category1.indexOf(state.filter)>=0
    // })
    //   },
    // cate1list(state){

    // //return state.infor.category1
    // if(!state.filter){
    // return state.infor
    // }
    // return state.infor.filter(catelist1=>{
    //   return catelist1.category1.indexOf(state.filter)>=0
    // })
    // }
  },

})



export default store