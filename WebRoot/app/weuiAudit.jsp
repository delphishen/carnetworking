<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2018/4/16
  Time: 16:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta content="textml; charset=UTF-8" http-equiv="Content-Type">
    <meta content="no-cache,must-revalidate" http-equiv="Cache-Control">
    <meta content="no-cache" http-equiv="pragma">
    <meta content="0" http-equiv="expires">
    <meta content="telephone=no, address=no" name="format-detection">
    <meta name="apple-mobile-web-app-capable" content="yes"> <!-- apple devices fullscreen -->
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">




    <link rel="stylesheet" href="<%=path%>/app/css/jquery-weui.css"/>
    <link rel="stylesheet" href="<%=path%>/app/css/weui.css"/>
    <link rel="stylesheet" href="<%=path%>/app/css/style.css"/>


    <script type="text/javascript" src="<%=path%>/app/js/jquery-2.1.4.js"></script>
    <script type="text/javascript" src="<%=path%>/app/js/jquery-weui.js"></script>


    <title>用车审核</title>

    <style>

        .header{

            width: 100%;
            height: 10%;
            background-color: #ffc800;

        }
        .tabmenu{


            background-color: #ffffff;
            width:80%;
            margin-left:10%;
            margin-top: -5%;
            display: flex;
            padding:0;
            height:48px;
            color: #cfcfcf;
            line-height:48px;
            border: 1px solid #f0f0f0;
        }


        .tabitem{
            flex: 1;
            line-height:50px;
            text-align:center;
            font-size:16px;
            font-weight: bold;
        }
        .tabitem.active{
            color: #fdc600;
            text-decoration:underline
            /*color:#8c1101;*/
            /*border-bottom:2px solid #a41402;*/
        }
        .tab-pane{
            display:none;

        }


        body,html{
            font-family: "Times New Roman, Times, serif";
            font-size:14px;
        }
    </style>

    <script>
        $(document).ready(function (){
            $('.tab-pane').hide();
            $('.tab-pane.active').show();
            $('.tabitem').on('click',function(){
                if($(this).hasClass('active')){
                    return;
                }else{
                    obj=$('.tabitem.active');
                    obj.removeClass('active');
                    $('.tab-pane.active').hide();
                    $('.tab-pane.active').removeClass('active');

                    $(this).addClass("active");
                    var target = $(this).attr('target');
                    $('#'+target).addClass("active");
                    $('#'+target).show();
                }
            })
        });

    </script>


</head>
<body>

<div class="wrapper">

    <div class="header">
        <span style="position: absolute; width: 100%;margin-top: 2%; font-size: 20px;text-align: center;color: #ffffff">用车审核</span>


    </div>

    <div class="tabmenu" style="font-size: 14px ">
        <div class="tabitem active"  target="in-progress">未审核订单</div>
        <div class="tabitem" target="all-completed">已审核订单</div>
    </div>

    <div class="tab-content" style="margin-left: 2%; margin-top: 3%;width: 96%;">
        <div class="tab-pane active" id="in-progress">

            <a>
                <div class="schedule_list_module" style="border: 1px solid #E1E1E1;height: 150px;box-shadow:0 0 1px #000000 inset;">
                    <ul>
                        <li><img src="<%=path%>/app/img/passenger_yellow.png" class="schedule_list_img fl"/>陈小柯  21593</li>
                        <li><img src="<%=path%>/app/img/time_yellow.png" class="schedule_list_img fl"/>12月二号  14是39给你</li>
                        <li><img src="<%=path%>/app/img/destination.png" class="schedule_list_img fl"/>陈小柯  21593</li>
                        <li><img src="<%=path%>/app/img/origin.png" class="schedule_list_img fl"/>12月二号  14是39给你</li>

                    </ul>
                </div>
                <div class="schedule_list_module" style="border: 1px solid #E1E1E1;height: 200px">
                </div>
                <div class="schedule_list_module" style="border: 1px solid #E1E1E1;height: 200px">
                </div>
                <div class="schedule_list_module" style="border: 1px solid #E1E1E1;height: 200px">
                </div>
                <div class="schedule_list_module" style="border: 1px solid #E1E1E1;height: 200px">
                </div>
                <div class="schedule_list_module" style="border: 1px solid #E1E1E1;height: 200px">
                </div>


            </a>

        </div>

        <div class="tab-pane" id="all-completed">
            时光飞逝当
        </div>


    </div>

</div>














</body>
</html>
