DROP TABLE IF EXISTS `answer`;
CREATE TABLE `answer` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `answer` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `homework`;
CREATE TABLE `homework` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `channel_id` int(15) NOT NULL,
  `message_id` int(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `homework` WRITE;
UNLOCK TABLES;