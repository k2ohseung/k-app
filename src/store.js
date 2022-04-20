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
        location:"その他",
        infor_p:"",
        infor_t1:"",
        infor_t2:"",
        
      },
      {
        id:2,
        category1:"日表品",
        category2:"ティッシュ",
        location:"コーナン",
        infor_p:"",
        infor_t1:"",
        infor_t2:"",
        
      },],
      nextinforId:3,
},
mutations:{
  addlist(state,{category1,category2}){
    state.infor.push({
      id:state.nextinforId,category1,category2,
    
    })
    state.nextinforId++
  },
},
getters:{
  filteredTasks(state){
    if(!state.filter){
      return state.tasks
    }
    return state.tasks.filter(task=>{
      return task.labelIds.indexOf(state.filter)>=0
    })
  }

}}
)



export default store