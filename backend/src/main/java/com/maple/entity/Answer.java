package com.maple.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 答案实体类
 */
@Data
@TableName("t_answer")
public class Answer implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 问卷ID
     */
    private Long questionnaireId;
    
    /**
     * 问题ID
     */
    private Long questionId;

    /**
     * 用户ID（微信openId或系统用户ID）
     */
    private String userId;

    /**
     * 用户类型（0匿名，1微信用户）
     */
    private Integer userType;

    /**
     * 答案内容（JSON格式）
     */
    private String content;

    /**
     * IP地址
     */
    private String ipAddress;

    /**
     * 设备信息
     */
    private String deviceInfo;

    /**
     * 答题耗时（秒）
     */
    private Integer timeSpent;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;
} 