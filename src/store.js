import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    infor:[
      {
        id:1,
        category1:"食材",
        category2:"その他",
        name:"",  
        location0:"",
        location1:"",
        infor_p0:"1",
        infor_p1:"300",
        infor_t1:"1",
      },
      {
        id:2,
        category1:"日用品",
        category2:"その他",
        name:"",
        location0:"",
        location1:"",
        infor_p0:50,
        infor_p1:500,
        infor_t1:10,
      },
      {
        id:3,
        category1:"日用品",
        category2:"キッチン用品",
        name:"",
        location0:"",
        location1:"",
        infor_p0:20,
        infor_p1:1000,
        infor_t1:50,
      },
      
      {
        id:11,
        category1:"日用品",
        category2:"洗濯洗剤",
        name:"",
        location0:"",
        location1:"",
        infor_p0:50,
        infor_p1:500,
        infor_t1:10,
      },
      {
        id:5,
        category1:"食材",
        category2:"調味料",
        name:"",
        location0:"",
        location1:{ lat: 34.683140321434365, lng: 135.46425607526396},
        infor_p0:2.5,
        infor_p1:400,
        infor_t1:1000,
      },
      {
        id:4,
        category1:"医薬品",
        category2:"その他",
        name:"",
        location0:"",
        location1: { lat: 34.683140321434365, lng: 135.46425607526396},
        infor_p0:1,
        infor_p1:300,
        infor_t1:300,
      },{
        id:7,
        category1:"医薬品",
        category2:"痛み止め",
        name:"",
        location0:"",
        location1: { lat: 34.69499521550559 , lng: 135.4862194508314},
        infor_p0:400/300,
        infor_p1:400,
        infor_t1:300,
      },
      {
        id:7,
        category1:"医薬品",
        category2:"痛み止め",
        name:"",
        location0:"",
        location1: { lat: 34.69499521550559 , lng: 135.4862194508314},
        infor_p0:400/300,
        infor_p1:400,
        infor_t1:300,
      },
      {
        id:8,
        category1:"医薬品",
        category2:"風邪薬",
        name:"痛み止め",
        location0:"",
        location1: { lat: 34.69088923978887, lng: 135.49632235263374},
        infor_p0:1080/36,
        infor_p1:1080,
        infor_t1:36,
      },
      {
        id:9,
        category1:"食材",
        category2:"肉類",
        name:"",  
        location0:"",
        location1:"",
        infor_p0:"1",
        infor_p1:"300",
        infor_t1:"1",
      },
      {
        id:10,
        category1:"その他",
        category2:"その他",
        name:"",  
        location0:"",
        location1:"",
        infor_p0:"1",
        infor_p1:"300",
        infor_t1:"1",
      },
      {
        id:10,
        category1:"食材",
        category2:"魚類",
        name:"",  
        location0:"",
        location1:"",
        infor_p0:"1",
        infor_p1:"300",
        infor_t1:"1",
      },
    
    ],
    nextinforId:11,
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
    },
  mutations:{
    restore(state,{infor,nextinforId}){
    state.infor=infor
    state.nextinforId=nextinforId
    },
    addlist(state,{category1,category11,category2,category22,name,infor_p1,infor_t1,infor_p0,location0,location1}){
    state.infor.push({
      id:state.nextinforId,category1,category11,category2,category22,name,infor_p1,infor_t1,infor_p0,location0,location1
    })
    state.nextinforId++
    },
  },
  getters:{
    

  },

})



export default store



