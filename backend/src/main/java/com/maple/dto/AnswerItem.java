package com.maple.dto;

import lombok.Data;

/**
 * 单个问题的答案项
 */
@Data
public class AnswerItem {
    
    /**
     * 问题ID
     */
    private Long questionId;
    
    /**
     * 答案内容
     */
    private String content;
} 