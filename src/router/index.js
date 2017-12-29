import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import Login from '@/pages/Login'
import Equipment from "@/pages/Equipment"
import Domain from "@/pages/Domain"
import Firmware from "@/pages/Firmware"
import Search from "@/pages/Search"
import IPC from "@/pages/IPC"
import Screen from "@/pages/Screen"
import NVR from "@/pages/NVR"


Vue.use(Router)

export default new Router({
	mode: "history",
	routes: [{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/',
			redirect: "/login",
			name: 'index',
			component: index,
			children: [{
				path: 'Equipment',
				redirect: "/Equipment/IPC",
				component: Equipment,
				children: [
					{
						path: 'IPC',
						component: IPC
					}, {
						path: 'Screen',
						component: Screen
					}, {
						path: 'NVR',
						component: NVR
					}
				]
			},{
				path: 'Domain',
				component: Domain
			}, {
				path: 'Firmware',
				component: Firmware
			}, {
				path: 'Search',
				component: Search
			}]
		}
	]
})