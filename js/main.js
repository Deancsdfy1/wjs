
$(function() {
  /**
   * 根据屏幕宽度的变化决定轮播图片应该展示什么
   */
  function resize() {
    var windowWidth = $(window).width();
    var isSmallScreen = windowWidth < 768;
    $('#main_ad > .carousel-inner > .item').each(function(i, item) {
      var $item = $(item);
      var imgSrc =
          isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');

      // $element.data()
      // 是一个函数 ，专门用于取元素上的自定义属性（data-abc）
      // 函数的参数是我们要取得属性名称（abc）
      //
      // $element.attr('data-abc')
      //
      // JS中的写法
      // element.dataset['abc']
      //
      // element.getAttribute('data-abc')
      // element.setAttribute('data-abc','')
      $item.css('backgroundImage', 'url("' + imgSrc + '")');
      //
      // 因为我们需要小图时 尺寸等比例变化，所以小图时我们使用img方式
      if (isSmallScreen) {
        $item.html('<img src="' + imgSrc + '" alt="" />');
      } else {
        $item.empty();
      }
    });
  }
  // $(window).on('resize', resize);
  // // 让window对象立即触发一下resize
  // $(window).trigger('resize');
  $(window).on('resize',resize).trigger('resize');
  // 初始化tooltips插件
  $('[data-toggle="tooltip"]').tooltip();
  /**
   * 控制标签页的标签容器宽度
   */
  var $ulContainer = $('.nav-tabs');
  var width = 30;
  $ulContainer.children().each(function (index,element) {
    // console.log($(element).width());
    width += element.clientWidth;
  });
  if (width > $(window).width()){
    $ulContainer.css('width',width).parent().css('overflow-x','scroll');
  }
  var $newsTitle = $('.news-title');
  $('#news .nav-pills a').on('click',function () {
    var title = $(this).data('title');
    console.log(title);
    $newsTitle.text(title);
  });
  // 1. 获取手指在轮播图元素上的一个滑动方向（左右）
  var $carousel = $('.carousel');
  var startX,endX;
  var offset = 35;
  $carousel.on('touchstart',function (e) {
    startX = e.originalEvent.touches[0].clientX;
  });
  $carousel.on('touchmove',function (e) {
    endX = e.originalEvent.touches[0].clientX;
  })
  $carousel.on('touchend',function () {
    var distance = Math.abs(startX - endX);
    if (distance > offset) {
      $(this).carousel(startX > endX ? 'next' : 'prev');
    }
  });
});
