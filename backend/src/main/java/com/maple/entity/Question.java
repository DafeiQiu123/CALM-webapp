package com.maple.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 问题实体类
 */
@Data
@TableName("t_question")
public class Question implements Serializable {
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
     * 问题类型（1单选题，2多选题，3填空题，4评分题）
     */
    private Integer type;

    /**
     * 问题内容
     */
    private String content;

    /**
     * 问题提示
     */
    private String hint;

    /**
     * 排序号
     */
    private Integer sortOrder;

    /**
     * 是否必答（0否，1是）
     */
    private Integer isRequired;

    /**
     * 评分最大分值（针对评分题）
     */
    private Integer maxScore;

    /**
     * 创建者
     */
    private String createBy;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新者
     */
    private String updateBy;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 备注
     */
    private String remark;
} 