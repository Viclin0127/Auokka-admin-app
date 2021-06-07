-- ﻿# Host: 148.66.131.51  (Version 5.7.32-log)
-- # Date: 2021-05-23 20:38:37
-- # Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "admin"
#
CREATE DATABASE Auokka;
USE Auokka;



DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

#
# Data for table "admin"
#


#
# Structure for table "channel"
#

DROP TABLE IF EXISTS `channel`;
CREATE TABLE `channel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

#
# Data for table "channel"
#


#
# Structure for table "course"
#

DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '0',
  `image` text,
  `description` text,
  `detail` text,
  `level` varchar(45) DEFAULT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;

#
# Data for table "course"
#

INSERT INTO `course` VALUES (1,'Get Started in Web Development',0,'webdev.jpg','WEB + PHP + Wordpress + Java, and everything basics about web.','[{\"title\":\"About This Course\",\"content\":\"Apps - you use them every day. But how do they work? And who actually builds them? The Australian app economy supports about 113,000 jobs all over the country – iOS developers, programmers, designers, coders. And they all speak one language: Swift. This short course provided by Auokka is an introductory taster to welcome you to the wonderful world of Swift, where you’ll be taught by some of the country’s leading iOS experts, and can structure your learning to suit your lifestyle. This course introduces you to the basics of the Swift programming language. You will use a playground environment to instantly see what your code does. As you start building apps, you will also use Xcode with its integrated development environment to help you solve errors and build interfaces for your apps. a By the end of this course, you will have a better understanding of the various iOS applications in industry and research.\",\"showOnSide\":true},{\"title\":\"Who will benefit from this course?\",\"content\":\"his course is suitable for anyone interested in iOS APP development.\",\"showOnSide\":true},{\"title\":\"Course Outcomes\",\"content\":\"Those completing this course should be able to: Understand the evolution of iOS app, market demand and career pathway Learn the fundamental knowledge of iOS development, and use Xcode and framework to develop iOS APP Obtain project experience via commercial system development with trainee and team Develop your demo APP\",\"showOnSide\":true},{\"title\":\"Techniques\",\"content\":\"his course will teach you all the technical skills necessary for the iOS Development process, not limited to: ObjectiveC Swift AFNetworking SQLite Cocoapods Xcode\",\"showOnSide\":true},{\"title\":\"Pre-requisites\",\"content\":\"In order to grasp the skills efficiently, there is some pre-requisite that the students must have, which is:Basic knowledge about HTML and CSS \",\"showOnSide\":true}]','Entry','2019-05-30 00:00:00','2019-05-30 00:00:00',1),(16,'Deep Learning',1,'20210504185703.jpg','A neural network deployed in the wid may be asked to marke prediction for inputs that were drrawn from a different distribution than that of the trainging data','[{\"title\":\"About This Course\",\"content\":\"Lecture 0: Introduction\\nLecture 1: Fundamentals of machine learning\\nLecture 2: Multi-layer perceptron\\nLecture 3: Automatic differentiation\\nLecture 4: Training neural networks\\nLecture 5: Convolutional neural networks\\nLecture 6: Computer vision\\nLecture 7: Recurrent neural networks\\nLecture 8: Attention and transformer networks\\nLecture 9: Generative models (Part 1)\\nLecture 10: Generative models (Part 2)\\nLecture 11: Uncertainty\\nLecture 12: Deep reinforcement learning\",\"showOnSide\":true},{\"title\":\"Course Outcome\",\"content\":\"1. Understand the foundations and the landscape of deep learning.\\n2. Be able to write from scratch, debug and run (some) deep learning\\nalgorithms.\\n3. Learn materials new from research.\\n4. Understand some of the open questions and challenges in the field\",\"showOnSide\":true}]','Advanced','2021-05-04 18:57:12','2021-05-04 18:57:12',0),(17,'CCNA ',1,'20210506131455.png','This course covers configuring network components such as switches, routers, and wireless LAN controllers; managing network devices; and identifying basic security threats. The syllabus also gives you a foundation in network programmability, automation, and software-defined networking.','[{\"title\":\"About This Course\",\"content\":\"Cisco certified network associate (CCNA) routing and switching is one of the most popular IT certification in the world. Cisco certifications are most accepted and recognized certifications globally. The CCNA certification course is developed by Cisco and is ideal for professionals who are part of digital transformation initiatives that help in business growth and new-age infrastructure. This 5-day Cisco Certified Network Associate (CCNA) certification course validates your knowledge and skills in the fundamentals of networking, IP connectivity, security, automation, and more.\",\"showOnSide\":true},{\"title\":\"Structure of Course\",\"content\":\"\",\"showOnSide\":true},{\"title\":\"1.Introduction to Networking\",\"content\":\"1.1.\\t Fundamentals of TCP/IP Networking\\n1.2.\\t Basic Network Components\\n1.3.\\t Foundational Understanding of Networking Technologies\\n1.4.\\t Review \",\"showOnSide\":true},{\"title\":\"2. Layer-2 Switching Implementation\",\"content\":\"2.1.\\t Fundamentals of Switching\\n2.2.\\t Basic CLI Configuration – Configuring Cisco Switches\\n2.3.\\t Concept of Virtual LANs\\n2.4.\\t Spanning Tree Protocols Variations\\n2.5.\\tTroubleshooting Switches\\n2.6.\\t Review\",\"showOnSide\":true},{\"title\":\"3.Layer-3 Addressing Foundation (IPv4)\",\"content\":\"3.1.\\t IPv4 Addressing Fundamentals\\n3.2.\\t IPv4 Addresses (Classful Addressing)\\n3.3.\\t IPv4 Addresses (Classless Addressing)\\n3.4.\\t Subnetting and Supernetting IPv4 Addresses\\n3.5.\\t Review\",\"showOnSide\":true},{\"title\":\"4.Understanding Routing Concepts\",\"content\":\"4.1.\\t Basic Configurations using Cisco Routers\\n4.2.\\t Static Routing\\n4.3.\\t Dynamic Routing \\n4.4.\\t Deep-Dive Dynamic Routing (OSPF)\\n4.5.\\t Troubleshooting Routers\\n4.6.\\t Configuring DHCP \\n4.7.\\t Review\",\"showOnSide\":true},{\"title\":\"5.Wireless LAN\",\"content\":\"5.1.\\t Introduction to WLANs\\n5.2.\\t Deep-Dive into Wireless Networks and Security\\n5.3.\\t Configuring a WLAN\\n5.4.\\t Troubleshooting Wireless Networks\\n5.5.\\t Review\",\"showOnSide\":true},{\"title\":\"6.Layer-3 Addressing Foundation (IPv6)\",\"content\":\"6.1.\\t Basics of IPv6 Addressing\\n6.2.\\t Routing using IPv6 Networks\\n6.3.\\t Configuring IPv6 topologies\\n6.4.\\t Review\",\"showOnSide\":true},{\"title\":\"7.Network Security \",\"content\":\"7.1.\\t Access Control Lists – Introduction\\n7.2.\\t Access Control Lists – Configuration and Troubleshooting\\n7.3.\\t Network Security at Switchport Level\\n7.4.\\t Miscellaneous Security Concepts\\n7.5.\\t Review\",\"showOnSide\":true},{\"title\":\"8.Network Address Translation\",\"content\":\"8.1.\\t Overview of NAT\\n8.2.\\t Static NAT – Foundation and Configuration\\n8.3.\\t Dynamic NAT – Foundation and Configuration\\n8.4.\\t Dynamic NAT Overload - Configuration\\n8.5.\\tReview\\n\",\"showOnSide\":true},{\"title\":\"9.Network Architecture and Services\",\"content\":\"9.1.\\t LAN Architecture – Deep Dive\\n9.2.\\t WAN Architecture – Deep Dive\\n9.3.\\t Understanding QoS\\n9.4.\\t Network Automation – Deep Dive\\n9.5.\\tReview\\n\",\"showOnSide\":true},{\"title\":\"10.Final Review\",\"content\":\"\",\"showOnSide\":true}]','Entry','2021-05-06 13:15:25','2021-05-06 17:06:19',0);

#
# Structure for table "promotion"
#

DROP TABLE IF EXISTS `promotion`;
CREATE TABLE `promotion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `code` varchar(45) DEFAULT NULL,
  `expired` datetime DEFAULT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

