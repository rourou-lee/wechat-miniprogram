//app.js
App({
  onLaunch: function () {
	  //登录成功
	  wx.login({
		  success(res){
				if(res.code){
				}
		  },
		  fail(res){
			  console.log(res)
		  }
	  })
  },
	globalData: {
		userInfo: null,
		innerAudioContext:null
	}
})
