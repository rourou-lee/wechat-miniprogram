// pages/userConsole/userConsole.js
Page({

  data: {
    openid: ''
  },

  onLoad: function (options) {
	  //分享  //框架-转发
	  wx.showShareMenu({
		  withShareTicket: true,
		  success(res) {
			  console.log(res);
		  }
	  })
  }
})