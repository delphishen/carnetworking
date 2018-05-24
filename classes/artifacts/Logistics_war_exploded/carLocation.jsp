<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>

<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>泉州博浪科技有限公司</title>

    <link rel="stylesheet" type="text/css" href="<%=path%>/app/css/bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="<%=path%>/app/css/bootstrap-treeview.css"/>

    <link rel="stylesheet" href="http://cache.amap.com/lbs/static/main1119.css"/>
    <link rel="stylesheet" href="<%=path%>/layui/css/layui.css" media="all">
    <style type="text/css">

        #content {
            position: relative;
            width: 100%;
            height: 100%;
        }

        #Sidebar {
            position: relative;
            width: 20%;
            height: 100%;
            left: 80%;
            background-color: #F0F8FF;
            overflow:  scroll;

        }

    </style>

    <script type="text/javascript">
        var path = '<%=path%>';
        var carApplyNo2;

        function GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    </script>

    <script type="text/javascript" src="<%=path%>/app/js/jquery-3.2.1.js"></script>

    <script type="text/javascript" src="<%=basePath%>utils/jqueryUtils.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/index/login.js"></script>
    <script type="text/javascript" src="<%=path%>/app/js/bootstrap.js"></script>
    <script type="text/javascript" src="<%=path%>/app/js/bootstrap-treeview.js"></script>
    <script src="<%=path%>/layui/layui.all.js" charset="utf-8"></script>


    <script type="text/javascript">
        function reflesh() {
            document.getElementById("randImg").src = "<%=basePath%>system/auth?+now="
                + new Date().getTime();
            document.getElementById("randImg").focus();
        };

        function GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }

    </script>
    <script type="text/javascript"
            src="http://webapi.amap.com/maps?v=1.4.6&key=316b395492b28bce1a2dc38f2eded548&plugin=AMap.Driving"></script>
    <%--<script type="text/javascript" src="http://cache.amap.com/lbs/static/addToolbar.js"></script>--%>
    <script src="//webapi.amap.com/ui/1.0/main.js"></script>
    <script type="text/javascript" src="http://webapi.amap.com/demos/js/liteToolbar.js"></script>
    <script type="text/javascript" src="http://cache.amap.com/lbs/static/addToolbar.js"></script>
    <link rel="stylesheet" href="http://cache.amap.com/lbs/static/main1119.css"/>
</head>
<body>
<%--<div id="container"></div>--%>
<%--<div id="panel"></div>--%>
<div id="content">
    <div id="container" style="width: 80%;height: 100%">

    </div>


    <div id="Sidebar">

        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
            <legend>车辆信息</legend>
        </fieldset>

        <div class="col-sm-12" >
            <div id="treeview-checkable" class="" ></div>
        </div>

    </div>


</div>


