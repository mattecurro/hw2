-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Lug 04, 2022 alle 23:31
-- Versione del server: 10.4.21-MariaDB
-- Versione PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hw2`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `user` int(11) DEFAULT NULL,
  `pool` int(11) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `comments`
--

INSERT INTO `comments` (`id`, `user`, `pool`, `text`) VALUES
(6, 170, 2, 'ciao'),
(9, 177, 2, 'blabla'),
(47, 190, 20, 'ciao'),
(48, 192, 20, 'eccomi');

-- --------------------------------------------------------

--
-- Struttura della tabella `options`
--

CREATE TABLE `options` (
  `id` int(11) NOT NULL,
  `pool` int(11) DEFAULT NULL,
  `option` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `options`
--

INSERT INTO `options` (`id`, `pool`, `option`) VALUES
(3, 2, 'Ci sono'),
(4, 2, 'Sì'),
(5, 2, 'No'),
(47, 20, 'Ci sono'),
(48, 20, 'Non ci sono'),
(49, 20, 'Forse'),
(50, 21, 'Ci sono'),
(51, 21, 'Non ci sono'),
(52, 21, 'Noo');

-- --------------------------------------------------------

--
-- Struttura della tabella `participants`
--

CREATE TABLE `participants` (
  `id` int(11) NOT NULL,
  `user` int(11) DEFAULT NULL,
  `vote` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `participants`
--

INSERT INTO `participants` (`id`, `user`, `vote`) VALUES
(214, 175, 3),
(216, 177, 4),
(219, 177, 3),
(249, 190, 49),
(250, 191, 47),
(251, 192, 48);

--
-- Trigger `participants`
--
DELIMITER $$
CREATE TRIGGER `participants_trigger` AFTER INSERT ON `participants` FOR EACH ROW BEGIN
UPDATE pools 
SET n_voters = n_voters + 1
WHERE id in (SELECT options.pool FROM participants JOIN options ON vote = options.id WHERE vote = new.vote);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struttura della tabella `pools`
--

CREATE TABLE `pools` (
  `id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `hour` varchar(10) DEFAULT NULL,
  `place` varchar(20) DEFAULT NULL,
  `date_event` date DEFAULT NULL,
  `category` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `n_voters` int(11) NOT NULL,
  `user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `pools`
--

INSERT INTO `pools` (`id`, `description`, `hour`, `place`, `date_event`, `category`, `status`, `n_voters`, `user`) VALUES
(2, 'Norma', '20:00', 'Acireale', '2022-05-22', 'SPETTACOLO', '0', 0, 3),
(20, 'Partita', '17:56', 'Catania', '2022-07-04', 'SPORT', 'Running', 3, 10),
(21, 'Batteria', '21:26', 'New York', '2022-07-11', 'SPETTACOLO', 'Running', 0, 193);

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `surname` varchar(20) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `level` tinyint(1) DEFAULT 0,
  `n_post` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `username`, `password`, `level`, `n_post`) VALUES
(1, 'matteo', 'c', 'mat', '123@m', 1, 0),
(2, 'matteo', 'c', 'mat', '', 0, NULL),
(3, 'vale', 'c', 'vale', '123@v', 1, NULL),
(5, 'mari', 's', 'mari', '123@m', 1, NULL),
(7, 'Nicola', NULL, NULL, '$2y$10$zAOvZXthtEHs1my5KDRYkenz5XHcZmfY0SSonIkvV8GXxsfpP.WFS', 0, 0),
(10, 'Nicola', 'Alì', 'nick', '$2y$10$o4mAHGVFmXYsY9WOI7IA.eb/2AY9FRkX6mcHSVb6weyOJcMdeZCBu', 0, 0),
(11, NULL, NULL, 'dfa', NULL, 0, 0),
(12, NULL, NULL, 'dfa', NULL, 0, 0),
(13, NULL, NULL, 'dfa', NULL, 0, 0),
(14, NULL, NULL, 'dfa', NULL, 0, 0),
(15, NULL, NULL, 'dfa', NULL, 0, 0),
(16, NULL, NULL, 'dfa', NULL, 0, 0),
(17, NULL, NULL, 'dfa', NULL, 0, 0),
(18, NULL, NULL, 'dfa', NULL, 0, 0),
(19, NULL, NULL, 'dfa', NULL, 0, 0),
(20, NULL, NULL, 'dfa', NULL, 0, 0),
(21, NULL, NULL, 'dfa', NULL, 0, 0),
(22, NULL, NULL, 'dfa', NULL, 0, 0),
(23, NULL, NULL, 'nick', NULL, 0, 0),
(24, NULL, NULL, 'nick', NULL, 0, 0),
(25, NULL, NULL, 'nick', NULL, 0, 0),
(26, NULL, NULL, 'nick', NULL, 0, 0),
(27, NULL, NULL, 'nick', NULL, 0, 0),
(28, NULL, NULL, 'nick', NULL, 0, 0),
(29, NULL, NULL, 'nick', NULL, 0, 0),
(30, NULL, NULL, 'nick', NULL, 0, 0),
(31, NULL, NULL, 'nick', NULL, 0, 0),
(32, NULL, NULL, 'nick', NULL, 0, 0),
(33, NULL, NULL, 'nick', NULL, 0, 0),
(34, NULL, NULL, 'nick', NULL, 0, 0),
(35, NULL, NULL, 'nick', NULL, 0, 0),
(36, NULL, NULL, 'nick', NULL, 0, 0),
(37, NULL, NULL, 'nick', NULL, 0, 0),
(38, NULL, NULL, 'nick', NULL, 0, 0),
(39, NULL, NULL, 'nick', NULL, 0, 0),
(40, NULL, NULL, 'nick', NULL, 0, 0),
(41, NULL, NULL, 'nick', NULL, 0, 0),
(42, NULL, NULL, 'nick', NULL, 0, 0),
(43, NULL, NULL, 'dasfas', NULL, 0, 0),
(44, NULL, NULL, 'dasfas', NULL, 0, 0),
(45, NULL, NULL, 'dasfas', NULL, 0, 0),
(46, NULL, NULL, 'dasfas', NULL, 0, 0),
(47, NULL, NULL, 'dasfas', NULL, 0, 0),
(48, NULL, NULL, 'dasfas', NULL, 0, 0),
(49, NULL, NULL, 'dasfas', NULL, 0, 0),
(50, NULL, NULL, 'dasfas', NULL, 0, 0),
(51, NULL, NULL, 'dasfas', NULL, 0, 0),
(52, NULL, NULL, 'dasfas', NULL, 0, 0),
(53, NULL, NULL, 'dasfas', NULL, 0, 0),
(54, NULL, NULL, 'dasfas', NULL, 0, 0),
(55, NULL, NULL, 'dasfas', NULL, 0, 0),
(56, NULL, NULL, 'dasfas', NULL, 0, 0),
(57, NULL, NULL, 'dasfas', NULL, 0, 0),
(58, NULL, NULL, 'dasfas', NULL, 0, 0),
(59, NULL, NULL, 'dasfas', NULL, 0, 0),
(60, NULL, NULL, 'dasfas', NULL, 0, 0),
(61, NULL, NULL, 'dasfas', NULL, 0, 0),
(62, NULL, NULL, 'dasfas', NULL, 0, 0),
(63, NULL, NULL, 'dasfas', NULL, 0, 0),
(64, NULL, NULL, 'dasfas', NULL, 0, 0),
(65, NULL, NULL, 'dasfas', NULL, 0, 0),
(66, NULL, NULL, 'dasfas', NULL, 0, 0),
(67, NULL, NULL, 'dasfas', NULL, 0, 0),
(68, NULL, NULL, 'dasfas', NULL, 0, 0),
(69, NULL, NULL, 'dasfas', NULL, 0, 0),
(70, NULL, NULL, 'dasfas', NULL, 0, 0),
(71, NULL, NULL, 'dasfas', NULL, 0, 0),
(72, NULL, NULL, 'dasfas', NULL, 0, 0),
(73, NULL, NULL, 'dasfas', NULL, 0, 0),
(74, NULL, NULL, 'dasfas', NULL, 0, 0),
(75, NULL, NULL, 'dasfas', NULL, 0, 0),
(76, NULL, NULL, 'dasfas', NULL, 0, 0),
(77, NULL, NULL, 'dasfas', NULL, 0, 0),
(78, NULL, NULL, 'dasfas', NULL, 0, 0),
(79, NULL, NULL, 'dasfas', NULL, 0, 0),
(80, NULL, NULL, 'dasfas', NULL, 0, 0),
(81, NULL, NULL, 'dasfas', NULL, 0, 0),
(82, NULL, NULL, 'dasfas', NULL, 0, 0),
(83, NULL, NULL, 'dasfas', NULL, 0, 0),
(84, NULL, NULL, 'dasfas', NULL, 0, 0),
(85, NULL, NULL, 'dasfas', NULL, 0, 0),
(86, NULL, NULL, 'dasfas', NULL, 0, 0),
(87, NULL, NULL, 'dasfas', NULL, 0, 0),
(88, NULL, NULL, 'dasfas', NULL, 0, 0),
(89, NULL, NULL, 'dasfas', NULL, 0, 0),
(90, NULL, NULL, 'dasfas', NULL, 0, 0),
(91, NULL, NULL, 'dasfas', NULL, 0, 0),
(92, NULL, NULL, 'dasfas', NULL, 0, 0),
(93, NULL, NULL, 'dasfas', NULL, 0, 0),
(94, NULL, NULL, 'dasfas', NULL, 0, 0),
(95, NULL, NULL, 'dasfas', NULL, 0, 0),
(96, NULL, NULL, 'dasfas', NULL, 0, 0),
(97, NULL, NULL, 'dasfas', NULL, 0, 0),
(98, NULL, NULL, 'dasfas', NULL, 0, 0),
(99, NULL, NULL, 'dasfas', NULL, 0, 0),
(100, NULL, NULL, 'dasfas', NULL, 0, 0),
(101, NULL, NULL, 'dasfas', NULL, 0, 0),
(102, NULL, NULL, 'dasfas', NULL, 0, 0),
(103, NULL, NULL, 'dasfas', NULL, 0, 0),
(104, NULL, NULL, 'dasfas', NULL, 0, 0),
(105, NULL, NULL, 'dasfas', NULL, 0, 0),
(106, NULL, NULL, 'dasfas', NULL, 0, 0),
(107, NULL, NULL, 'dasfas', NULL, 0, 0),
(108, NULL, NULL, 'dasfas', NULL, 0, 0),
(109, NULL, NULL, 'dasfas', NULL, 0, 0),
(110, NULL, NULL, 'dasfas', NULL, 0, 0),
(111, NULL, NULL, 'dasfas', NULL, 0, 0),
(112, NULL, NULL, 'dasfas', NULL, 0, 0),
(113, NULL, NULL, 'dasfas', NULL, 0, 0),
(114, NULL, NULL, 'dasfas', NULL, 0, 0),
(115, NULL, NULL, 'dasfas', NULL, 0, 0),
(116, NULL, NULL, 'dasfas', NULL, 0, 0),
(117, NULL, NULL, 'dasfas', NULL, 0, 0),
(118, NULL, NULL, 'dasfas', NULL, 0, 0),
(119, NULL, NULL, 'dasfas', NULL, 0, 0),
(120, NULL, NULL, 'dasfas', NULL, 0, 0),
(121, NULL, NULL, 'dasfas', NULL, 0, 0),
(122, NULL, NULL, 'dasfas', NULL, 0, 0),
(123, NULL, NULL, 'dasfas', NULL, 0, 0),
(124, NULL, NULL, 'dasfas', NULL, 0, 0),
(125, NULL, NULL, 'dasfas', NULL, 0, 0),
(126, NULL, NULL, 'dasfas', NULL, 0, 0),
(127, NULL, NULL, 'dasfas', NULL, 0, 0),
(128, NULL, NULL, 'nick', NULL, 0, 0),
(129, NULL, NULL, 'nick', NULL, 0, 0),
(130, NULL, NULL, 'dasfas', NULL, 0, 0),
(131, NULL, NULL, 'nick', NULL, 0, 0),
(132, NULL, NULL, 'matteo', NULL, 0, 0),
(133, NULL, NULL, 'matteo', NULL, 0, 0),
(134, NULL, NULL, NULL, NULL, 0, 0),
(135, NULL, NULL, 'chiellini', NULL, 0, 0),
(136, NULL, NULL, NULL, NULL, 0, 0),
(137, NULL, NULL, NULL, NULL, 0, 0),
(138, NULL, NULL, 'chiellini', NULL, 0, 0),
(139, NULL, NULL, 'chiellini', NULL, 0, 0),
(140, NULL, NULL, NULL, NULL, 0, 0),
(141, NULL, NULL, 'nick', NULL, 0, 0),
(142, NULL, NULL, 'chiello', NULL, 0, 0),
(143, NULL, NULL, 'matteo1curro@gmail.c', NULL, 0, 0),
(144, NULL, NULL, 'dasfas', NULL, 0, 0),
(145, NULL, NULL, NULL, NULL, 0, 0),
(146, NULL, NULL, NULL, NULL, 0, 0),
(147, NULL, NULL, 'matteo', NULL, 0, 0),
(148, NULL, NULL, 'nick', NULL, 0, 0),
(149, NULL, NULL, 'nick', NULL, 0, 0),
(150, NULL, NULL, 'nick', NULL, 0, 0),
(151, NULL, NULL, 'nick', NULL, 0, 0),
(152, NULL, NULL, 'nick', NULL, 0, 0),
(153, NULL, NULL, 'chiello', NULL, 0, 0),
(154, NULL, NULL, 'chiello', NULL, 0, 0),
(155, NULL, NULL, 'chiello', NULL, 0, 0),
(156, NULL, NULL, NULL, NULL, 0, 0),
(157, NULL, NULL, 'chiello', NULL, 0, 0),
(158, NULL, NULL, 'chiello', NULL, 0, 0),
(159, NULL, NULL, 'nick', NULL, 0, 0),
(160, NULL, NULL, 'nick', NULL, 0, 0),
(161, NULL, NULL, 'nick', NULL, 0, 0),
(162, NULL, NULL, 'nick', NULL, 0, 0),
(163, NULL, NULL, 'nick', NULL, 0, 0),
(164, NULL, NULL, 'nick', NULL, 0, 0),
(165, NULL, NULL, 'nick', NULL, 0, 0),
(166, NULL, NULL, 'nick', NULL, 0, 0),
(167, NULL, NULL, 'nick', NULL, 0, 0),
(168, NULL, NULL, 'dasfas', NULL, 0, 0),
(169, NULL, NULL, NULL, NULL, 0, 0),
(170, NULL, NULL, 'valenti', NULL, 0, 0),
(171, NULL, NULL, 'matteo', NULL, 0, 0),
(172, NULL, NULL, 'nick', NULL, 0, 0),
(173, NULL, NULL, 'dasfas', NULL, 0, 0),
(174, 'a', 'b', 'c', '$2y$10$/eFftLjnhe/hAi4bdNBILOea4bAF7j6xMDGraNic3qB0XY7N1U9KG', 0, 0),
(175, NULL, NULL, 'aaaaaaaa', NULL, 0, 0),
(176, NULL, NULL, 'df', NULL, 0, 0),
(177, NULL, NULL, 'matteo', NULL, 0, 0),
(178, NULL, NULL, 'matteo', NULL, 0, 0),
(179, NULL, NULL, 'fra', NULL, 0, 0),
(180, 'Nicola', 'a', 'mala', '$2y$10$PBOyb2XhgQJ/DjgYH0MIxeGbJL/tWQoLA2g.f6JRj1dAJagsMhw9y', 0, 0),
(181, NULL, NULL, 'aaa', NULL, 0, 0),
(182, 'Nicola', 'Alì', 'nic', '$2y$10$FQ.4MrmzNpy.5KfbSJ/R3O7NoCD9NjclbA/1J3VTvOsLcSJNCPPZa', 0, 0),
(183, NULL, NULL, 'fra', NULL, 0, 0),
(184, NULL, NULL, 'mar', NULL, 0, 0),
(185, NULL, NULL, 'fra', NULL, 0, 0),
(186, 'Nicola', 'Alì', 'adsfadsf', '$2y$10$36z2Ko229B3Ux3S5MULdW.Ewf0aQ7l.8xKuwn0Ll9wikvuly0C/yK', 0, 0),
(187, 'Nicola', 'b', 'dslkakfgaosdihg', '$2y$10$WdwZpNvHZdjIupBGOAS7Hu9DDvyiTqJpXUSL6LHpASm1O/8NGHRBm', 0, 0),
(188, 'Nicola', 'fsg', 'dasgadsads', '$2y$10$eIwE37zdL6IKZdjD2JOem.k/RQkff9ifuoXfRrqhtNZ.ogcKawUN6', 0, 0),
(189, NULL, NULL, 'chiello', NULL, 0, 0),
(190, NULL, NULL, 'ciao', NULL, 0, 0),
(191, NULL, NULL, 'Matteo', NULL, 0, 0),
(192, NULL, NULL, 'francesco', NULL, 0, 0),
(193, 'francesco', 'currò', 'frank', '$2y$10$4xjlJiXsJ9NXq6AaA60OSOjZ/WdBS3j7AJuKCd/zUXoYVVs1PdNuu', 0, 0);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `xu` (`user`),
  ADD KEY `xp` (`pool`);

--
-- Indici per le tabelle `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `xp` (`pool`);

--
-- Indici per le tabelle `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `xu` (`user`),
  ADD KEY `xv` (`vote`);

--
-- Indici per le tabelle `pools`
--
ALTER TABLE `pools`
  ADD PRIMARY KEY (`id`),
  ADD KEY `xuser` (`user`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT per la tabella `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT per la tabella `participants`
--
ALTER TABLE `participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=252;

--
-- AUTO_INCREMENT per la tabella `pools`
--
ALTER TABLE `pools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=194;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`pool`) REFERENCES `pools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`pool`) REFERENCES `pools` (`id`);

--
-- Limiti per la tabella `participants`
--
ALTER TABLE `participants`
  ADD CONSTRAINT `participants_ibfk_1` FOREIGN KEY (`vote`) REFERENCES `options` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `participants_ibfk_2` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `pools`
--
ALTER TABLE `pools`
  ADD CONSTRAINT `pools_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
