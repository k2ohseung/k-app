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
        location0:"その他",
        location1:"",
        infor_p0:"",
        infor_p1:"",
        infor_t1:"",
      },
      {
        id:2,
        category1:"日用品",
        category2:"ティッシュ",
        name:"",
        location0:"コーナン",
        location1:"",
        infor_p0:20,
        infor_p1:1000,
        infor_t1:50,
      },
      {
        id:3,
        category1:"日用品",
        category2:"トイレットペーパー",
        name:"",
        location0:"コーナン",
        location1:"",
        infor_p0:50,
        infor_p1:500,
        infor_t1:10,
      },
      {
        id:4,
        category1:"食品",/* 大区分 */
        category2:"加工品",/*  小区分*/
        name:"ウインナー",/* 品名 */
        location0:"ライフ",/*販売先*/
        location1:"",/*販売先の座標*/
        infor_p0:22,/* 1個の値段 */
        infor_p1:1100,/* 販売値段 */
        infor_t1:50,/*  販売内容量*/
      },{
        id:5,
        category1:"食品",
        category2:"調味料",
        name:"醤油",
        location0:"ライフ",
        location1:"",
        infor_p0:2.5,
        infor_p1:400,
        infor_t1:1000,
      },{
        id:6,
        category1:"食品",
        category2:"調味料",
        name:"ケチャップ",
        location0:"ライフ",
        location1: { lat: 0, lng: 0},
        infor_p0:1,
        infor_p1:300,
        infor_t1:300,
      },
    ],
    nextinforId:7,
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