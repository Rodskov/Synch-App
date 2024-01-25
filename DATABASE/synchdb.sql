-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2024 at 05:43 PM
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
('William James Elumba', 'Simonde44', 'josellemoniqueencisobf4life', 'PUP'),
('Monique', 'Polariaris', 'elle', 'OLFU'),
('Luffy D. Monkey', 'LDM', '0505', 'Straw Hats Pirate'),
('Real User', 'User_Real_99', 'mp3PPZr+RoiEtpGgUpJ5', 'OrgLang');

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
('Sim44', '1234'),
('elle', '1234'),
('Simonde44', '1234'),
('User_Real_99', 'asdf'),
('Polariaris', 'asdf1234');

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
