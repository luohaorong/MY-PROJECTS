<template>
	<div class="addFirmware">
		<header>
			上传固件
		</header>
		<section>
			<form action="">
				<ul class="new_firmware">
					<li>
						<h4>设备类型</h4>
						<select-unit class="pushType" :defaultItem="divceType" :select-item="divceTypeItem" @selectValue="getDivceType"></select-unit>
					</li>
					<li>
						<h4>设备型号</h4>
						<select-unit class="onlineType" :defaultItem="divcemodel" :select-item="divceModelItem" @selectValue="getDivceModel"></select-unit>
					</li>
				</ul>
				<div class="firmwareName">
					<h4>固件名称</h4>
					<div class="add_btn">
						<input type="text" placeholder="固件版本名称" readonly="readonly" v-model="romName" />
						<div class="uploaderComponents">
							<a href="javascript:;" class="a-upload">
								<input ref="file" type="file" @change="uploaderFile" name="" id="">上传固件
							</a>
						</div>
					</div>
				</div>
				<div class="firmwareVersion">
					<h4>版本号</h4>
					<input type="text" placeholder="请输入固件版本号" v-model = "version"/>
				</div>
				<div class="firmwareNotice">
					<h4>备注</h4>
					<textarea class="textarea" v-model="remark" maxlength="30" placeholder="请输入备注说明文字(30字以内)"></textarea>
				</div>
				<div class="submit_btns">
					<ButtonTemp v-for="(item,index) in items" :message="item" :keys="'btn' + index" class="button-style" @btnClick="handle(index)"></ButtonTemp>
				</div>
			</form>
		</section>
	</div>
</template>

<script>
	import selectUnit from "@/components/NewSelect"
	import SearchInput from "@/components/SearchInput"
	import ButtonTemp from "@/components/ButtonTemp"

	export default {
		name: "Firmware",
		components: {
			selectUnit,
			SearchInput,
			ButtonTemp
		},
		computed: {

		},
		data() {
			return {
				options: {
					target: TOOLS.LINK["uploadUrl"] + '/upload?' + "business_type=202&guest=5mHaFZBeVxq6JdyO2MlXKn3QIT1Arfoc",
					testChunks: false
				},
				attrs: {
					accept: 'image/*'
				},
				msg: {
					placeholder: "请选择上传文件",
					txt: "浏览",
					readonly: true
				},
				divceType: {
					name: "设备类型",
					id: -1
				},
				divcemodel: {
					name: "设备型号",
					id: -1
				},
				divceTypeItem: {
					name: "showDeviceItem",
					gray: "设备类型",
					list: [{
						name: "设备类型",
						id: -1
					}]
				},
				divceModelItem: {
					name: "showDeviceModelItem",
					gray: "设备型号",
					list: [{
						name: "设备型号",
						id: -1
					}]
				},
				items: [{
					txt: "确定",
					background: ""
				}, {
					txt: "取消",
					background: "#DDDDDD"
				}],
				tip1: {
					title: "温馨提示",
					type: "handletips",
					flag: false,
					optiontype: "onoff",
					tip: [{
						text: "上传固件只支持bin,zip,box格式！"
					}]
				},
				tip: {
					title: "温馨提示",
					type: "handletips",
					flag: false,
					optiontype: "onoff",
					tip: [{
						text: "上传失败，请重试！"
					}]
				},
				tip2: {
					title: "温馨提示",
					type: "handletips",
					flag: false,
					optiontype: "onoff",
					tip: [{
						text: "请选择小于100M的文件！"
					}]
				},
				errorFiletip: {
					title: "温馨提示",
					type: "handletips",
					flag: false,
					optiontype: "onoff",
					tip: [{
						text: "上传文件出错，请重试！"
					}]
				},
				romMd5: "",
				romUrl: "",
				romName: "",
				romSize: "",
				deviceType: "",
				model: "",
				remark: "",
				version: ""
			}
		},
		methods: {
			getDivceType(val) {
				this.deviceType = val.id

				if(val.deviceType != -1) {
					TOOLS.get("/rom/model/" + val.id, {}).then(res => {
						if(+res.data.code === 0) {
							let list = res.data.data;
							var newArray = [];
							newArray = list.map((v, index) => {
								return {
									name: v,
									id: index
								}
							})
							let divceModelItem = {
								name: "showDeviceModelItem",
								gray: "设备类型",
								list: newArray
							}
							newArray.unshift({
								name: "设备类型",
								id: -1
							});
							this.divceModelItem = divceModelItem
						};
					})
				}
			},
			getDivceModel(val) {
				this.model = val.name
			},
			handle(val) {
				if(val % 2 == 0) {
					let data = {
						romMd5: this.romMd5,
						romUrl: this.romUrl,
						romName: this.romName,
						romSize: this.romSize,
						deviceType: this.deviceType,
						remark: this.remark,
						model: this.model,
						version: this.version
					}
					TOOLS.post("/rom/add", data).then(res => {
						if(+res.data.code === 0) {
							this.$router.push("/Firmware/2/FirmwareTable")
						};
					}).catch(err => {
						this.$store.commit("isBlock");
						this.$store.commit("message", err.message);
						this.$store.commit("err", false);
					})
				} else {
					window.history.go(-1);
				}
			},
			uploaderFile(e) {
				let file = e.target.files[0];
				let active = e.target;
				if(!file) {
					return false;
				}
				this.getFileInfo(file, active);
			},
			getFileInfo(ofile, active) {
				let files = ofile;
				let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
					// file = this.files[0],
					chunkSize = 8097152, // Read in chunks of 2MB
					chunks = Math.ceil(files.size / chunkSize),
					currentChunk = 0,
					spark = new SparkMD5.ArrayBuffer(),
					fileReader = new FileReader();
				let fileInp = this.$refs.file;
				let allowExtention = '.zip,.bin,.box'; //认可的文件格式
				let extention = fileInp.value.substring(fileInp.value.lastIndexOf('.') + 1).toLowerCase();
				let fileSize = files.size / 1024 / 1024; //文件大小

				this.romName = files.name;
				this.romSize = files.size //文件大小romSize
				var _this = this;

				if(allowExtention.indexOf(extention) != -1) {
					if(fileSize <= 100) {
						let reader = new FileReader(); //创建文档流
						let param = new FormData(); //创建form对象
						param.append('file', files); //通过append向form对象添加数据

						fileReader.onload = function(e) {
							spark.append(e.target.result); // Append array buffer
							currentChunk++;
							var md5_progress = Math.floor((currentChunk / chunks) * 100);

							console.log(files.name + "  正在处理，请稍等," + "已完成" + md5_progress + "%");
							var progressbar = document.getElementsByClassName("progressbar")[0];
							if(currentChunk < chunks) {
								loadNext();
							} else {
								_this.romMd5 = spark.end(); //文件romMd5
								_this.romName = files.name //文件名romName
								_this.$store.commit("isBlock");
								_this.$store.commit("message", "已经推到云端，准备上传");
							}
						};

						fileReader.onerror = function() {
							this.$store.commit("tipInputData", this.errorFiletip);
							this.$store.commit("isShow", true);
						};

						loadNext();

						var request = new XMLHttpRequest();
						request.open("POST", TOOLS.LINK.uploadUrl + "/upload?business_type=202&guest=5mHaFZBeVxq6JdyO2MlXKn3QIT1Arfoc");
						request.onreadystatechange = function() {
							if(request.readyState == 4 && (request.status == 200 || request.status == 304)) { // 304未修改
								let data = JSON.parse(request.responseText);
								_this.romUrl = data.data;
								_this.$store.commit("isBlock");
								_this.$store.commit("message", "上传成功");
							}
						}
						request.send(param)
					} else {
						this.$store.commit("tipInputData", this.tip2);
						this.$store.commit("isShow", true);
					}
				} else {
					this.$store.commit("tipInputData", this.tip1);
					this.$store.commit("isShow", true);
				}

				function loadNext() {
					var start = currentChunk * chunkSize,
						end = ((start + chunkSize) >= files.size) ? files.size : start + chunkSize;
					fileReader.readAsArrayBuffer(blobSlice.call(files, start, end));
				}
			}
		},
		mounted() {
			//获取设备类型
			TOOLS.get("/rom/type", {}).then(res => {
				if(+res.data.code === 0) {
					let list = res.data.data;
					var newArray = [];
					newArray = list.map(v => {
						return {
							name: v.deviceTypeName,
							id: v.deviceType
						}
					})
					let divceTypeItem = {
						name: "showDeviceItem",
						gray: "设备类型",
						list: newArray
					}
					//最后插入在数据的最前端
					newArray.unshift({
						name: "设备类型",
						id: -1
					});
					this.divceTypeItem = divceTypeItem
				};
			})
		}
	}
