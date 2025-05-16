package com.maple.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.maple.entity.Questionnaire;
import org.apache.ibatis.annotations.Mapper;

/**
 * 问卷数据访问层
 */
@Mapper
public interface QuestionnaireRepository extends BaseMapper<Questionnaire> {
} 