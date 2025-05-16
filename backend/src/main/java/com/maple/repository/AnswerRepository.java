package com.maple.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.maple.entity.Answer;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * 答案数据访问层
 */
@Mapper
public interface AnswerRepository extends BaseMapper<Answer> {
    
    /**
     * 统计问卷回答人数
     * 
     * @param questionnaireId 问卷ID
     * @return 回答人数
     */
    @Select("SELECT COUNT(DISTINCT user_id) FROM t_answer WHERE questionnaire_id = #{questionnaireId}")
    int countResponsesByQuestionnaireId(@Param("questionnaireId") Long questionnaireId);
    
    /**
     * 获取问题的统计数据
     * 注意：由于答案内容已经改为JSON格式存储，此方法需要在业务层处理
     * 
     * @param questionId 问题ID
     * @return 统计数据
     */
    List<Map<String, Object>> getQuestionStats(@Param("questionId") Long questionId);
} 