<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<?xml version='1.0' encoding='UTF-8' ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Damla - Arama Motoru</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/stylesheets/bootstrap.min.css" />
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/stylesheets/damla.css" />
    <link type="image/png" rel="shortcut icon" href="img/favicon.png" />
  
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script type="text/javascript" src="${pageContext.request.contextPath}/javascripts/html5shiv.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/javascripts/respond.js"></script>
    <![endif]-->

    <script src="${pageContext.request.contextPath}/javascripts/jquery-1.10.2.min.js"></script>
    <script src="${pageContext.request.contextPath}/javascripts/bootstrap.min.js"></script>
    <script src="${pageContext.request.contextPath}/javascripts/damla.js"></script>
  </head>
  <body>

  <div style="width:100%;">

      <div style="float:left; width:50%; ">


          <form method="get" action="${pageContext.request.contextPath}/login">
              <div align="center">
                  <table border="5" width="50%" cellpadding="3">
                      <thead>
                      <tr>
                          <h2>  Sisteme Giriş     </h2>

                          <th colspan="10">Giriş</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <td>İsim</td>
                          <td><input type="text" name="isim" placeholder="isim" value="" required="required"/></td>
                      </tr>
                      <tr>
                          <td>Soyisim</td>
                          <td><input type="text" name="soyisim" placeholder="soyisim" value="" required="required"/></td>
                      </tr>
                      <tr>
                          <td><input type="submit" value="Giriş" /></td>

                      </tr>

                      </tbody>
                  </table>
              </div>
          </form>

      </div>

          <div style="float:right; width:50%; ">

          <h2>Arama Sonuçlarının Değerlendirilmesi</h2><br>


          <h5>Sistemi denemek için ilk önce isim ve soyadınızla sisteme giriş yapmalısınız.
              Giriş yaptıktan sonra gelen arama sayfasında <p></p> istediğiniz aramayı yapabilirsiniz. </h5>
          <h5>Arama yaptıktan sonra gelen sayfayı ikiye bölünmüş olarak bulacaksınız.
              Ekranın solunda arama sonuçları ve yanlarında <p></p> kutucuk göreceksiniz.
              Her arama sonucuna tıkladığınızda ekranın sağında ilgili sayfa açılacaktır.
              Buradan açılan sayfanın <p></p> aramanızla ilgili olup olmadığını anlayabilirsiniz.
              Gelen arama sonuçlarının aradığınız şey ile ilgili olduğunu düşünüyorsanız <p></p> yanındaki kutucuğu işaretlemelisiniz.
              Değilse boş bırakınız. Değerlendirmeniz bittikten sonra bitti butonuna basmalısınız.</h5><br>


          <h4>Teşekkürler</h4><p></p>
      </div>


  </div>


  </body>
</html>