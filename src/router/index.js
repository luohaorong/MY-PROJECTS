import Vue from 'vue'
import Router from 'vue-router' //路由
import index from '@/pages/index' //首页
import Login from '@/pages/Login' //登录
import Equipment from "@/pages/Equipment" //设备管理
import Domain from "@/pages/Domain" //域名管理
import DomainTable from "@/pages/DomainTable" //域名列表
import DomainDetail from "@/pages/DomainDetail" //域名详情
import CreateDomain from "@/pages/CreateDomain" //创建域名
import Firmware from "@/pages/Firmware" //固件管理
import AddFirmware from "@/pages/AddFirmware" //新增固件
import FirmwareTable from "@/pages/FirmwareTable" //固件列表
import Search from "@/pages/Search" //查询
import IPCTable from "@/pages/IPCTable" //IPC列表
import IPCDetail from "@/pages/IPCDetail" //IPC详情
import Screen from "@/pages/Screen" //屏设备管理
import NVRTable from "@/pages/NVRTable" //NVR列表
import NVRDetail from "@/pages/NVRDetail" //NVR详情
import Accounts from "@/pages/Accounts" //
import NotFound from "@/pages/NotFound" //404
import SelectDomain from "@/pages/SelectDomain" //选择域名
import SelectUpdateConfig from "@/pages/SelectUpdateConfig" //选择升级配置
import Recodes from "@/pages/Recodes" //视频录制
import NewAlarm from "@/pages/NewAlarm" //新增报警设置

import SetAlarnPage from "@/pages/SetAlarnPage" //设置报警

import Alarn from "@/pages/Alarn" //报警模块
import AlarnDevices from "@/pages/AlarmDevices" //报警管理查询
import AlarnTemplate from "@/pages/AlarnTemplate" //报警模板
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
				path: 'Equipment/:index',
				component: Equipment,
				children: [{
					path: 'IPCTable/:subIndex',
					component: IPCTable
				}, {
					path: 'IPCDetail/:subIndex',
					component: IPCDetail,
				}, {
					path: 'NVRTable/:subIndex',
					component: NVRTable
				}, {
					path: 'NVRDetail/:subIndex',
					component: NVRDetail
				}, {
					path: 'Screen/:subIndex',
					component: Screen
				}, {
					path: 'Recodes/:subIndex',
					component: Recodes
				}]
			}, {
				path: 'Domain/:index',
				component: Domain,
				children: [{
					path: 'DomainTable',
					component: DomainTable
				}, {
					path: 'DomainDetail',
					component: DomainDetail
				}, {
					path: 'CreateDomain',
					component: CreateDomain
				}]
			}, {
				path: 'Firmware/:index',
				component: Firmware,
				children: [{
					path: 'FirmwareTable',
					component: FirmwareTable
				}, {
					path: 'AddFirmware',
					component: AddFirmware
				}]
			}, {
				path: "Alarn/:index",
				component: Alarn,
				children: [{
					path: 'AlarmDevices',
					component: AlarnDevices
				}, {
					path: 'AlarnTemplate',
					component: AlarnTemplate
				}]
			}, {
				path: 'accounts',
				component: Accounts
			}, {
				path: 'SelectDomain',
				component: SelectDomain
			}, {
				path: 'SelectUpdateConfig',
				component: SelectUpdateConfig
			},{
				path: 'SetAlarnPage',
				component: SetAlarnPage
			}, {
				path: 'NewAlarm',
				component: NewAlarm
			}]
		},
		{
			path: '/logout',
			name: 'logout',
			component: Login
		}, {
			path: '*',
			component: NotFound
		}
	]
})