<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2018/4/16
  Time: 15:07
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

    <title>用车审核列表</title>
    <link rel="stylesheet" href="<%=path%>/app/css/bootstrap.css"/>
    <link  rel="stylesheet"  href="<%=path%>/app/css/style.css">

    <script  type="text/javascript" src="<%=path%>/app/js/jquery-3.2.1.js"></script>
    <script  type="text/javascript" src="<%=path%>/app/js/bootstrap.js"></script>


</head>
<body>

<div class="wrapper">

    <div class="header">
        <span class="span1">用车审核</span>

        <ul class="nav nav-tabs navbars">
            <li role="presentation" class="active" style="width: 150px;background-color: #ffffff"><a href="#"  >未审核</a></li>
            <li role="presentation" style="width: 150px;background-color: #ffffff"><a href="#" >已审核</a></li>
        </ul>

    </div>
    <div class="navigationbars">

    </div>







</div>

</body>
</html>
