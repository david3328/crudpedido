-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-04-2018 a las 18:18:18
-- Versión del servidor: 10.1.26-MariaDB
-- Versión de PHP: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdopema`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`id`, `number`, `name`) VALUES
(2, 84, 'computo'),
(3, 86, 'proyectos'),
(4, 87, 'sistemas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `cod_poi` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `cod_pomdihma` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `type` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `order_date` date NOT NULL,
  `served_date` date NOT NULL,
  `service_date` date NOT NULL,
  `id_area` int(11) NOT NULL,
  `tracing` varchar(20) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `order`
--

INSERT INTO `order` (`id`, `number`, `cod_poi`, `cod_pomdihma`, `type`, `order_date`, `served_date`, `service_date`, `id_area`, `tracing`) VALUES
(19, 123, '123sd', '123sv', 'compra', '2018-03-14', '0000-00-00', '0000-00-00', 2, 'pendiente'),
(20, 345, '345asd', '12sdsd', 'compra', '2018-03-26', '2018-03-17', '2018-03-27', 3, 'pendiente'),
(21, 999, '34sd', '766scsd', 'compra', '2018-03-08', '0000-00-00', '0000-00-00', 2, 'pendiente'),
(22, 5321, '12scs', '12csa', 'compra', '2018-03-02', '0000-00-00', '0000-00-00', 3, ''),
(23, 12, '12sssd', '12scas', 'compra', '2018-03-15', '2018-04-18', '0000-00-00', 3, 'pendiente'),
(24, 12341, '1231', '1234', 'compra', '2018-03-15', '0000-00-00', '0000-00-00', 3, 'pendiente'),
(25, 631, '12as', '12cas', 'servicio', '2018-03-15', '0000-00-00', '0000-00-00', 4, 'pendiente'),
(26, 632, '12cas', '12cas', 'servicio', '2018-03-16', '2018-03-09', '2018-03-22', 4, 'pendiente'),
(27, 6123, '12scas', '12casd', 'servicio', '2018-03-16', '0000-00-00', '2018-04-13', 3, 'pendiente'),
(28, 5323, '12asd', '14asx', 'compra', '2018-03-09', '0000-00-00', '0000-00-00', 3, 'pendiente'),
(29, 854, '12', '123f', 'compra', '2018-03-09', '2018-04-19', '0000-00-00', 3, 'pendiente'),
(30, 742, '12scsa', '125as', 'compra', '2018-04-18', '0000-00-00', '0000-00-00', 3, 'pendiente'),
(31, 894, '123asd', '13cas', 'servicio', '2018-04-24', '2018-04-20', '0000-00-00', 2, 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL,
  `id_order` int(11) NOT NULL,
  `description` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit` varchar(15) COLLATE utf8_spanish2_ci NOT NULL,
  `estimated_cost` int(11) NOT NULL,
  `real_cost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `order_detail`
--

INSERT INTO `order_detail` (`id`, `id_order`, `description`, `quantity`, `unit`, `estimated_cost`, `real_cost`) VALUES
(15, 19, 'Lija 400', 15, 'unidad', 50, 0),
(16, 20, 'Agua San Luis', 23, 'unidad', 56, 17),
(17, 21, 'Agua', 34, 'unidad', 56, 87),
(18, 21, 'Gorra', 45, 'unidad', 67, 89),
(19, 22, 'laptop', 12, 'unidad', 123, 125),
(20, 23, 'Equipo Sony', 122, 'unidad', 1242, 100),
(21, 24, 'ss', 12, 'unidad', 1234, 12313),
(22, 25, 'Router TPLink', 12, 'unidad', 152, 152),
(23, 26, 'Cargador', 12, 'unidad', 182, 162),
(24, 26, 'Arduino', 15, 'unidad', 162, 173),
(25, 27, 'poster', 12, 'unidad', 100, 0),
(26, 28, 'poster', 15, 'unidad', 0, 0),
(27, 29, 'documento', 67, 'unidad', 90, 0),
(28, 30, 'router', 12, 'unidad', 123, 0),
(29, 30, 'diploma', 12, 'unidad', 12, 0),
(30, 31, 'Direct TV', 12, 'unidad', 12, 180);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(12) COLLATE utf8_spanish2_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(1, 'opema', 'admin12345');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `number` (`number`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `number` (`number`),
  ADD KEY `id_area` (`id_area`);

--
-- Indices de la tabla `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_order` (`id_order`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `area`
--
ALTER TABLE `area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT de la tabla `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`id_area`) REFERENCES `area` (`id`);

--
-- Filtros para la tabla `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `order` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
