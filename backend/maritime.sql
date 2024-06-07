-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2024 at 06:32 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `maritime`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int AUTO_INCREMENT NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`user_id`, `username`, `email`, `password`, `first_name`, `last_name`, `contact_number`) VALUES

(1, 'admin', 'sohail@gmail.com', 'admin', 'Sohail', 'Ahmad', '0325487695');

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications_for_courses_and_programs` (
  `app_id` int AUTO_INCREMENT NOT NULL,
  `std_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `program_id` int(11) DEFAULT NULL,
  `AppDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `Status` varchar(20) DEFAULT 'Pending',
  PRIMARY KEY (`app_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications_for_courses_and_programs` (`std_id`, `course_id`, `program_id`, `AppDate`, `Status`) VALUES
(1, 2, NULL, '2024-05-09 20:55:39', 'accepted'),
(2, NULL, 1, '2024-05-10 09:30:21', 'accepted'),
(3, 4, NULL, '2024-05-11 14:15:52', 'accepted'),
(4, NULL, 3, '2024-05-12 11:01:01', 'accepted'),
(5, 1, NULL, '2024-05-13 08:45:16', 'accepted'),
(6, NULL, 5, '2024-05-14 10:22:33', 'Pending'),
(7, 2, NULL, '2024-05-15 16:47:19', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int AUTO_INCREMENT NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `duration_months` varchar(11) DEFAULT NULL,
  `instructor` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `content` varchar(255),
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_name`, `description`, `duration_months`, `instructor`, `image_url`, `content`) VALUES
('Polar Code Course', 'This course provides training for navigation officers who operate ships in polar
waters and to address additional provisions deemed necessary for consideration
beyond existing requirements of the
SOLAS and MARPOL Conventions.', 2, 'Robert Smith','', 'courses/PolarCodeAnnex19.pdf'),
('Megaship handling ', 'The goal of the course is to improve the
participants’ knowledge and manoeuvring
skills when handling megaships efficiently
and safely in confined waters.', 1, 'Robert Smith', '/', 'courses/RBS-PTI69-2.pdf'),
('IMO960 Tug Course for Marine Pilots', 'The marine pilots will gain an improved
understanding of the possibilities and
limitations of tug operations. During
manoeuvring exercises, they will learn to
communicate efficiently with pilots and
tug masters.', 1, 'Jens Tommerup', 'uploads\\ml_1.jpg,uploads\\ml_2.jpg', 'courses/tugcourse.pdf, courses/good-practice-guide-for-pilots_tugcourse.pdf'),
('Ship Handling', 'The course consists of theoretical lessons
concerning ship handling theory and
hydrodynamics. 
Specially designed simulator exercises
transfer the theory into ship handling
skills', 3, 'admin', 'uploads\\cloud_computing_1.jpg,uploads\\cloud_computing_2.jpg', 'courses/Guide_to_Ship_Handling.pdf'),
('Train-the-Trainers', 'The course provides knowledge and skills
on how to teach different courses in the
best possible way. It is designed for new
simulator instructors and focuses on pedagogical skills, communicative tools and
debriefing techniques', 4, 'Jens Tommerup', 'uploads\\cyber_security_1.jpg,uploads\\cyber_security_2.jpg', ''),
('FPSO Tandem Mooring', 'The exercises will take place in three simulators representing the FSO, the tanker
and the assisting tug. The participants will
control the tanker and the assisting tug.', 1, 'Torben Solmer
', 'uploads\\blockchain_1.jpg,uploads\\blockchain_2.jpg', 'courses/2002-OWA-FPSO-Mooring-and-Offloading-System-Alternatives-for-Deepwater-West-Africa.pdf'),
('IMO960 Ship Handling Course
for Marine Pilots', 'The course focuses on practical ship handling based on best practices and theoretical
knowledge. Various difficult ship handling
tasks will be conducted in the simulator
reflecting the real challenges pilots meet', 2, 'Carl Thue Rabjerg', 'uploads\\big_data_1.jpg,uploads\\big_data_2.jpg', 'courses/Behavior_and_Handling_of_Ship.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `employers`
--

CREATE TABLE `employers` (
  `employer_id` int AUTO_INCREMENT NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `company_website` varchar(255) DEFAULT NULL,
  `company_size` int(11) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`employer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employers`
--

INSERT INTO `employers` (`user_id`,`username`, `email`, `company_name`, `contact_email`, `contact_number`, `company_website`, `company_size`, `location`, `description`) VALUES
(4, 'Zara', 'zara@gmail.com', 'Devsinc', 'unknown@gmail.com', '032577985', 'www.unknown.com', 25, 'lahore', 'software house'),
(7, 'Abdullah', 'abd@gmail.com', 'Devsort', 'loremipsum@gmail.com', '032577985', 'www.example.com', 100, 'islamabad', 'Software house'),
(11, 'Ayesha', 'ayesha@gmail.com', 'IceCreativez', 'loremipsum@gmail.com', '032577985', 'www.example.com', 500, 'karachi', 'nestle'),
(13, 'Wahaj', 'wahaj@gmail.com', 'Arbisoft', 'loremipsum@gmail.com', '032577985', 'www.example.com', 300, 'lahore', 'marketing agency'),
(16, 'Hiba', 'hiba@gmail.com',  'Digital firm', 'loremipsum@gmail.com', '032577985', 'www.example.com', 500, 'islamabad', 'advertising company'),
(17, 'Ahmad', 'ahmad@gmail.com', 'FiveRivers Technology', 'loremipsum@gmail.com', '031245478', 'www.example.com', 1000, 'lahore', 'Software company'),
(18, 'Hina', 'hina@gmail.com', 'BPO Center', 'loremipsum@gmail.com', '012345', 'www.example.com', 2000, 'lahore', 'BPO service center'),
(19, 'Ihtisham', 'Ihtisham@gmail.com', 'Codeninja', 'loremipsum@gmail.com', '012345', 'www.example.com', 1500, 'islamabad', 'US based software company'),
(20, 'Umer', 'umer@gmail.com',  'Cybrnode', 'loremipsum@gmail.com', '012345', 'www.example.com', 25, 'lahore', 'startup'),
(21, 'Iqra', 'iqra@gmail.com', 'Arhmasoft', 'loremipsum@gmail.com', '012345', 'www.example.com', 200, 'karachi', 'Software company specializing in artificial intelligence');


--
-- Table structure for table `jobapplications`
--

CREATE TABLE `jobapplications` (
  `app_id` int AUTO_INCREMENT NOT NULL,
  `jobSeeker_id` int(11) DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL,
  `AppDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `Status` varchar(20) DEFAULT 'Pending',
  `ResumeURL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`app_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO jobapplications (jobSeeker_id, job_id, AppDate, Status, ResumeURL) VALUES
(1, 1, CURRENT_TIMESTAMP(), 'Pending', 'uploads/resumes/sara.pdf'),
(2, 4, CURRENT_TIMESTAMP(), 'Pending', 'uploads/resumes/esha.pdf'),
(4, 2, CURRENT_TIMESTAMP(), 'Pending', 'uploads/resumes/juweria.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `job_id` int AUTO_INCREMENT NOT NULL,
  `job_title` varchar(255) NOT NULL,
  `job_description` text DEFAULT NULL,
  `requirements` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `employer_id` int(11) DEFAULT NULL,
  `PostingDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `ExpiryDate` date DEFAULT NULL,
  PRIMARY KEY (`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `jobs` (`job_title`, `job_description`, `requirements`, `location`, `salary`, `employer_id`, `PostingDate`, `ExpiryDate`) VALUES
('Software Engineer', 'Develop and maintain web applications', 'BSc in Computer Science, 2+ years experience in web development', 'lahore', 75000.00, 1, '2024-05-13 10:00:00', '2024-08-13'),
('Data Analyst', 'Analyze and interpret complex data sets', 'BSc in Statistics, 1+ year experience in data analysis', 'islamabad', 70000.00, 2, '2024-05-14 10:00:00', '2024-08-14'),
('Project Manager', 'Manage and oversee project development', 'BSc in Management, 3+ years experience in project management', 'karachi', 85000.00, 3, '2024-05-15 10:00:00', '2024-08-15'),
('Graphic Designer', 'Create visual concepts to communicate ideas', 'BSc in Graphic Design, 2+ years experience in graphic design', 'lahore', 60000.00, 4, '2024-05-16 10:00:00', '2024-08-16'),
('Marketing Specialist', 'Develop and implement marketing strategies', 'BSc in Marketing, 1+ year experience in marketing', 'islamabad', 65000.00, 5, '2024-05-17 10:00:00', '2024-08-17'),
('HR Manager', 'Oversee HR department and ensure compliance', 'BSc in Human Resources, 5+ years experience in HR management', 'karachi', 90000.00, 6, '2024-05-18 10:00:00', '2024-08-18');


-- --------------------------------------------------------

--
-- Table structure for table `jobseekers`
--
CREATE TABLE `jobseekers` (
  `jobSeeker_id` int AUTO_INCREMENT NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `resumeURL` varchar(255) DEFAULT NULL,
  `skills` text DEFAULT NULL,
  `workExperience` text DEFAULT NULL,
  `education` text DEFAULT NULL,
  `certifications` text DEFAULT NULL,
  `languages` text DEFAULT NULL,
  PRIMARY KEY (`jobSeeker_id`),
  CONSTRAINT `FK_jobseekers_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobseekers`
--

INSERT INTO `jobseekers` (`user_id`, `email`, `resumeURL`, `skills`, `workExperience`, `education`, `certifications`, `languages`) VALUES
(5, 'sara@gmail.com', 'sara.pdf', 'Java, Python, SQL', '5 years at TechCorp', 'B.Sc. Computer Science', 'Oracle Certified Java Programmer', 'English, Spanish'),
(8, 'esha@gmail.com', 'esha.pdf', 'HTML, CSS, JavaScript', '3 years at WebDesign Ltd.', 'B.A. Graphic Design', 'Certified Web Developer', 'English, French'),
(17, 'abdullah01@gmail.com', 'abdullah.pdf', 'C++, C#, .NET', '7 years at SoftSolutions', 'M.Sc. Software Engineering', 'Microsoft Certified Solutions Developer', 'English, German'),
(22, 'juweria@gmail.com', 'juweria.pdf', 'Python, Data Science, R', '4 years at DataAnalytics Inc.', 'B.Sc. Data Science', 'Certified Data Scientist', 'English, Chinese'),
(23, 'kiran@gmail.com', 'kiran.pdf', 'PHP, MySQL, Laravel', '6 years at WebTech', 'B.Sc. Information Technology', 'Zend Certified PHP Engineer', 'English, Japanese');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int AUTO_INCREMENT NOT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `body` text DEFAULT NULL,
  `Timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`sender_id`, `receiver_id`, `subject`, `body`, `Timestamp`) VALUES
(1, 2, 'test', '......', '2024-05-13 15:28:58');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int AUTO_INCREMENT NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `notificationType` varchar(50) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `IsRead` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`notification_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`user_id`, `notificationType`, `content`, `IsRead`) VALUES
(1, 'imp', 'test', 0);

-- --------------------------------------------------------

--
-- Table structure for table `progress`
--

CREATE TABLE `progress` (
  `ProgressID` int AUTO_INCREMENT NOT NULL,
  `std_id` int(11) DEFAULT NULL,
  `CourseID` int(11) DEFAULT NULL,
  `ProgramID` int(11) DEFAULT NULL,
  `ProgressPercentage` int(11) DEFAULT NULL,
  `CompletionStatus` varchar(20) DEFAULT NULL,
  `LastUpdatedDate` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`ProgressID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO progress (std_id, CourseID, ProgramID, ProgressPercentage, CompletionStatus, LastUpdatedDate) VALUES
(1, 2, NULL, 75, 'In Progress', CURRENT_TIMESTAMP()),
(2, NULL, 1, 100, 'Completed', CURRENT_TIMESTAMP()),
(3, 4,NULL, 50, 'In Progress', CURRENT_TIMESTAMP()),
(4, NULL, 3, 25, 'In Progress', CURRENT_TIMESTAMP()),
(5, 1, NULL, 90, 'In Progress', CURRENT_TIMESTAMP());

-- --------------------------------------------------------

--
-- Table structure for table `resume`
--

CREATE TABLE `resume` (
  `resume_id` int(11) AUTO_INCREMENT,
  `jobSeeker_id` int(11) DEFAULT NULL,
  `resume_URL` varchar(255) DEFAULT NULL,
  `LastUpdatedDate` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`resume_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `resume`
--

INSERT INTO `resume` (`jobSeeker_id`, `resume_URL`, `LastUpdatedDate`) VALUES
(1, 'resumes/sara.pdf', CURRENT_TIMESTAMP()),
(2, 'resumes/esha.pdf', CURRENT_TIMESTAMP()),
(3, 'resumes/abdullah.pdf', CURRENT_TIMESTAMP()),
(4, 'resumes/juweriakazmi.pdf', CURRENT_TIMESTAMP()),
(5, 'resumes/kiran.pdf', CURRENT_TIMESTAMP());

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `std_id` int AUTO_INCREMENT NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `studentName` varchar(255) DEFAULT NULL,
  `studentIDNumber` varchar(20) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `contact_no` varchar(255) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`std_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`user_id`, `studentName`, `studentIDNumber`, `first_name`, `last_name`, `contact_no`, `gender`, `address`) VALUES
(3, 'Ali Khan', 'std01', 'Ali', 'Khan', '03258967420', 'male', 'islamabad'),
(6, 'Rehan Ahmed', 'std02', 'Rehan', 'Ahmed', '03258967421', 'male', 'lahore'),
(9, 'Amna Sadiq', 'std03', 'Amna', 'Sadiq', '03158967420', 'female', 'karachi'),
(10, 'Amna Saleem', 'std04', 'Amna', 'Saleem', '03150967420', 'female', 'islamabad'),
(14, 'Saliha Nabil', 'std05', 'Saliha', 'Nabil', '03158968420', 'female', 'lahore'),
(15, 'Ali Murtaza', 'std06', 'Ali', 'Murtaza', '03158967425', 'male', 'karachi');

-- --------------------------------------------------------

--
-- Table structure for table `trainingprograms`
--

CREATE TABLE `trainingprograms` (
  `program_id` int AUTO_INCREMENT NOT NULL,
  `program_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `duration_months` int(11) DEFAULT NULL,
  `trainer` varchar(255) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `content` varchar(255) ,
  PRIMARY KEY (`program_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trainingprograms`
--

INSERT INTO `trainingprograms` (`program_name`, `description`, `duration_months`, `trainer`, `img_url`, `content`) VALUES
('Tug Handling Training', 'Our three-level training program is designed for tug captains and officers. The training is adjusted according to the tug type, the participants’ level of experience and any other specific requirements of the client.', 4, 'Dr. Sohail Ahmad', 'uploads/', 'trainingProgramsContent/PUBS-Loss-Prevention-Tug-and-Tow-Safety-and-Operational-Guide_A5_0715.pdf'),
('Basic Training (STCW)', ' The STCW Convention sets out the minimum qualification requirements for all personnel serving on board seagoing merchant ships.  Completion of a Basic Training (STCW) course is mandatory for all officers and ratings who want to work on commercial vessels.', 1, 'Dr. Sohail Ahmad', 'uploads/','trainingProgramsContent/International Students full STCW training enrolment pack.pdf'),
('Bridge Simulator Training', 'Bridge simulator training provides seafarers with realistic experience in navigating ships in various conditions. Simulator training can cover a variety of scenarios, such as collision avoidance, maneuvering in restricted waters, and bad weather conditions.
pen_spark
', 4, 'Dr. Sohail Ahmad', 'uploads/', 'trainingProgramsContent/developing-framework-for-maritime-simulator-training.pdf'),
('Engine Room Simulator Training', ' Simulator training can cover a variety of scenarios, such as troubleshooting engine problems, responding to emergencies, and carrying out routine maintenance procedures.', 3, 'Dr. Sohail Ahmad', 'uploads/', 'trainingProgramsContent/engine-room-simulator-training-v4.pdf'),
('Cargo Handling Training', 'Cargo handling training provides seafarers with the skills and knowledge needed to safely and efficiently load, unload, and handle cargo on board ships.', 2, 'Dr. Sohail Ahmad', 'uploads/', 'trainingProgramsContent/12290987_03.pdf'),
('Liquefied Natural Gas (LNG) Training', 'Seafarers who will be working on LNG-fueled ships need to undergo special training in order to safely handle LNG. LNG training covers a variety of topics, such as the properties of LNG, the hazards associated with LNG, and the safe handling of LNG operations.', 2, 'Dr. Sohail Ahmad', 'uploads/', 'trainingProgramsContent/Liquefied-Natural-Gas_previewwtrmrk.pdf');

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int AUTO_INCREMENT NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_age` int(11) NOT NULL,
  `user_gender` varchar(15) NOT NULL,
  `role` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `email`, `user_age`, `user_gender`, `role`) VALUES
('Noor', '257963', 'noor@gmail.com', 22, 'female', 'student'),
('Sohail', '257931', 'sohail@gmail.com', 22, 'male', 'employer'),
('Ali', '67913502', 'ali@gmail.com', 20, 'male', 'student'),
('Zara', '852460', 'zara@gmail.com', 26, 'female', 'employer'),
('Sara', '3791582', 'sara@gmail.com', 24, 'female', 'Job Seeker'),
('Rehan', '1089627', 'rehan@gmail.com', 20, 'male', 'student'),
('Abdullah Rizwan', '1089627', 'abd@gmail.com', 28, 'male', 'employer'),
('Esha', '139752', 'esha@gmail.com', 27, 'female', 'Job Seeker'),
('Amna', '1257963', 'amna@gmail.com', 21, 'female', 'student'),
('Amna', '1257853', 'amna01@gmail.com', 20, 'female', 'student'),  -- New row to avoid duplicates
('Ayesha', '257963', 'ayesha@gmail.com', 25, 'female', 'employer'),
('Abdullah', '257964', 'abdullah@gmail.com', 26, 'Male', 'Job Seeker'),
('Wahaj', '1679243', 'wahaj@gmail.com', 25, 'Male', 'employer'),
('Saliha', '123456', 'saliha@gmail.com', 22, 'Female', 'Student'),
('Ali01', '1234567', 'ali01@gmail.com', 22, 'Male', 'Student'),
('Hiba', '123654', 'hiba@gmail.com', 24, 'Female', 'employer'),
('Ahmad', 'ahmad123', 'ahmad@gmail.com', 25, 'Male', 'employer'),
('Hina', 'hina123', 'hina@gmail.com', 21, 'Female', 'employer'),
('Ihtisham', 'Ihtisham123', 'Ihtisham@gmail.com', 23, 'Male', 'employer'),
('Umer', 'umer123', 'umer@gmail.com', 23, 'Male', 'employer'),
('Iqra', 'iqra123', 'iqra@gmail.com', 21, 'Female', 'employer'),
('Juweria', 'juweria123', 'juweria@gmail.com', 24, 'Female', 'Job Seeker'),
('Kiran', 'Kiran123', 'kiran@gmail.com', 21, 'Female', 'Job Seeker');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `applications`
--
ALTER TABLE `applications_for_courses_and_programs`
  ADD PRIMARY KEY (`app_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `employers`
--
ALTER TABLE `employers`
  ADD PRIMARY KEY (`employer_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `jobapplications`
--
ALTER TABLE `jobapplications`
  ADD PRIMARY KEY (`app_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`job_id`);

--
-- Indexes for table `jobseekers`
--
ALTER TABLE `jobseekers`
  ADD PRIMARY KEY (`jobSeeker_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `progress`
--
ALTER TABLE `progress`
  ADD PRIMARY KEY (`ProgressID`);

--
-- Indexes for table `resume`
--
ALTER TABLE `resume`
  ADD PRIMARY KEY (`resume_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`std_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `trainingprograms`
--
ALTER TABLE `trainingprograms`
  ADD PRIMARY KEY (`program_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications_for_courses_and_programs`
  MODIFY `app_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employers`
--
ALTER TABLE `employers`
  MODIFY `employer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `jobapplications`
--
ALTER TABLE `jobapplications`
  MODIFY `app_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobseekers`
--
ALTER TABLE `jobseekers` AUTO_INCREMENT = 1;

ALTER TABLE `jobseekers`
  MODIFY `jobSeeker_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `progress`
--
ALTER TABLE `progress`
  MODIFY `ProgressID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `resume`
--
ALTER TABLE `resume`
  MODIFY `resume_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `std_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `trainingprograms`
--
ALTER TABLE `trainingprograms`
  MODIFY `program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--

ALTER TABLE `users` AUTO_INCREMENT = 1;
-- COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
