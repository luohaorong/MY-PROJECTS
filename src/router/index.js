import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import Domain from "@/pages/Domain"
import Firmware from "@/pages/Firmware"
import Search from "@/pages/Search"
import IPC from "@/pages/IPC"
import Screen from "@/pages/Screen"
import NVR from "@/pages/NVR"
Vue.use(Router)

export default new Router({
	mode:"history",
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
      	{
      		path: 'Domain',
          	component: Domain
      	},{
      		path: 'Firmware',
          	component: Firmware
      	},{
      		path: 'Search',
          	component: Search
      	},{
      		path: 'IPC',
          	component: IPC
      	},{
      		path: 'Screen',
          	component: Screen
      	},{
      		path: 'NVR',
          	component: NVR
      	}
      ]
    }
  ]
})
