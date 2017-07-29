window.bee = {};

bee.link = {
  'server' : '/App',
  'weixin' : 'http://wechat.huijiuguoji.com',
  'image'  : ''
}

bee.cache = function (key, value) {
  if (!key && !value) {
		return undefined;
	} else if (key && value) {
		var v = 'string' == typeof(value) ? value : JSON.stringify(value);
		sessionStorage.setItem(key, v);
	} else if (!value) {
		var v = sessionStorage.getItem(key);
		if (v && ('{' == v.charAt(0) || '[' == v.charAt(0))) {
			try { v = JSON.parse(v) } catch (e) {}
		}
		return v;
	}
};

bee.cookie = function (name) {
  var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if(arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  }
  return null;
};

bee.putHis = function (value) {
  var his = bee.cache('history');
  if (his) {
    if (his[his.length - 1] === value) return;
    his.push(value);
  } else {
    his = [value];
  }
  bee.cache('history', his);
};

bee.clearHis = function () {
  bee.cache('history', []);
};

bee.back = function () {
  bee.open(bee.popHis());
};

bee.popHis = function () {
  var his = bee.cache('history');
  if (!his || !his.length) return;
  var value = his.pop();
  bee.cache('history', his);
  return value;
};

bee.getQueryString = function (name){
  if (!name) return '';
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r!=null) return unescape(r[2]); return '';
};

bee.parseQueryString = function (url) {
  return $.deparam.querystring(url || top.window.document.URL);
};

bee.url = function (link) {
	return bee.link.server + link;
};

bee.open = function (link, queryString) {
  if (queryString !== undefined) {
    var tmp = [];
    for (var i in queryString) {
      if (queryString.hasOwnProperty(i)) {
        tmp.push(i + '=' + queryString[i]);
      }
    }

    link += (link.indexOf('?') === -1 ? '?' : '&') + tmp.join('&');
  }
  window.location.href = link;
};

bee.request = function (cb) {
  $.ajax({
    'dataType' : 'json',
    'type'     : 'post',
    'url'      : bee.url(cb.url),
    'data'     : cb.data
  })
  .fail(function (res) {
    return cb && cb.error && cb.error(res);
  })
  .done(function (res) {
    if (res.code === 200) {
      return cb && cb.success && cb.success(res);
    } else if (res.code === 400) {
      return cb && cb.bind && cb.bind(res);
    } else if (res.code === 301 && !bee.getQueryString('code')) {
      bee.getWxCode();
    } else {
      // alert(res.msg);
      return cb && cb.error && cb.error(res);
    }
  });
};

bee.template = function (render, data, isFresh, dom) {
  if (dom === undefined) {
    dom = '#' + render + '-dom';
  }
  template.config('escape', false);
  bee.helper();
  var html = template(render, data);
  if (isFresh === undefined || !isFresh) {
    $(dom).append(html);
  } else {
    $(dom).html(html);
  }
};

bee.helper = function () {
  var colors = [ 'label-red', 'label-orange', 'label-blue' ];
  template.helper('color', function (index) {
    return colors[index % colors.length];
  });
  template.helper('star', function (times) {
    var arr = [];
    for (var i = 0; i < times; i++) {
      arr.push('<i class="icon icon-star"></i>');
    }
    return arr.join('');
  });
  template.helper('sum', function () {
    var sum = 0;
    for(var i = 0; arguments[i]; i++) {
      sum += parseFloat(arguments[i]);
    }
    return sum;
  });
  template.helper('total', function (money) {
    return parseFloat(money) * 12;
  });
};

bee.convertLocation = function (point) {
  var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  var x = point.lng - 0.0065;
  var y = point.lat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  point.lng = z * Math.cos(theta);
  point.lat = z * Math.sin(theta);
  return point;
}

bee.wxConfig = function (ready, error) {
  bee.request({
    url: '/Index/Wx/getJsSdk',
    data: {
      url: document.URL
    },
    success: function(result) {
      wx.config({
        debug: false,
        appId: result.info.appId,
        timestamp: result.info.timestamp,
        nonceStr: result.info.nonceStr,
        signature: result.info.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'showMenuItems', 'hideAllNonBaseMenuItem']
      });

      wx.ready(ready);
      wx.error(error);
    }
  });
}

bee.showMenuItems = function () {
  wx.showMenuItems({
      menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline']
  });
}

bee.hideAllNonBaseMenuItem = function () {
  wx.hideAllNonBaseMenuItem();
}

bee.wxMenuShareTimeline = function (title, link, success, cancel) {
  wx.onMenuShareTimeline({
      title: title,
      link: link,
      imgUrl: bee.link.weixin + '/image/default-avatar.png',
      success: success,
      cancel: cancel
  });
}

bee.wxMenuShareAppMessage = function (title, desc, link, success, cancel) {
  wx.onMenuShareAppMessage({
      title: title,
      desc: desc,
      link: link,
      imgUrl: bee.link.weixin + '/image/default-avatar.png',
      success: success,
      cancel: cancel
  });
}

bee.share = function () {
  $('<div class="share-modal"></div>').css({
    position: 'fixed',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    display: 'none',
    background: 'url("image/guider.png") right top / auto 90px no-repeat rgba(0, 0, 0, 0.498039)',
    'z-index': 999999
  }).on('click', function() {
    $(this).hide();
  }).appendTo('body');
}

bee.getWxCode = function () {
  bee.cache('redirectUri', document.URL);
  var queryString = {
      appid: 'wx500d1d09ee93a851',
      redirect_uri: encodeURIComponent(bee.link.weixin + '/jump.html?user_id=' + bee.getQueryString('user_id')),
      response_type: 'code',
      scope: 'snsapi_userinfo',
      state: 'STATE#wechat_redirect',
  };
  bee.open('https://open.weixin.qq.com/connect/oauth2/authorize', queryString);
}

if (!bee.cache('user_id') && window.location.href.indexOf('jump.html') === -1) {
    bee.getWxCode();
}
