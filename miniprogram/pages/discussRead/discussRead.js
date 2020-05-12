Page({
  data: {
    loading: false,
    color: '#fff',
    background: '#fff',
    show: true,
    animated: false,
    headers: {
      "ignore-identity": true
    },
    //discussId: window.discussId,
    //literatureId: window.literatureId,
    annotatorShow: false,//笔记工具栏显示隐藏
    annotatorStyle: { left: "", top: "" },  //划词后按钮组显示位
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    readRange: {},   //保存划词选区
    opinionTxt: '',//输入的意见
    showTextArea: false,
    rangeInfo: {}, //划词信息，做笔记用
    underlineMarks: [],//做过的划线笔记记录
    preFixVal: '',    //当做getMyPrefixOffset的返回值用,
    showParaNotes: false,  //展示段落意见
    paraNotes: [],
    allNotes: [],
    showAllNotes: false,  //展示全部笔记,
    noteType: '',    //添加意见3，回复-1
    ancestorNote: {},//不管是回复意见，还是回复笔记，都取父笔记的id，因为回复是平级的
    curOperateNote: {},   //当前操作意见，回复哪一条
    pageIndex: 1,  //请求回复列表,
    tipMsg: '',   //提示信息，layer用zepto报错，jquery太大，所以不用
    tipType: '',
    clipboard: '',
    tipShow: false,
    userSelection: '',
    //title: window.title,
    catalogs: [],
    showCatalog: false,
    placeHolderTxt: '',
  },
  getImgX(e) {
    //e.preventDefault();
    e = e || window.event;
    var downX = e.changedTouches[0].clientX;
    return downX;
  },
  getImgY(e) {
    //var scrollDis = $("#ChapterContainerWrap").scrollTop();
    //var boxTop = $("#ChapterContainerWrap").offset().top;
    //var downY = scrollDis + e.changedTouches[0] ? e.changedTouches[0].clientY : 0 - boxTop;
    var downY = e.changedTouches[0].clientY;
    return downY;
  },
  touchStartFun(e) {
    //this.annotatorShow = false;
    //if (window.getSelection) { //现代浏览器
    //    this.userSelection = window.getSelection().toString();
    //    window.getSelection().removeAllRanges()
    //} else if (document.selection) { //IE浏览器 考虑到Opera，应该放在后面                
    //    this.userSelection = document.selection.createRange();
    //    document.selection.empty();
    //}
    if (e.target.id=='annotator-adder-btn') return;
    this.data.startX = this.getImgX(e);
    this.data.startY = this.getImgY(e);
  },
  touchMoveFun(e) {
    this.annotatorShow = false;
  },
  touchEndFun(e) {
    var self=this;
    wx.getSystemInfo({
      success(res) {
        if (res.system.toLowerCase().indexOf('ios')!==-1){
          self.touchEndDelayFun(e);
        }else{
          var timer;
          timer && clearTimeout(timer);
          timer = setTimeout(function () {
            self.touchEndDelayFun(e);
          }, 1500)
        }
      }
    })
  },
  touchEndDelayFun(e) {
    this.data.curOperateNote = {};
    if (this.data.finishState) {
      this.data.tipMsg = '研讨已完成！';
      this.data.tipType = 'warning';
      return;
    }
    if (this.data.timeOut) {
      this.data.tipMsg = '研讨未开始或已截止！';
      this.data.tipType = 'warning';
      return;
    }
    this.data.annotatorShow = false;
    //e.target.tagName == 'H1'|| this.annotatorShow == true|| $(e.target).attr('role') == 'section'|| $(e.target).attr('role') == 'figure'|| /(H\d)/.test(e.target.tagName)
    //if (this.data.annotatorShow == true || $(e.target).parents('.Chapter').length) return;
    if (this.data.annotatorShow == true) return;
    wx.getSelectedTextRange({
      complete: res => {
        debugger;
        console.log('getSelectedTextRange res', res.start, res.end)
      }
    })
    var sel = window.getSelection();
    if (!sel.rangeCount) return;
    var range = sel.getRangeAt(0);
    this.readRange = range;
    if (range.collapsed) return;
    if (!$.trim(this.readRange.toString())) return;
    var fragment = this.readRange.cloneContents(),
      div = document.createElement('div');
    div.appendChild(fragment);
    var html = div.innerHTML;
    //不能跨段选中范围
    var $commonAncestorContainer = $(range.commonAncestorContainer);
    if ($commonAncestorContainer.is('.section') || $commonAncestorContainer.find('.section').length) {
      wx.miniProgram.postMessage({ msg: "不能跨段选中发表意见！" });
      return;
    }
    if ($commonAncestorContainer.is('.con-r-in') || $commonAncestorContainer.find('.con-r-in').length) {
      wx.miniProgram.postMessage({ msg: "不要同时对多篇研讨发表意见！" });
      return;
    }
    //不能选中图片
    if (/\W*.*<img .*?>\W*.*/.test(html)) {
      wx.miniProgram.postMessage({ msg: "图片请直接发表意见！" });
      return;
    }
    this.endX = this.getImgX(e);
    this.endY = this.getImgY(e);
    let topVal, leftVal;
    if (this.endY > this.startY) {
      topVal = this.startY + (this.endY - this.startY) / 2;
    } else {
      topVal = this.endY + (this.startY - this.endY) / 2;
    }
    if (this.startX > this.endX) {
      leftVal = this.startX - (this.startX - this.endX) / 2 - 71;
    } else {
      leftVal = this.endX - (this.endX - this.startX) / 2 - 71;
    }
    this.annotatorStyle.top = Math.abs(topVal - 40 - 36 + 25) + 'px';  //工具栏高度，。content的padding

    if (leftVal <= 0) {
      leftVal = 0 + "px"
    }
    if (parseInt(leftVal) > ($('.bjf0').width() - 142)) {
      leftVal = $('.bjf0').width() - 142 + 'px';
    }
    this.annotatorStyle.left = Math.abs(leftVal) + "px";      //工具栏宽度228  $(e.target).parents('.layout-con')[0].offsetLeft +
    this.annotatorShow = true;
    if ($(e.target).hasClass('comment-num')) this.annotatorShow = false;;

  },
})
