-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2024 at 08:12 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `synchdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients_users`
--

CREATE TABLE `clients_users` (
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `id` varchar(255) NOT NULL,
  `organization` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients_users`
--

INSERT INTO `clients_users` (`name`, `username`, `id`, `organization`) VALUES
('Another', 'AnotherUser', '4321', 'PUP'),
('William', 'Simonde44', 'josellemonique4life', 'PUP'),
('Monique', 'Polariaris', 'williamjames4life', 'OLFU'),
('Luffy D. Monkey', 'LDM', '0505', 'Straw Hats Pirate'),
('Real User', 'User_Real_99', 'mp3PPZr+RoiEtpGgUpJ5', 'OrgLang'),
('Justin', 'Rodskov', 'H/kUuwrmVLsYrK3ee159', 'PUP'),
('Human', 'UserHuman', '9b+4X8mP5zEb4T6+zPvX', 'Humanity'),
('Alien', 'UserAlien', '8mQViARzbqy5odiSLskq', 'OuterSpace'),
('Humalien', 'Alien_Human', 'amwps2lOeR+0PkqnIFiY', 'EarthAndSpace'),
('Sample', 'UsernameSample', 'gGX3KF8aEpRY2ihRP2W0', 'SampleOrg');

-- --------------------------------------------------------

--
-- Table structure for table `secret_creds`
--

CREATE TABLE `secret_creds` (
  `user_id` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `secret_creds`
--

INSERT INTO `secret_creds` (`user_id`, `pass`) VALUES
('Simonde44', '1234'),
('Polariaris', '1234'),
('Rodskov', 'qwer'),
('UserHuman', 'zxcv'),
('UserAlien', 'tyui'),
('Alien_Human', 'fdsa'),
('UsernameSample', 'zxcv'),
('User_Real_99', 'asdf'),
('LDM', 'asdf');

-- --------------------------------------------------------

--
-- Table structure for table `team_groups_name`
--

CREATE TABLE `team_groups_name` (
  `team_name` varchar(255) NOT NULL,
  `team_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team_groups_name`
--

INSERT INTO `team_groups_name` (`team_name`, `team_id`) VALUES
('Operating Systems', 'OS_2024'),
('Web Development', 'WD_2024'),
('Control Systems', 'FCS_2024'),
('Data and Digital Communications', 'DDC_2024');

-- --------------------------------------------------------

--
-- Table structure for table `team_members_list`
--

CREATE TABLE `team_members_list` (
  `user_id` varchar(255) NOT NULL,
  `team_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team_members_list`
--

INSERT INTO `team_members_list` (`user_id`, `team_id`) VALUES
('4321', 'OS_2024'),
('Sim44', 'OS_2024'),
('Sim44', 'WD_2024'),
('4321', 'FCS_2024'),
('Sim44', 'FCS_2024'),
('Sim44', 'DDC_2024'),
('elle', 'FCS_2024'),
('elle', 'WD_2024'),
('LDM', 'OS_2024'),
('0505', 'OS_2024'),
('Simonde44', 'OS_2024'),
('Simonde44', 'WD_2024'),
('User_Real_99', 'WD_2024'),
('Polariaris', 'OS_2024');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
