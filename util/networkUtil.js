
// 网络工具类封装

// get method 
function _get(url, success, fail) {
  console.log(">> network start get method.");
  wx.request({
    url: url,
    success:function(res) {
      success(res);
    },
    fail:function(res) {
      fail(res);
    }
  });
  console.log("<< network get method end.");
}

// post method 表单提交 
function _post_form(url, formData, success, fail) {
  console.log(">> network start post form method.");
  wx.request({
    url: url,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    // data:{data:data},
    data: formData,
    success: function(res) {
      success(res);
    },
    fail:function(res) {
      fail(res);
    }
  });
  console.log("<< network post form method end.");
}

// post method json 字符串格式数据提交
function _post_json(url, data, success, fail) {
  console.log(">> network start post json method.");
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json',
    },
    method:'POST',
    data: data,
    success: function(res) {
      success(res);
      console.log("success -> res = " + res.data);
    },
    fail: function(res) {
      fail(res);
      console.log("fail -> res = " + res.data);
    }
  });
  console.log("<< network post json method end.");
}

function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

module.exports = {
  _get: _get,
  _post_form: _post_form,
  _post_json: _post_json,
  json2Form: json2Form
}