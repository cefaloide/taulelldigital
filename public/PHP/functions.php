<?php
/*
 * TaulellDigital Funcionalitats del Backend.
 *
 *
 *  login() Validació de l'usuari.
 *  alta_productor() Afegir un productor a la base de dades.
 *  baixa_productor() Eliminar un productor de la base de dades.
 *  modificar_productor() Modificar les dades d'un productor.
 *  llistat_productors() Llista els productors.
 *
 *  afegir_comanda() Afegir una comanda.
 *  esborrar_comanda() Esborrar una comanda.
 *  modificar_comanda() Modificar les dades d'una comanda.
 *  llistat_comandes() Llistat de les comandes.
 *
 *  afegir_oferta() Afegir una oferta.
 *  esborrar_oferta() Esborrar una comanda.
 *  modificar_oferta() Modificar les dades d'una oferta.
 *  llistat_oferta() Llistat de les ofertes.
 *
 *  dades_videoconferencia() Registra les dades les videoconferències.
 *
 *  S'ha de fer un llistat de totes les xarxes socials.
 *   f facebook
 *   i instagram
 *   t twitter
 *
 *
 *  afegir_xarxaf() Afegir a facebook.
 *  esborrar_xarxaf() Esborrar a facebook.
 *  modificar_xarxaf() Modificar les dades de facebook.
 *
 *  afegir_xarxai() Afegir a instagram.
 *  esborrar_xarxai() Esborrar a instagram.
 *  modificar_xarxai() Modificar les dades de instagram.
 *
 *  afegir_xarxat() Afegir a twitter.
 *  esborrar_xarxat() Esborrar a twitter.
 *  modificar_xarxat() Modificar les dades de twitter.

 *  llistat_xarxes() Llistat de les xarxes socials.
 *
 */

 dheader(); // Retorna una web. Millor amb una REST API.
 dswitch(); // Crida a cada funció segons la variable op.
 dfoot();   // Retorna el HTML del peu de la web.


 function dheader(){
   // dheader function prints HTML headers.
  echo " <!DOCTYPE html> \n "
     ."<html> \n"
     ." <head>  \n"
     ."<title> TaulellDigital </title> \n"
     ."  <meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\">"
     ."  <script language=\"JavaScript\">		 \n"
     ."	 function avui(){         			 \n"
     ."		var avui=new Date(); 		     \n"
     ."		var any=avui.getYear();		   \n"
     ."		if (any < 1000) any+=1900;	 \n"
     ."		//var dia=avui.getDay();	   \n"
     ."		var mes=avui.getMonth()+1;	 \n"
     ."		if (mes<10) mes=\"0\"+mes;	 \n"
     ."		var dia=avui.getDate();		   \n"
     ."		if (dia<10) dia=\"0\"+dia;	 \n"
     ."		document.fbuscafitxa.fecha.value=dia+\"/\"+mes+\"/\"+any; 	\n"
     ."	 } \n"
     ."   "
     ."  </script>  \n"
     ."  <style>    \n"
     ."	 h1{text-align:center} \n"
     ."	 td{text-align:center} \n"
     ."  </style>   \n"
     ."</head> \n";
 }

 function ddb(){
   // ddb() connect to MySQL DB and retorn a $conn
   // 'ddbconf.php' contains the values of the MySQL connection.
   require('ddbconf.php');

   // Create connection
   $conn = new mysqli($servername, $username, $password, $dbname);

   // Check connection
   if ($conn->connect_error) {
       die("Connection failed: " . $conn->connect_error);
   }
   return $conn;
   //echo "Connected successfully";
 }
 function dmenu(){
   // dmenu() prints the main options menu.
   echo "<div class=\"oculti\">";
   echo "<table>";
   echo "<tr>";
   echo "<td>";
   echo "<a href=\"index.php\"><img border=0 src=\"img/dp.png\">|_buscar ficha_| </a> ";
   echo "</td>";
   echo "<td align=\"right\">";
   echo "<a href=\"?op=\"><img border=0 src=\"img/.png\">|__|</a>";
   echo "</td>";

   echo "</tr>";
   echo "</table>";
   echo "</div>";
 }
 function dswitch(){
   // dswitch call a function taking into 'op' parameter
   $op="";
   if(isset($_GET['op'])) $op=$_GET['op'];
   switch ($op){
    case "login": login(); break;
    case "": (); break;

   	default:
          principal();
   	}

 }
/*
 *  alta_productor() Afegir un productor a la base de dades.
 *  baixa_productor() Eliminar un productor de la base de dades.
 *  modificar_productor() Modificar les dades d'un productor.
 *  llistat_productors() Llista els productors.
 *
 */

 function alta_productor($cproductor){

   echo "<body onload=\"avui();\"> \n"
       ." \n ";

   dmenu();

   echo "<h1> Afegir Productor </h1>  \n"
       ."<form name=\"faproductor\"> \n"
       ." \n "
       ."<table> \n"
       ."<tr><th>Art&iacute;culo</th><th>Descripci&oacute;n:</th></tr> \n"

       ." <tr>\n"
       ."     <td><input name=\"bbusca\" value=\"A&ntilde;adir\" type=\"submit\"></td>\n"
       ."	<input type=\"hidden\" name=\"op\" value=\"inserir_ficha\"> \n"
       ." </tr>\n"
       ."</table>\n"
       ."</form>\n"
       ." \n";

 }

 function dfoot(){
   // dfoot() prints the end of web's HTML code
   echo "</body> \n"
       ."</html> \n";
 }

?>
