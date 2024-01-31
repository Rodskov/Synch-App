-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2024 at 06:15 PM
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
-- Table structure for table `access_types`
--

CREATE TABLE `access_types` (
  `access_level` int(2) NOT NULL,
  `access_desc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `access_types`
--

INSERT INTO `access_types` (`access_level`, `access_desc`) VALUES
(3, 'Owner'),
(2, 'Administrator'),
(1, 'Member');

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
('Sample', 'UsernameSample', 'gGX3KF8aEpRY2ihRP2W0', 'SampleOrg'),
('John Smith', 'JS', 'sTO+uy/LGezTfPRc8w4D', 'MI6'),
('Johnny C. Isla', 'JCI', '8nc8Y+0mMsTwUktFA8hn', 'Wattpad'),
('Bigmom Kaido', 'onigashima', 'tFJutWcLzYrlo3LdoL6KU62mqwHYVkK1crFqKWvhzKV+D/De5J', 'one piece'),
('Sample', 'HelloSample', 'BXvsYuIe9xV3nWXQLTzddGXg2DoDRckf2N9lALx5/NTbxS+IQs', 'PUP'),
('SampleHere', '1234', 's+jlqBs4MnY3UAU3RU+a8pJPOx+Q1UntttDo7ReReO/HyqU64L', 'PUP');

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `send_to` varchar(255) NOT NULL,
  `sent_from` varchar(255) NOT NULL,
  `request_type` int(1) NOT NULL,
  `status` int(1) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `team_id` varchar(255) NOT NULL,
  `req_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`send_to`, `sent_from`, `request_type`, `status`, `owner`, `team_id`, `req_id`) VALUES
('Rodskov', 'Simonde44', 1, 0, 'Rodskov', 'OS_2024', '9R1gawtHW'),
('Rodskov', 'Polariaris', 1, 0, 'Rodskov', 'OS_2024', 'aD0FEasdT'),
('Polariaris', 'Simonde44', 1, 0, 'Polariaris', 'WD_2024', 'DzXetKt7/'),
('Polariaris', 'Rodskov', 1, 0, 'Polariaris', 'WD_2024', 'JX7YInJzd'),
('Simonde44', 'Polariaris', 1, 0, 'Simonde44', 'FORP_2024', 'mvz5qOUbb'),
('Simonde44', 'Polariaris', 1, 0, 'Simonde44', 'FSHR_212', '3eZNjcLrz'),
('Simonde44', 'Polariaris', 1, 0, 'Simonde44', 'CSI_2024', 'gTwTK2G5u'),
('Simonde44', 'Polariaris', 1, 0, 'Simonde44', 'CrimLaw_2024', 'Ygj7s4uHO'),
('Polariaris', 'Simonde44', 1, 0, 'Polariaris', 'LCD_2024', '7I/fryCvL'),
('Rodskov', 'Polariaris', 1, 0, 'Rodskov', 'CSI_2024', '5cqVccdcf'),
('Rodskov', 'Polariaris', 1, 0, 'Rodskov', 'CrimLaw_2024', 'zYtovrIdU');

-- --------------------------------------------------------

--
-- Table structure for table `request_details`
--

CREATE TABLE `request_details` (
  `req_id` varchar(255) NOT NULL,
  `req_info` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `request_details`
--

INSERT INTO `request_details` (`req_id`, `req_info`) VALUES
('9R1gawtHW', 'Simonde44 has invited you to join Operating Systems'),
('aD0FEasdT', 'Polariaris has invited you to join Operating Systems'),
('DzXetKt7/', 'Simonde44 has invited you to join Web Development'),
('JX7YInJzd', 'Rodskov has invited you to join Web Development'),
('mvz5qOUbb', 'Polariaris has invited you to join Forensic Photography'),
('3eZNjcLrz', 'Polariaris has invited you to join Human Rights'),
('gTwTK2G5u', 'Polariaris has invited you to join Crime Scene Investigation'),
('Ygj7s4uHO', 'Polariaris has invited you to join Criminal Law'),
('7I/fryCvL', 'Simonde44 has invited you to join Logic Circuits and Design'),
('5cqVccdcf', 'Polariaris has invited you to join Crime Scene Investigation'),
('zYtovrIdU', 'Polariaris has invited you to join Criminal Law');

-- --------------------------------------------------------

--
-- Table structure for table `req_types`
--

CREATE TABLE `req_types` (
  `request_type` int(255) NOT NULL,
  `detail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `req_types`
--

INSERT INTO `req_types` (`request_type`, `detail`) VALUES
(1, 'team_invite');

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
('LDM', 'asdf'),
('JS', 'qwer'),
('JCI', 'zxcv'),
('onigashima', 'cherry'),
('HelloSample', 'asdf'),
('1234', 'zxcv'),
('asdf', 'zxcv'),
('asdfasdf', 'asdf'),
('asdf', 'asdf');

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
('Data and Digital Communications', 'DDC_2024'),
('Forensic Photography', 'FORP_2024'),
('Crime Scene Investigation', 'CSI_2024'),
('Criminal Law', 'CrimLaw_2024'),
('Logic Circuits and Design', 'LCD_2024'),
('Human Rights', 'FSHR_212');

-- --------------------------------------------------------

--
-- Table structure for table `team_members_list`
--

CREATE TABLE `team_members_list` (
  `user_id` varchar(255) NOT NULL,
  `team_id` varchar(255) NOT NULL,
  `access_level` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team_members_list`
--

INSERT INTO `team_members_list` (`user_id`, `team_id`, `access_level`) VALUES
('4321', 'OS_2024', 0),
('Sim44', 'OS_2024', 0),
('Sim44', 'WD_2024', 0),
('4321', 'FCS_2024', 0),
('Sim44', 'FCS_2024', 0),
('Sim44', 'DDC_2024', 0),
('elle', 'FCS_2024', 0),
('elle', 'WD_2024', 0),
('LDM', 'OS_2024', 0),
('0505', 'OS_2024', 0),
('User_Real_99', 'WD_2024', 0),
('Polariaris', 'OS_2024', 0),
('Rodskov', 'WD_2024', 0),
('Polariaris', 'WD_2024', 3),
('Simonde44', 'WD_2024', 2),
('Polariaris', 'FORP_2024', 3),
('Polariaris', 'CSI_2024', 3),
('Polariaris', 'CrimLaw_2024', 3),
('Simonde44', 'LCD_2024', 3),
('Polariaris', 'FSHR_212', 3);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
