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
        category1:"日表品",
        category2:"ティッシュ",
        name:"",
        location:"コーナン",
        infor_p0:22,
        infor_p1:1100,
        infor_t1:50,
      },],
      nextinforId:3,
      filter:null
},
mutations:{
  addlist(state,{category1,category11,category2,category22,infor_p1,infor_t1}){
    state.infor.push({
      id:state.nextinforId,category1,category11,category2,category22,infor_p1,infor_t1
    
    })
    state.nextinforId++
  },
},
getters:{
  filteredlist(state){
    if(!state.filter){
      return state.infor
    }
    return state.infor.filter(task=>{
      return task.category2.indexOf(state.filter)>=0
    })
      } 
  }
}
)



export default store