window.onload=function(){
	// 得到整个页面布局的列数
	waterfall("main","box");
	var dataInt={"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'}]};//滚动鼠标要加载的图片
	window.onscroll=function(){
		if(checkScrollSlide){
			//符合加载规则，将后台图片加载到最小高度的位置上（后台的图片渲染到页面中）
			var oParent=document.getElementById("main");
			for(var i=0;i<dataInt.data.length;i++){
				var oBox=document.createElement("div");
				oBox.className='box';
				oParent.appendChild(oBox);
				var oPic=document.createElement("div");
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg=document.createElement("img");
				oImg.src="images/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall("main","box");
		}
	
	}
}
//得到页面列数布局
function waterfall(parent,box){
	var oElement=document.getElementById(parent);
	var oBox=getClass(oElement,box);
	var oBoxw=oBox[0].offsetWidth;//一个图片的宽度
	var cal=Math.floor(document.documentElement.clientWidth/oBoxw);//图片的列数
	//设置main的宽度,让其居中
	oElement.style.cssText='width:'+oBoxw*cal+'px;margin:0 auto;';
	//下一张图片在每一行的最小高的那个图片下
	var arrh=new Array();
	//得到第一行图片的最小高度
	for(var i=0;i<oBox.length;i++){
		if(i<cal){
			arrh.push(oBox[i].offsetHeight);
		}else{
			var minh=Math.min.apply(null, arrh);
			//找到minh的index
			var index=getMinhIndex(arrh,minh);
			//设置这个盒子的位置
			oBox[i].style.position='absolute';
			oBox[i].style.top=minh+'px';
			//oBox[i].style.left=oBoxw*index+'px';
			oBox[i].style.left=oBox[index].offsetLeft+'px';
			//改变minh的高度，后来应是这一列的高度
			arrh[index]=minh+oBox[i].offsetHeight;
		}
	}

}

//得到数组中的index
function getMinhIndex(arr,value){
	for(var i in arr){
		if(arr[i]==value){
			return i;
		}
	}
}
//判断是否具备了可以随滚动条加载的条件
function checkScrollSlide(){
	var oParent=document.getElementById("main");
	var oBoxs=getClass(oParent,"box");
	//最后一张图片高度的一半加上那一列的高度offsetTop
	var boxh=Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2)+oBoxs[oBoxs.length-1].offsetTop;
	//滚动条的高度=当前浏览器的高度+滚出页面的高度
	//分标准模式/混杂模式
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	//当前浏览器的高度
	var scannerh=document.documentElement.clientHeight||document.body.clientHeight;
	var scrollh=scrollTop+scannerh;
	if(boxh<scrollh){
		return true;
	}else{
		return false;
	}

}

//得到页面中的class=box
function getClass(oElement,clasname){
	var arr=[];
	var oClass=oElement.getElementsByTagName('*');
	for(var i=0;i<oClass.length;i++){
		if(oClass[i].className==clasname){
			arr.push(oClass[i]);
		}
	}
	return arr;
}