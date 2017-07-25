
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
function _post_form(url, data, success, fail) {
  console.log(">> network start post form method.");
  wx.request({
    url: url,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data:{data:data},
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
    },
    fail: function(res) {
      fail(res);
    }
  });
  console.log("<< network post json method end.");
}

module.exports = {
  _get: _get,
  _post_form: _post_form,
  _post_json: _post_json
}