$(function() {
	if (window.navigator.userAgent.indexOf("MSIE")>=1){
		var browser=navigator.appName 
		var b_version=navigator.appVersion 
		var version=b_version.split(";"); 
		var trim_Version=version[1].replace(/[ ]/g,""); 
		if(browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0") {
			$('body>div,body>ul').not('.prompt_box').hide();
			$('.prompt_box').show();
		} else if(browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0") {
			$('body>div,body>ul').not('.prompt_box').hide();
			$('.prompt_box').show();
		} else if(browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
			$('.prompt_box').show();
			$('body>div,body>ul').not('.prompt_box').hide();
		}
	}
});