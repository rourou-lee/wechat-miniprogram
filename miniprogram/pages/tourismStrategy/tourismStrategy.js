// pages/storageConsole/storageConsole.js
const app = getApp()
Page({
  data: {
 
  },

  onLoad: function (options) {
console.log(options);
  },
	gotoStrategyDetailPage(e){
		var title=e.currentTarget.dataset.title;
		wx.navigateTo({
		//	url: '/pages/aboutUs/aboutUs?title='+title
      url: "/pages/discussRead/discussRead"
		})
	}
})