</script>

<style lang="less">
	@import url("../assets/styles/templete.less");
	.addFirmware {
		.widthHeightBgColor(90%, 100%, #fff);
		margin: 0 auto;
		header {
			line-height: 114px;
			border-bottom: 1px solid #ccc;
			.fontSColor(18px, #5c5c5c);
		}
		.new_firmware {
			margin-top: 50px;
			display: flex;
			justify-content: flex-start;
			li {
				margin-right: 30px;
			}
		}
		.seclect_wrapper {
			.vertical_line{
				top: 2px!important;
			}
		}
		.firmwareName {
			margin-top: 30px;
			.add_btn {
				display: flex;
				justify-content: flex-start;
				.uploaderComponents {
					
				}
				>input {
					width: 350px;
					height: 40px;
					border: 1px solid #ccc;
					text-indent: 20px;
					border-right: none;
				}
			}
		}
		button {
			color: #fff;
		}
		.firmwareVersion {
			margin-top: 30px;
			input {
				width: 460px;
				height: 40px;
				border: 1px solid #ccc;
				text-indent: 20px;
			}
		}
		.firmwareNotice {
			margin-top: 30px;
			.textarea {
				width: 460px;
				height: 100px;
				resize: none;
				text-indent: 8px;
				line-height: 30px;
				border: 1px solid #ccc;
				padding: 10px;
			}
		}
		.submit_btns {
			margin-top: 56px;
			width: 210px;
			display: flex;
			justify-content: space-between;
			.button-style {
				.widthHeightBbRadius(100px, 36px, #ffa671, 18px);
				.centerLinehFontsColor(36px, 14px);
			}
		}
		h4 {
			font: normal;
			font-weight: 400;
			margin: 12px 0;
		}
		.a-upload {
			.widthHeight(100px, 40px);
			background: #FFA671;
			line-height: 40px;
			text-align: center;
			position: relative;
			cursor: pointer;
			color: #888;
			border: 1px solid #ddd;
			overflow: hidden;
			display: inline-block;
			*display: inline;
			*zoom: 1;
			color: #fff;
		}
		.a-upload input {
			position: absolute;
			font-size: 100px;
			right: 0;
			top: 0;
			opacity: 0;
			filter: alpha(opacity=0);
			cursor: pointer
		}
		.a-upload:hover {
			color: #444;
			background: #eee;
			background: #FFA670;
			text-decoration: none
		}
	}
</style>