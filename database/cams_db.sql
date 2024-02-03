-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2023 at 10:49 AM
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
-- Database: `php_coms_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `AssetID` int(11) NOT NULL,
  `AssetName` varchar(20) DEFAULT NULL,
  `Serial_no` varchar(50) DEFAULT NULL,
  `Model` varchar(50) DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `AcquisitionDate` date DEFAULT NULL,
  `ConditionID` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`AssetID`, `AssetName`, `Serial_no`, `Model`, `Status`, `AcquisitionDate`, `ConditionID`) VALUES
(1, 'Monitor', '56122002', 'DELL', 'Not in use', '2023-11-16', 1),
(2, 'CPU', '56122444', 'HP', 'In use', '2023-11-26', 2);

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `AssignID` int(11) NOT NULL,
  `AssetID` int(11) NOT NULL,
  `AdminID` int(11) NOT NULL,
  `StaffID` int(11) NOT NULL,
  `Remarks` varchar(200) DEFAULT NULL,
  `AssignDate` date NOT NULL,
  `ReturnDate` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`AssignID`, `AssetID`, `AdminID`, `StaffID`, `Remarks`, `AssignDate`, `ReturnDate`) VALUES
(1, 1, 2, 1, 'To replace broken monitor', '2023-11-16', '2026-01-09'),
(2, 2, 2, 1, 'For new Staff', '2023-11-18', '2026-12-03');

-- --------------------------------------------------------

--
-- Table structure for table `conditions`
--

CREATE TABLE `conditions` (
  `ConditionID` int(11) NOT NULL,
  `Condition_name` varchar(200) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `conditions`
--

INSERT INTO `conditions` (`ConditionID`, `Condition_name`) VALUES
(1, 'New'),
(2, 'Broken');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `First_name` varchar(20) DEFAULT NULL,
  `Last_name` varchar(20) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Phone_no` varchar(15) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `Role` tinyint(1) DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `First_name`, `Last_name`, `Email`, `Phone_no`, `Password`, `Role`) VALUES
(1, 'Juma', 'Hamisi', 'juma@gmail.com', '0778723433', '4429a7dc9647588d464bc9b777eb00f8b987e4d9d9027680a9', 0),
(2, 'Mike', 'Mtoi', 'mike@gmail.com', '077857583', 'mike23', 1),
(3, 'Hashim', 'Ally', 'hashimally@gmail.com', '0712232356', '3e18e9f80d16d030185c5bc9278962c0deb45dbbf6f38ab644', 0),
(4, 'Hashim', 'Ally', 'hasim@gmail.com', '0788564455', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`AssetID`),
  ADD KEY `ConditionID` (`ConditionID`);

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`AssignID`),
  ADD KEY `AssetID` (`AssetID`),
  ADD KEY `AdminID` (`AdminID`),
  ADD KEY `fk_assign_staff` (`StaffID`);

--
-- Indexes for table `conditions`
--
ALTER TABLE `conditions`
  ADD PRIMARY KEY (`ConditionID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `AssetID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `AssignID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `conditions`
--
ALTER TABLE `conditions`
  MODIFY `ConditionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
