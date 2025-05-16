-- ----------------------------
-- 创建数据库
-- ----------------------------
CREATE DATABASE IF NOT EXISTS `questionnaire` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE `questionnaire`;

-- ----------------------------
-- 微信用户表
-- ----------------------------
DROP TABLE IF EXISTS `t_wx_user`;
CREATE TABLE `t_wx_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `open_id` varchar(100) NOT NULL COMMENT '微信OpenID',
  `union_id` varchar(100) DEFAULT NULL COMMENT '微信UnionID',
  `nick_name` varchar(50) DEFAULT NULL COMMENT '微信昵称',
  `avatar_url` varchar(255) DEFAULT NULL COMMENT '头像URL',
  `gender` tinyint(1) DEFAULT '0' COMMENT '性别（0未知，1男，2女）',
  `country` varchar(50) DEFAULT NULL COMMENT '国家',
  `province` varchar(50) DEFAULT NULL COMMENT '省份',
  `city` varchar(50) DEFAULT NULL COMMENT '城市',
  `language` varchar(20) DEFAULT NULL COMMENT '语言',
  `phone_number` varchar(20) DEFAULT NULL COMMENT '手机号码',
  `session_key` varchar(255) DEFAULT NULL COMMENT '会话密钥',
  `last_login_ip` varchar(50) DEFAULT NULL COMMENT '最后登录IP',
  `last_login_time` datetime DEFAULT NULL COMMENT '最后登录时间',
  `status` char(1) DEFAULT '0' COMMENT '状态（0正常，1停用）',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_open_id` (`open_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COMMENT='微信用户表';

-- ----------------------------
-- 问卷表
-- ----------------------------
DROP TABLE IF EXISTS `t_questionnaire`;
CREATE TABLE `t_questionnaire` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `title` varchar(100) NOT NULL COMMENT '问卷标题',
  `description` varchar(500) DEFAULT NULL COMMENT '问卷描述',
  `start_time` datetime DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime DEFAULT NULL COMMENT '结束时间',
  `status` tinyint(1) DEFAULT '0' COMMENT '状态（0草稿，1已发布，2已结束）',
  `is_anonymous` tinyint(1) DEFAULT '0' COMMENT '是否匿名（0否，1是）',
  `cover_img` varchar(255) DEFAULT NULL COMMENT '封面图片URL',
  `background_music` varchar(255) DEFAULT NULL COMMENT '背景音乐URL',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT NULL COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COMMENT='问卷表';

-- ----------------------------
-- 问题表
-- ----------------------------
DROP TABLE IF EXISTS `t_question`;
CREATE TABLE `t_question` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `questionnaire_id` bigint(20) NOT NULL COMMENT '问卷ID',
  `type` tinyint(1) NOT NULL COMMENT '问题类型（1单选题，2多选题，3填空题，4评分题）',
  `content` varchar(500) NOT NULL COMMENT '问题内容',
  `hint` varchar(200) DEFAULT NULL COMMENT '问题提示',
  `sort_order` int(11) DEFAULT '0' COMMENT '排序号',
  `is_required` tinyint(1) DEFAULT '1' COMMENT '是否必答（0否，1是）',
  `max_score` int(11) DEFAULT NULL COMMENT '评分最大分值（针对评分题）',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT NULL COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  KEY `idx_questionnaire_id` (`questionnaire_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COMMENT='问题表';

-- ----------------------------
-- 答案表
-- ----------------------------
DROP TABLE IF EXISTS `t_answer`;
CREATE TABLE `t_answer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `questionnaire_id` bigint(20) NOT NULL COMMENT '问卷ID',
  `question_id` bigint(20) NOT NULL COMMENT '问题ID',
  `user_id` varchar(100) NOT NULL COMMENT '用户ID（微信openId或系统用户ID）',
  `user_type` tinyint(1) DEFAULT '0' COMMENT '用户类型（0匿名，1微信用户）',
  `content` text COMMENT '答案内容',
  `ip_address` varchar(50) DEFAULT NULL COMMENT 'IP地址',
  `device_info` varchar(255) DEFAULT NULL COMMENT '设备信息',
  `time_spent` int(11) DEFAULT NULL COMMENT '答题耗时（秒）',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_questionnaire_id` (`questionnaire_id`),
  KEY `idx_question_id` (`question_id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COMMENT='答案表'; 