<script>


    var fleetId = GetQueryString("fleetId");
    var defaultData = [];
    var plateNos = [];

    var marker, lineArr = [], lineArr1 = [];


    Array.prototype.remove = function (val) {

        var index = this.indexOf(val);//调用上面函数获取下标

        if (index != -1) {

            this.splice(index, 1);//删除元素

            return this;//已经剔除的原数组

        }
    };

    function IsInArray(arr,val){

        var testStr=','+arr.join(",")+",";

        return testStr.indexOf(","+val+",")!=-1;

    }




    var map = new AMap.Map("container", {
        resizeEnable: true,
        center: [116.397428, 39.90923],
        zoom: 17
    });

    map.plugin(["AMap.ToolBar"], function () {
        map.addControl(new AMap.ToolBar());
    });
    if (location.href.indexOf('&guide=1') !== -1) {
        map.setStatus({scrollWheel: false})
    }
    map.setFitView();




    $.ajax({
        type: "GET",
        url: path + '/system/getTruckTree.do',
        async: false,
        data: {'fleetId': fleetId},
        dataType: "json",
        success: function (data) {
            defaultData = data;

            var $checkableTree = $('#treeview-checkable').treeview({
                data: defaultData,
                showIcon: false,
                showCheckbox: true,
                onNodeChecked: function (event, node) { //选中节点
                    console.log("=========节点信息===="+JSON.stringify(node));
                    var selectNodes = getChildNodeIdArr(node); //获取所有子节点
                    console.log("===子节点数量===="+JSON.stringify(selectNodes));

                    if (selectNodes) { //子节点不为空，则选中所有子节点
                        $('#treeview-checkable').treeview('checkNode', [selectNodes, {silent: true}]);
                    }
                    var parentNode = $("#treeview-checkable").treeview("getNode", node.parentId);
                    setParentNodeCheck(node);
                    // console.log("===选中集合===="+JSON.stringify(node.text) );
                    console.log("========nodes====="+node.nodes);
                    if(node.nodes == undefined){
                        plateNos.push(node.text);
                    }

                    console.log("======车牌号集合====" + JSON.stringify(plateNos));

                    if(plateNos.length >10){
                        layer.msg('查询记录超过10条，无法查询！！！');

                    }else {

                        $.ajax({
                            type: "GET",
                            url: path + '/logistics/getTruckLocation3.do',
                            async: false,
                            data: {'plateNos': JSON.stringify(plateNos)},
                            dataType: "json",
                            success: function (data) {


                                lineArr1 = data;

                                if (JSON.stringify(data) == '[null]') {
                                    layer.msg('未查询到相应记录！！！');
                                    var map = new AMap.Map("container", {
                                        resizeEnable: true,
                                        center: [116.397428, 39.90923],
                                        zoom: 17
                                    });

                                    map.plugin(["AMap.ToolBar"], function () {
                                        map.addControl(new AMap.ToolBar());
                                    });
                                    if (location.href.indexOf('&guide=1') !== -1) {
                                        map.setStatus({scrollWheel: false})
                                    }

                                    map.setFitView();
                                } else {

                                    layer.msg('查询成功！返回' + lineArr1.length + '记录！！！');
                                    // console.log("====返回参数====" + JSON.stringify(data));
                                    // console.log("====返回参数====" + data.length);

                                    var  map = new AMap.Map("container", {
                                        resizeEnable: true,
                                        center: [lineArr1[0].x, lineArr1[0].y],
                                        zoom: 17
                                    });

                                    map.plugin(["AMap.ToolBar"], function () {
                                        map.addControl(new AMap.ToolBar());
                                    });
                                    if (location.href.indexOf('&guide=1') !== -1) {
                                        map.setStatus({scrollWheel: false})
                                    }
                                    for (var i = 0; i < lineArr1.length; i++) {

                                        var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});

                                        marker = new AMap.Marker({
                                            map: map,
                                            position: [lineArr1[i].x, lineArr1[i].y],
                                            icon: "http://webapi.amap.com/images/car.png",
                                            offset: new AMap.Pixel(-26, -13),
                                            autoRotation: true
                                        });

                                        marker.content = '车牌号:' + lineArr1[i].carNo + '<br><br>地址:' + lineArr1[i].address + '<br><br>定位时间:' + lineArr1[i].gpsTime;
                                        marker.on('click', markerClick);
                                        marker.emit('click', {target: marker});

                                    }

                                    function markerClick(e) {
                                        infoWindow.setContent(e.target.content);
                                        infoWindow.open(map, e.target.getPosition());
                                    }

                                    map.setFitView();

                                }




                            }
                        });

                    }




                },

                onNodeUnchecked: function (event, node) { //取消选中节点
                    var selectNodes = getChildNodeIdArr2(node); //获取所有子节点
                    if (selectNodes) { //子节点不为空，则取消选中所有子节点
                        $('#treeview-checkable').treeview('uncheckNode', [selectNodes, {silent: true}]);
                    }
                    console.log("===去掉集合====" + JSON.stringify(node.text));
                    console.log("========nodes====="+node.nodes);
                    if (node.nodes == undefined){
                        plateNos.remove(node.text);
                    }

                    console.log("======车牌号集合====" + JSON.stringify(plateNos));

                    if(plateNos.length>10){
                        layer.msg('查询记录超过10条，无法查询！！！');
                    }else {

                        $.ajax({
                            type: "GET",
                            url: path + '/logistics/getTruckLocation3.do',
                            async: false,
                            data: {'plateNos': JSON.stringify(plateNos)},
                            dataType: "json",
                            success: function (data) {
                                if (JSON.stringify(data) == '[null]') {
                                    layer.msg('未查询到相应记录！！！');
                                    var map = new AMap.Map("container", {
                                        resizeEnable: true,
                                        center: [116.397428, 39.90923],
                                        zoom: 17
                                    });
                                    map.plugin(["AMap.ToolBar"], function () {
                                        map.addControl(new AMap.ToolBar());
                                    });
                                    if (location.href.indexOf('&guide=1') !== -1) {
                                        map.setStatus({scrollWheel: false})
                                    }
                                    map.setFitView();
                                } else {
                                    lineArr1 = data;
                                    // console.log("====返回参数====" + JSON.stringify(data));
                                    // console.log("====返回参数====" + lineArr1[0].x);
                                    layer.msg('查询成功！返回' + lineArr1.length + '记录！！！');

                                    var map = new AMap.Map("container", {
                                        resizeEnable: true,
                                        center: [lineArr1[0].x, lineArr1[0].y],
                                        zoom: 17
                                    });

                                    map.plugin(["AMap.ToolBar"], function () {
                                        map.addControl(new AMap.ToolBar());
                                    });
                                    if (location.href.indexOf('&guide=1') !== -1) {
                                        map.setStatus({scrollWheel: false})
                                    }
                                    for (var i = 0; i < lineArr1.length; i++) {

                                        var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});

                                        marker = new AMap.Marker({
                                            map: map,
                                            position: [lineArr1[i].x, lineArr1[i].y],
                                            icon: "http://webapi.amap.com/images/car.png",
                                            offset: new AMap.Pixel(-26, -13),
                                            autoRotation: true
                                        });
                                        marker.content = '车牌号:' + lineArr1[i].carNo + '<br><br>地址:' + lineArr1[i].address + '<br><br>定位时间:' + lineArr1[i].gpsTime;
                                        marker.on('click', markerClick);
                                        marker.emit('click', {target: marker});

                                    }
                                    function markerClick(e) {
                                        infoWindow.setContent(e.target.content);
                                        infoWindow.open(map, e.target.getPosition());
                                    }

                                    map.setFitView();

                                }


                            }
                        });

                    }




                },


            });


        }
    });




    function getChildNodeIdArr(node) {
        var ts = [];
        if (node.nodes) {
            for (x in node.nodes) {

                if (x != 'remove'){
                    ts.push(node.nodes[x].nodeId);
                    //IsInArray(plateNos,node.nodes[x].text);
                    console.log("====x的值====="+IsInArray(plateNos,node.nodes[x].text));
                    if (!IsInArray(plateNos,node.nodes[x].text)){
                        plateNos.push(node.nodes[x].text);
                    }
                }

            }
        } else {
            ts.push(node.nodeId);
        }
        return ts;
    }

    function getChildNodeIdArr2(node) {
        var ts = [];
        if (node.nodes) {
            for (x in node.nodes) {

                if (x != 'remove'){
                    ts.push(node.nodes[x].nodeId);
                    //IsInArray(plateNos,node.nodes[x].text);
                    console.log("====x的值====="+IsInArray(plateNos,node.nodes[x].text));
                    if (IsInArray(plateNos,node.nodes[x].text)){
                        plateNos.remove(node.nodes[x].text);
                    }
                }

            }
        } else {
            ts.push(node.nodeId);
        }
        return ts;
    }

    function setParentNodeCheck(node) {
        var parentNode = $("#treeview-checkable").treeview("getNode", node.parentId);


        if (parentNode.nodes) {
            var checkedCount = 0;
            for (x in parentNode.nodes) {
                if (parentNode.nodes[x].state.checked) {
                    checkedCount++;
                } else {
                    break;
                }
            }
            if (checkedCount === parentNode.nodes.length) {
                $("#treeview-checkable").treeview("checkNode", parentNode.nodeId);
                setParentNodeCheck(parentNode);
            }
        }
    }




</script>


</body>
</html>