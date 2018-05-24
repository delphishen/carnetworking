<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>泉州博浪科技有限公司</title>

		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>css/login.css" />
		<link rel="stylesheet" href="http://cache.amap.com/lbs/static/main1119.css"/>
		<style type="text/css">
			#panel {
				position: fixed;
				background-color: white;
				max-height: 90%;
				overflow-y: auto;
				top: 10px;
				right: 10px;
				width: 280px;
			}
			#content {
				position: relative;
				width: 100%;
				height: 100%;
			}

		</style>

		<script type="text/javascript">
			var path = '<%=path%>';
			var carApplyNo2 ;

            function GetQueryString(name)
            {
                var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if(r!=null)return  unescape(r[2]); return null;
            }
		</script>

		<script type="text/javascript"
			src="<%=basePath%>jsLib/jquery/jquery-1.7.2.js"></script>
		<script type="text/javascript" src="<%=basePath%>utils/jqueryUtils.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/index/login.js"></script>

		<script type="text/javascript">
			function reflesh() {
				document.getElementById("randImg").src = "<%=basePath%>system/auth?+now="
						+ new Date().getTime();
				document.getElementById("randImg").focus();
			}

		</script>
		<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.4.6&key=316b395492b28bce1a2dc38f2eded548&plugin=AMap.Driving"></script>
		<%--<script type="text/javascript" src="http://cache.amap.com/lbs/static/addToolbar.js"></script>--%>
	</head>
	<body>
	<%--<div id="container"></div>--%>
	<%--<div id="panel"></div>--%>
	<div id="content">
	<div id="container" style="position: absolute">

	</div>

	<div class="button-group" style="position: absolute">
		<input type="button" class="button" value="开始动画" id="start"/>
		<input type="button" class="button" value="暂停动画" id="pause"/>
		<input type="button" class="button" value="继续动画" id="resume"/>
		<input type="button" class="button" value="停止动画" id="stop"/>
	</div>
	</div>


	<script >

        var marker, lineArr = [],lineArr1 = [];
        var orderId = GetQueryString("carApplyNo");
        $.ajax({
            type: "GET",
            url: path + '/logistics/getCarApplylocation.do',
            data: {'orderId':orderId},
            dataType: "json",
            success: function(data){
                lineArr1 = data;

                console.log("====lineArr====="+lineArr1[0].x);
                console.log("====lineArr====="+lineArr1[0].y);




                var map = new AMap.Map("container", {
                    resizeEnable: true,
                    center: [lineArr1[0].x, lineArr1[0].y],
                    zoom: 17
                });

                map.plugin(["AMap.ToolBar"], function() {
                    map.addControl(new AMap.ToolBar());
                });
                if(location.href.indexOf('&guide=1')!==-1){
                    map.setStatus({scrollWheel:false})
                }

                marker = new AMap.Marker({
                    map: map,
                    position: [lineArr1[0].x, lineArr1[0].y],
                    icon: "http://webapi.amap.com/images/car.png",
                    offset: new AMap.Pixel(-26, -13),
                    autoRotation: true
                });


                // 插入一些点数据（此处为demo，因此为一些随机生成的实验数据）

                var lngX = lineArr1[0].x, latY = lineArr1[0].y;
                lineArr.push([lngX, latY]);
                for (var i = 1; i < lineArr1.length; i++) {
                    lngX = lineArr1[i].x;
                    latY = lineArr1[i].y;
                    lineArr.push([lngX, latY]);
                }
                // 开始绘制历史轨迹（包括历史轨迹的样式）

                // 绘制轨迹
                var polyline = new AMap.Polyline({
                    map: map,
                    path: lineArr,
                    strokeColor: "#00A",  //线颜色
                    // strokeOpacity: 1,     //线透明度
                    strokeWeight: 3,      //线宽
                    // strokeStyle: "solid"  //线样式
                });
                var passedPolyline = new AMap.Polyline({
                    map: map,
                    // path: lineArr,
                    strokeColor: "#F00",  //线颜色
                    // strokeOpacity: 1,     //线透明度
                    strokeWeight: 3,      //线宽
                    // strokeStyle: "solid"  //线样式
                });

                //给四个按钮添加各种事件

                marker.on('moving',function(e){
                    passedPolyline.setPath(e.passedPath);
                })
                map.setFitView();


                AMap.event.addDomListener(document.getElementById('start'), 'click', function() {
                    marker.moveAlong(lineArr, 20000);
                }, false);
                AMap.event.addDomListener(document.getElementById('pause'), 'click', function() {
                    marker.pauseMove();
                }, false);
                AMap.event.addDomListener(document.getElementById('resume'), 'click', function() {
                    marker.resumeMove();
                }, false);
                AMap.event.addDomListener(document.getElementById('stop'), 'click', function() {
                    marker.stopMove();
                }, false);




            }
        });









	</script>
	</body>
</html>