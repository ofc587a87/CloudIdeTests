<%@page import="org.springframework.security.cas.authentication.CasAuthenticationToken"%>
<%@page import="org.springframework.security.core.userdetails.UserDetails"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    	               "http://www.w3.org/TR/html4/loose.dtd">

<html>
  <head>
    	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    	<title>GlassFish JSP Page</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    <ul>
    	<li><b>USER:</b> <%=request.getUserPrincipal().getName() %></li>
    	<li><b>clase:</b> <%=((CasAuthenticationToken)request.getUserPrincipal())%></li>
    </ul>
    <hr />
    Aplicación destino:
    <a href="/TestCAS">CAS 1</a>&nbsp;/&nbsp;<a href="/TestCAS2">CAS 2</a>
  </body>
</html> 
