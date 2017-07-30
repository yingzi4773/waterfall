$(window).on('load',function(){
	waterfall();
	var dataInt={"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'}]};
	$(window).on('scroll',function(){
		if(checkScrollSlide){
			$.each(dataInt.data,function(key,value){
				var oBox=$('<div>').addClass('box').appendTo("#main");
				var oPic=$('<div>').addClass('pic').appendTo(oBox);
				$('<img>').attr('src','images/'+$(value).attr('src')).appendTo(oPic);
			});
			waterfall();
		}
	});
});
//不需要传参数，因为jq能直接找到
function waterfall(){
	var $aPin=$("#main>div");//找到main下的第一级的div
	var picw=$aPin.eq(0).outerWidth();//box的带padding宽度
	var row=Math.floor($( window ).width()/picw);
	//设置整个页面的样式
	/*$("main").css({
		'width':picw*row+'px',
		'margin':0 auto
	});*/
	$("main").width(picw*row).css("margin","0 auto");
	//找到一行中最矮的图片
	var arry=[];
	$aPin.each(function(index,value){
		var pich=$aPin.eq(index).height();
		if(index<row){
			arry[index]=pich;//把前一行中的高存到数组中
		}else{
			var minh=Math.min.apply(null,arry);
			var minhIndex=$.inArray(minh,arry);//找到索引
			$(value).css({
				'position':'absolute',
				'top':minh+'px',
				'left':$aPin.eq(minhIndex).position().left
			});
			arry[minhIndex]+=$aPin.eq(index).outerHeight();
		}
	});
}
function checkScrollSlide(){
	var lastimg=$("#main>div").last();//得到最后一个图片
	var imgh=lastimg.offset().top+Math.floor(lastimg.outerHeight()/2);//图片距顶端的高度
	var scrollh=$(window).scrollTop()+$(window).height();
	return (imgh<scrollh)?true:false;
}