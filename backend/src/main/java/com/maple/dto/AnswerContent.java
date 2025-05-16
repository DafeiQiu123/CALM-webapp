package com.maple.dto;

import lombok.Data;

import java.util.List;

/**
 * 问卷答案内容
 */
@Data
public class AnswerContent {
    
    /**
     * 答案项列表
     */
    private List<AnswerItem> answers;
} 