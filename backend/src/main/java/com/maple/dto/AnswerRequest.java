package com.maple.dto;

import lombok.Data;

import java.util.List;

/**
 * 提交答案请求
 */
@Data
public class AnswerRequest {
    
    /**
     * 问卷ID
     */
    private Long questionnaireId;
    
    /**
     * 问题ID
     */
    private Long questionId;
    
    /**
     * 用户ID
     */
    private String userId;
    
    /**
     * 用户类型（0匿名，1微信用户）
     */
    private Integer userType;
    
    /**
     * 答案内容
     */
    private String content;
    
    /**
     * 答案项列表（旧版API使用）
     */
    private List<AnswerItem> answers;
    
    /**
     * 答题耗时（秒）
     */
    private Integer timeSpent;
} 