#
# Data for table "promotion"
#


#
# Structure for table "price"
#

DROP TABLE IF EXISTS `price`;
CREATE TABLE `price` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `scheduleId` int(11) DEFAULT NULL,
  `amount` decimal(10,0) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

#
# Structure for table "schedule"
#

DROP TABLE IF EXISTS `schedule`;
CREATE TABLE `schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `courseId` int(11) NOT NULL,
  `duration` varchar(45) DEFAULT NULL,
  `from` date DEFAULT NULL,
  `to` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `teacherId` int(11) DEFAULT NULL,
  `defaultPriceId` int(11) NOT NULL,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(4) NOT NULL DEFAULT '0',
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;


ALTER TABLE `price` ADD 
	(KEY `FK_PRICE_SCHEDULE_idx` (`scheduleId`),
    CONSTRAINT `FK_PRICE_SCHEDULE` FOREIGN KEY (`scheduleId`) REFERENCES `schedule` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);
#
# Data for table "price"
#

INSERT INTO `price` VALUES (1,NULL,1231,NULL,'2019-05-21 12:29:34','2019-06-03 09:41:00',1,0),(2,NULL,999,NULL,'2019-05-22 10:03:24','2019-05-22 10:03:24',1,0),(3,NULL,2985,NULL,'2019-05-22 10:05:55','2019-05-31 18:35:45',1,0),(4,NULL,1250,NULL,'2019-05-24 10:40:58','2019-05-24 10:40:58',1,0),(5,NULL,1999,NULL,'2019-05-30 13:47:53','2019-05-30 13:47:53',1,0),(6,NULL,798,NULL,'2019-05-30 17:52:13','2019-05-30 17:52:13',1,0),(8,NULL,1300,NULL,'2019-05-31 15:53:29','2019-05-31 15:53:29',1,0),(9,NULL,3000,NULL,'2019-05-31 16:01:05','2019-05-31 16:01:05',1,0),(10,NULL,3000,NULL,'2019-05-31 16:01:58','2019-05-31 16:01:58',1,0),(11,NULL,3000,NULL,'2019-05-31 16:03:21','2019-05-31 16:03:21',1,0),(12,NULL,3000,NULL,'2019-05-31 16:05:03','2019-05-31 16:05:03',1,0),(13,NULL,1233,NULL,'2019-05-31 16:09:55','2019-05-31 16:09:55',1,0),(14,NULL,2500,NULL,'2019-05-31 16:26:59','2019-05-31 18:06:42',1,0),(15,NULL,2000,NULL,'2019-05-31 16:39:25','2019-05-31 16:39:25',1,0),(16,NULL,1000,NULL,'2019-05-31 18:56:30','2019-05-31 18:56:30',1,0),(17,NULL,1,NULL,'2019-06-03 09:51:05','2019-06-03 09:51:05',1,0),(18,NULL,2,NULL,'2019-06-03 09:51:05','2019-06-03 09:51:05',1,0),(19,NULL,2,NULL,'2019-06-03 10:10:23','2019-06-03 10:10:23',1,0),(20,NULL,1,NULL,'2019-06-03 10:33:44','2019-06-03 10:33:44',1,0),(21,NULL,1500,NULL,'2021-05-04 18:57:12','2021-05-04 18:57:12',1,0),(22,NULL,2100,NULL,'2021-05-06 13:15:25','2021-05-06 16:04:17',1,0);


#
# Structure for table "enrollment"
#

DROP TABLE IF EXISTS `enrollment`;
CREATE TABLE `enrollment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) NOT NULL,
  `scheduleId` int(11) NOT NULL,
  `enrolFirstname` varchar(45) DEFAULT NULL,
  `enrolSurname` varchar(45) DEFAULT NULL,
  `enrolBirthDate` date DEFAULT NULL,
  `enrolEmail` varchar(255) DEFAULT NULL,
  `enrolPhone` varchar(45) DEFAULT NULL,
  `enrolSchool` varchar(100) DEFAULT NULL,
  `fee` decimal(10,0) DEFAULT '0',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `paid` tinyint(4) NOT NULL DEFAULT '0',
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_ENROL_STUDENT_idx` (`studentId`),
  KEY `FK_ENROL_SCHEDULE_idx` (`scheduleId`),
  CONSTRAINT `FK_ENROL_SCHEDULE` FOREIGN KEY (`scheduleId`) REFERENCES `schedule` (`id`),
  CONSTRAINT `FK_ENROL_STUDENT` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

#
# Data for table "enrollment"
#

INSERT INTO `enrollment` VALUES (15,27,21,'William','Li','1990-04-09','William.Li@vmor.com.au',NULL,'UNSW',1500,'2021-05-06 14:43:41','2021-05-06 14:43:41',1,1,0);

#
# Structure for table "student"
#

DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) DEFAULT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(45) DEFAULT NULL,
  `school` varchar(100) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `lastLogin` datetime DEFAULT NULL,
  `tokenExpiry` datetime DEFAULT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  `validated` tinyint(4) NOT NULL DEFAULT '0',
  `validationCode` varchar(255) DEFAULT NULL,
  `wechat` varchar(100) DEFAULT NULL,
  `signinCode` varchar(8) DEFAULT NULL,
  `signinCodeExpired` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `validationCode_UNIQUE` (`validationCode`),
  UNIQUE KEY `mobile_UNIQUE` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4;

#
# Data for table "student"
#

INSERT INTO `student` VALUES (1,'Siyang','Liang','1997-05-21','test@email.com','165465465','University of Sydney','lsy01','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',1,'2019-05-24 17:28:05','2019-05-24 17:28:05',NULL,'21f3df8fc64007dd8f1d8638fbb3b342775e2e20fa42980748c4be7a8e88bbc8',NULL,'2021-05-12 18:15:10',0,0,NULL,NULL,NULL,NULL),(2,'James','Lin','2019-05-05','test@email.net','129391282','UNSW','lsy02','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',1,'2019-05-24 17:42:22','2019-05-24 17:42:22',NULL,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(3,'Stacy','Binnion','2019-05-23','email@test.com','123123456','UTS','test01','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',1,'2019-05-24 17:44:04','2019-05-24 17:44:04',NULL,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL),(6,'Paul','Wingard','2019-08-08','test1@email.com','12312312','','zhang','14bbfb46cb710ab5cf477269d856fc79d4d5b31cfbe466a37a43b1537e0693a4',1,'2019-08-08 16:08:45','2019-08-08 16:08:45',NULL,'65091ce37babd8e1b5ea2a19dacdc90f9e506ab447eb2815c9cb19aa77d70b15',NULL,'2019-09-07 16:09:11',0,0,NULL,NULL,NULL,NULL),(26,'Siyang','Liang',NULL,'siyang.liang@vmor.com.au','+61420797890',NULL,'siyang.liang@vmor.com.au','932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef',1,'2019-08-22 10:24:48','2019-08-22 10:24:48',NULL,'e9e6b47f8efc0e7381ac2697bcc264cc60a352184b7abdc1ef178c757b620ee1',NULL,'2019-09-21 15:48:51',0,1,'f864dd90dc9fa1af0c3de8b0ce99c8fe2c10f2172d6137e537996bb3a87d33b8','',NULL,NULL),(27,'William','Li','1990-04-10','William.Li@vmor.com.au',NULL,'UNSW','William','6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090',1,'2021-05-06 14:43:02','2021-05-06 14:43:02',NULL,'45aebe26f175097a26f68c52c77ce31eb17b1b35058c4114c5cbe85db00c31b7',NULL,'2021-06-05 16:43:38',0,0,NULL,NULL,NULL,NULL),(28,'lin','yh',NULL,'vicclaire0505@gmail.com',NULL,NULL,'yh','7e071fd9b023ed8f18458a73613a0834f6220bd5cc50357ba3493c6040a9ea8c',1,'2021-05-19 17:01:54','2021-05-19 17:01:54',NULL,'f4ceb49a98189a5797374813c83dda929c45ae9639a3d47fbbd02199bbf939b4',NULL,'2021-06-18 17:03:48',0,0,NULL,NULL,NULL,NULL);

#
# Structure for table "article"
#

DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `authorId` int(11) DEFAULT NULL,
  `authorName` varchar(90) DEFAULT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `approved` int(11) NOT NULL DEFAULT '0',
  `show` tinyint(4) NOT NULL DEFAULT '0',
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  `title` varchar(100) NOT NULL,
  `file` varchar(255) DEFAULT NULL,
  `proposedTags` text,
  `rejectReason` text,
  PRIMARY KEY (`id`),
  KEY `FK_ARTICLE_STUDENT_idx` (`authorId`),
  CONSTRAINT `FK_ARTICLE_STUDENT` FOREIGN KEY (`authorId`) REFERENCES `student` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

#
# Data for table "article"
#

INSERT INTO `article` VALUES (12,26,'Liang Siyang','2019-08-22 15:49:20',-1,0,0,'test review','20190822154920.docx','[{\"id\":\"1\",\"name\":\"Computer science\"},{\"id\":\"Computer graphic\",\"name\":\"Computer graphic\"}]','test reason'),(13,26,'Liang Siyang','2019-08-22 15:50:15',0,0,0,'test review 2','20190822155015.docx','[{\"id\":\"6\",\"name\":\"design\"},{\"id\":\"farming\",\"name\":\"farming\"}]','the title does not reflects the content'),(14,26,'Liang Siyang','2019-08-22 15:50:55',1,0,0,'test review 3','20190822155055.docx','[{\"id\":\"2\",\"name\":\"Machine learning\"},{\"id\":\"test tag\",\"name\":\"test tag\"}]','the title does not reflect the content'),(15,26,'Liang Siyang','2019-08-28 13:56:43',0,0,0,'test2','20190828135643.docx','[{\"id\":\"1\",\"name\":\"Computer science\"}]',NULL);

#
# Structure for table "articletag"
#

DROP TABLE IF EXISTS `articletag`;
CREATE TABLE `articletag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `articleId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ARTICLEID_ARTAG_idx` (`articleId`),
  KEY `FK_TAGID_ARTAG_idx` (`tagId`),
  CONSTRAINT `FK_ARTICLEID_ARTAG` FOREIGN KEY (`articleId`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_TAGID_ARTAG` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

#
# Data for table "articletag"
#

INSERT INTO `articletag` VALUES (3,12,1),(4,12,3),(5,12,1),(6,12,3),(7,13,1),(8,13,5),(9,13,6),(11,14,2),(12,14,7);

#
# Structure for table "studentloginhistory"
#

DROP TABLE IF EXISTS `studentloginhistory`;
CREATE TABLE `studentloginhistory` (
  `time` datetime NOT NULL,
  `studentId` int(11) NOT NULL,
  `ip` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`time`,`studentId`),
  KEY `FK_TLH_STUDENT_idx` (`studentId`),
  CONSTRAINT `FK_SLH_STUDENT` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

#
# Data for table "studentloginhistory"
#


#
# Structure for table "tag"
#

DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  `tagId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `FK_TAG_TAG_idx` (`tagId`),
  CONSTRAINT `FK_TAG_TAG` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

#
# Data for table "tag"
#

INSERT INTO `tag` VALUES (1,'Computer science',0,NULL),(2,'Machine learning',0,NULL),(3,'Computer graphic',0,NULL),(4,'computer',0,NULL),(5,'farming',0,NULL),(6,'design',0,NULL),(7,'test tag',0,NULL);

#
# Structure for table "teacher"
#

DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(45) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `token` varchar(255) DEFAULT NULL,
  `lastLogin` datetime DEFAULT NULL,
  `tokenExpiry` datetime DEFAULT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

#
# Data for table "teacher"
#

INSERT INTO `teacher` VALUES (1,'Sherlock','Holmes','test@email.com',NULL,'lsy01','123','1.jpg','Software Engineer','test',1,'2019-05-22 16:50:08','2019-06-12 09:52:18',NULL,NULL,NULL,0),(2,'Jane','Doe','test2@email.com',NULL,'lsy02','123','2.jpg','Managing Consultant','test',1,'2019-05-22 16:52:36','2019-06-03 15:48:58',NULL,NULL,NULL,0),(3,'Charlize','Teron','test3@email.com',NULL,'lsy03','123','3.jpg','Product Designer','test',1,'2019-05-22 16:52:36','2019-06-03 16:18:55',NULL,NULL,NULL,0),(4,'Charlie','Puth','test4@email.com',NULL,'lsy04','123','4.jpg','Application Engineer','test',1,'2019-05-22 16:52:36','2019-06-03 15:49:07',NULL,NULL,NULL,0),(5,'Robert','Pattinson','test5@email.com',NULL,'lsy05','123','5.jpg','UX Researcher','test',1,'2019-05-22 16:52:36','2019-06-03 15:49:17',NULL,NULL,NULL,0),(6,'Sally','Hansen','test6@email.com',NULL,'lsy06','123','6.jpg','Web Developer','test',1,'2019-05-22 16:52:36','2019-06-03 15:51:15',NULL,NULL,NULL,0);


ALTER TABLE `Schedule` ADD (
	KEY `FK_SCHEDULE_COURSE_idx` (`courseId`),
	KEY `FK_SCHEDULE_TEACHER_idx` (`teacherId`),
	KEY `FK_SCHEDULE_PRICE_idx` (`defaultPriceId`),
	CONSTRAINT `FK_SCHEDULE_COURSE` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`),
	CONSTRAINT `FK_SCHEDULE_PRICE` FOREIGN KEY (`defaultPriceId`) REFERENCES `price` (`id`),
	CONSTRAINT `FK_SCHEDULE_TEACHER` FOREIGN KEY (`teacherId`) REFERENCES `teacher` (`id`) ON DELETE SET NULL
);
#
# Data for table "schedule"
#

INSERT INTO `schedule` VALUES (21,16,NULL,'2021-06-19','2021-07-29','Sydney',NULL,21,'2021-05-04 18:57:12','2021-05-04 18:57:12',1,0),(22,17,NULL,'2021-05-29','2021-06-19','Sydney',NULL,22,'2021-05-06 13:15:25','2021-05-06 16:04:17',1,0);



#
# Structure for table "teacherloginhistory"
#

DROP TABLE IF EXISTS `teacherloginhistory`;
CREATE TABLE `teacherloginhistory` (
  `time` datetime NOT NULL,
  `teacherId` int(11) NOT NULL,
  `ip` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`time`,`teacherId`),
  KEY `FK_TLH_TEACHER_idx` (`teacherId`),
  CONSTRAINT `FK_TLH_TEACHER` FOREIGN KEY (`teacherId`) REFERENCES `teacher` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

#
# Data for table "teacherloginhistory"
#

