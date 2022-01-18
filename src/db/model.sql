DROP TABLE IF EXISTS `admins`;

CREATE TABLE `admins` (
  `id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `admins` WRITE;


UNLOCK TABLES;

DROP TABLE IF EXISTS `answers`;


CREATE TABLE `answers` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `from_id` int(50) NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `homework_id` int(50) NOT NULL,
  `photo_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `replaced_message_id` int(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



LOCK TABLES `answers` WRITE;


UNLOCK TABLES;


DROP TABLE IF EXISTS `groups`;


CREATE TABLE `groups` (
  `share_point` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discussion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `admin_channel` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `groups` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `homeworks`;
CREATE TABLE `homeworks` (
  `channel_id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message_id` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


LOCK TABLES `homeworks` WRITE;
UNLOCK TABLES;
