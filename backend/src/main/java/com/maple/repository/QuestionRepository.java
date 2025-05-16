package com.maple.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.maple.entity.Question;
import org.apache.ibatis.annotations.Mapper;

/**
 * 问题数据访问层
 */
@Mapper
public interface QuestionRepository extends BaseMapper<Question> {
} 