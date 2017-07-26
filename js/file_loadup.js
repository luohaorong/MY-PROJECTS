$(function(){
	(function(){
		//上传的图片显示到页面并验证图片格式和大小
		var files = document.getElementById('files');
		var Sys = {};
		var ua = navigator.userAgent.toLowerCase();
		var s;
		(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1]: 0;
		if(Sys.safari) { //Js判断为苹果safari浏览器
			$('#wine_label_check:last-child').remove();
		};
		files.onchange = function() {
			PreviewImage(files, 'wine_label_check');
		};

		// js本地图片预览          兼容ie[6-9]、火狐、Chrome17+、Opera11+、Maxthon3
		function PreviewImage(fileObj, divPreviewId) {
			$('.register_card_pre').attr('data-success', '1');
			var allowExtention = ".jpg,.jpeg,.png"; //允许上传文件的后缀名document.getElementById("hfAllowPicSuffix").value;
			var extention = fileObj.value.substring(fileObj.value.lastIndexOf(".") + 1).toLowerCase();
			var browserVersion = window.navigator.userAgent.toUpperCase();
			if(allowExtention.indexOf(extention) > -1) {
				if(fileObj.files) { //HTML5实现预览，兼容chrome、火狐7+等
					var img_size = fileObj.files[0].size / 1024 / 1024;
					if(img_size <= 6) {
						if(window.FileReader) {
							var reader = new FileReader();
							reader.onload = function(e) {
//								var img_preview = document.getElementById('wine_lable_small');
								var tempDivPreview = document.getElementById(divPreviewId);
								var img_box = document.createElement('div');
								img_box.setAttribute('class', 'wine_label_check_box');
								var img1 = document.createElement("img");
								img1.setAttribute("id", 'wine_lable_small');
								var img2 = document.createElement('img');
								img2.setAttribute('class', 'wine_label_selected');
								img2.setAttribute('src', 'img/wine_selected.png');
								img2.setAttribute('data_src','img/wine_selected.png');
								img1.setAttribute("src", e.target.result);

								img_box.appendChild(img1);
								img_box.appendChild(img2);
								tempDivPreview.prepend(img_box);


							}
							reader.readAsDataURL(fileObj.files[0]);
						}
					} else {

						$('#wine_label_check:first-child').remove();
						$('.upload_wine_label_limit').removeAttr('data-success').text('图片过大（小于6M）,请重新选择！！').css('color', '#EA0000');
					}

				} else if(browserVersion.indexOf("MSIE") > -1) {
					if(browserVersion.indexOf("MSIE 6") > -1) { //ie6
						var img1 = document.createElement("img");
						var tempDivPreview = document.getElementById(divPreviewId);

							img1.setAttribute("src", fileObj.value);
						var img2 = document.createElement('img');
							img2.setAttribute('class', 'img/wine_label_selected');
							img2.setAttribute('src', 'img/wine_selected.png');
							img2.setAttribute('data_src','wine_selected.png');
							img_box.appendChild(img1);
							img_box.appendChild(img2);
							tempDivPreview.appendChild(img_box);
					} else { //ie[7-9]
						getFileSize(fileObj);
						if(filesize <= 6) {
							fileObj.select();
							if(browserVersion.indexOf("MSIE 9") > -1) {
								fileObj.blur(); //不加上document.selection.createRange().text在ie9会拒绝访问
								document.selection.createRange().text;
								var newPreview = document.getElementById(divPreviewId + "New");

								newPreview = document.createElement("div");
								newPreview.setAttribute("id", divPreviewId + "New");
								newPreview.style.width = 360 + "px";
								newPreview.style.height = 172 + "px";
								newPreview.style.border = "1px solid #CCCCCC";
								
								newPreview.style.paddingLeft='10px';
								newPreview.style.paddingTop='8px';
								newPreview.style.float='left';
								newPreview.style.overflow='auto';
								newPreview.style.backgroundColor='#F2F2F2';
								newPreview.style.marginBottom='2px';
								
								
								
								

							};
							newPreview.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";
							var tempDivPreview = document.getElementById(divPreviewId);
							tempDivPreview.parentNode.insertBefore(newPreview, tempDivPreview);
							tempDivPreview.style.display = "none";

						} else {
							$('#wine_label_check:first-child').remove();
							$('.upload_wine_label_limit').removeAttr('data-success').text('图片过大（小于6M）,请重新选择！！').css('color', '#EA0000');
						}
					}
				} else if(browserVersion.indexOf("FIREFOX") > -1) { //firefox
					var firefoxVersion = parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
					if(firefoxVersion < 7) { //firefox7以下版本
						document.getElementById(imgPreviewId).setAttribute("src", fileObj.files[0].getAsDataURL());
					} else { //firefox7.0+                    
						document.getElementById(imgPreviewId).setAttribute("src", window.URL.createObjectURL(fileObj.files[0]));
					}
				} else {
					document.getElementById(imgPreviewId).setAttribute("src", fileObj.value);
				}
			} else {
				if(allowExtention.indexOf(extention) <= -1) {
					$('#wine_label_check:first-child').remove();
					$('.upload_wine_label_limit').removeAttr('data-success').text('图片限于png,jpeg,jpg格式,请重新选择！！').css('color', '#EA0000');
					//fileObj.outerHTML = fileObj.outerHTML;
				};

			};
			var data_card_pec = $('.register_card_pre').attr('data-success');
			if(data_card_pec) {
				
				$('.upload_wine_label_limit').text('');
			} else {
				
			};
		}
		//兼容ie9，获取文件大小
		function getFileSize(obj) {
			try {
				var file = obj;
				file.select();
				file.blur();
				var path = document.selection.createRange().text;
				var fso = new ActiveXObject("Scripting.FileSystemObject");
				filesize = fso.GetFile(path).size / 1024 / 1024;
			} catch(e) {
				alert(e + "\n" + "如果错误为：Error:Automation 服务器不能创建对象；" + "\n" + "请按以下方法配置浏览器：" + "\n" + "请打开【Internet选项-安全-Internet-自定义级别-ActiveX控件和插件-对未标记为可安全执行脚本的ActiveX控件初始化并执行脚本（不安全）-点击启用-确定】");
				return window.location.reload();
			};
		};
	})();
})