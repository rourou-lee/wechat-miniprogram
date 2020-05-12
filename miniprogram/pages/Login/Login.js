// miniprogram/pages/Login/Login.js
const app = getApp()
Page({
      /**
       * 页面的初始数据
       */
      data: {
            userInfo: null,
            hasUserInfo: false,
            motto: '欢迎使用这个小程序',
            canIUse: wx.canIUse('button.open-type.getUserInfo')
      },
      onLoad: function() {
            wx.getSetting({
                  success: function(res) {
                        if (!res.authSetting['scope.userLocation']) {
                              wx.authorize({
                                    scope: "scope.userLocation",
                                    success: function(res) {
							console.log(res)
                                          // wx.request({
                                          //       url: ''
                                          // })
                                    }
                              })
                        }else{
					wx.getLocation({
						success:function(res){
							console.log(res);

						}
					})
				}
                  }
            })
      },
      getuserInfoFun: function(res) {
            app.globalData.userInfo = res.detail.userInfo
            this.setData({
                  userInfo: res.detail.userInfo,
                  hasUserInfo: true
            })
      },
      //点击头像跳转首页
      gotoHomePage(res) {
            wx.switchTab({
                  url: '/pages/homePage/homePage'
            });
      },
      //按钮打开授权设置页
      bindopensettingSuccess: function(res) {
            console.log(res)
      }
})