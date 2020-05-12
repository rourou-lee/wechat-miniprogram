//index.js
const app = getApp()

Page({
  data: {
  travelType:[
	  {
		  typeName: '出境游', typeTxt: '假期出境', typeImg:'http://88853.s81i.faiusr.com/4/102/AFEIlbYFEAQYACD9l6zWBSiC0rVsMNIBOIQCQGY.png' }, 
	  { typeName: '国内游', typeTxt: '走遍中国', typeImg: 'http://88853.s81i.faiusr.com/4/102/AFEIlbYFEAQYACD8l6zWBSj0so6LAjDSATiEAkBm.png' } ,
	  { typeName: '周边游', typeTxt: '周末出游', typeImg: 'http://88853.s81i.faiusr.com/4/102/AFEIlbYFEAQYACD-l6zWBSiq8bV4MNIBOIQCQGY.png' } 
  ],
	  swiperAry:[
		  { swiperImg: 'http://88853.s81i.faiusr.com/4/102/AFEIlbYFEAQYACD7mazWBSjFp6rsBjCKAjjHAUBm.png', swiperName: '双飞文化背景十日行', swiperPrice:'¥5600起'},
		  { swiperImg: 'http://88853.s81i.faiusr.com/4/102/AFEIlbYFEAQYACD8mazWBSjQqJnPAzCKAjjIAUBm.png', swiperName: '印象日本富士山行', swiperPrice: '¥4800起' },
		  { swiperImg: 'http://88853.s81i.faiusr.com/4/102/AFEIlbYFEAQYACD5mazWBSiUoZDwATCKAjjHAUBm.png', swiperName: '最美山域重庆三日游', swiperPrice: '¥3680起' }
	  ],
	  strategyAry:[
		  { strategyName: '马尔代夫自由行攻略',strategyImg:'http://88853.s81i.faiusr.com/4/102/AFEIlbYFEAQYACDOmqzWBSiwnL6fAzDKAjjcAUBm.png'},
		  { strategyName: '马尔代夫自由行攻略', strategyImg: 'http://88853.s81i.faiusr.com/4/102/AFEIlbYFEAQYACDSmqzWBSig4OjwBjDKAjjcAUBm.png' },
		  { strategyName: '马尔代夫自由行攻略', strategyImg: 'http://88853.s81i.faiusr.com/4/102/AFEIlbYFEAQYACDQmqzWBSju9d7RBTDKAjjcAUBm.png' },
		  { strategyName: '马尔代夫自由行攻略', strategyImg: 'http://88853.s81i.faiusr.com/4/102/AFEIlbYFEAQYACDNmqzWBSjehN_uAzDKAjjcAUBm.png' },
	  ]
  },

  onLoad: function() {
	  
  },
	
	onReady(e) {
		// 使用 wx.createAudioContext 获取 audio 上下文 context
		// var innerAudioContext = wx.createAudioContext('myAudio');
		// innerAudioContext.autoplay = true
		// innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
		// innerAudioContext.onPlay(() => {
		// 	console.log('开始播放')
		// })
		// innerAudioContext.onError((res) => {
		// 	console.log(res.errMsg)
		// 	console.log(res.errCode)
		// })
	},
	//点击图片跳转至推荐行程页面
	gotoRecommend(e){
		wx.switchTab({
			url:'/pages/recommendedTravel/recommendedTravel'
		})
	},
	//点阿基旅游攻略到攻略页
	gotoStrategy:function(index){
		wx.switchTab({
			url: '/pages/tourismStrategy/tourismStrategy'
		})
	},
	//在线咨
	askDetail:function(res){
		console.log(res);
	},
	//电话咨询
	callPhoneNumber:function(res){
		wx.makePhoneCall({
			phoneNumber: '1340000' 
		})
	},
	//长摁图片保存
	saveImgToLocal:function(res){
		console.log(res);
		wx.saveImageToPhotosAlbum({
			filePath:'',
			success:function(data){
				console.log(data);
			}
		})
	},
	
})
