-- MySQL. 
--  Base de dades per emmagatzemar les dades dels productors de proximitat, les estadístiques i altres. 
--    Cal treballar l'adquisició de dades de Dades Obertes de la Generalitat de Catalunya i fer un disseny nou.
--    https://analisi.transparenciacatalunya.cat/en/Comer-/Productors-adherits-a-la-venda-de-proximitat
--
-- Host: localhost    Database: taulelldigital
-- ------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES latin1 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `productor`
--

DROP TABLE IF EXISTS ``;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productor` (
  `cproductor` varchar(10) NOT NULL,
  `pproductor` varchar(100) NOT NULL COMMENT 'Password encriptat amb salted SHA1'
  `denominacio` varchar(255) NOT NULL,
  `marca_comercial` varchar(255) NOT NULL,
  `num_acreditacio` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `cognom1` varchar(255) NOT NULL,
  `cognom2` varchar(255) NOT NULL,
  `adreca` varchar(255) NOT NULL,
  `codi_postal` varchar(255) NOT NULL,
  `municipi` varchar(255) NOT NULL,
  `comarca` varchar(255) NOT NULL,
  `productes` varchar(255) NOT NULL,
  `grups_productes` varchar(255) NOT NULL,
  `venda_directa` varchar(255) NOT NULL,
  `venda_circuit_curt` varchar(255) NOT NULL,
  `telèfon` varchar(255) NOT NULL,
  `correu_electronic` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL DEFAULT '',
  `stock` int(11) DEFAULT NULL,
  PRIMARY KEY (`cproductor`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo`
--
