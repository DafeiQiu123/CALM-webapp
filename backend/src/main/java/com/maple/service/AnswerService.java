package com.maple.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.maple.entity.Answer;

import java.util.List;
import java.util.Map;

/**
 * 答案服务接口
 */
public interface AnswerService {
    
    /**
     * 保存单个答案
     * 
     * @param answer 答案对象
     * @return 是否成功
     */
    boolean save(Answer answer);
    
    /**
     * 批量保存答案
     * 
     * @param answers 答案列表
     * @return 是否成功
     */
    boolean saveBatch(List<Answer> answers);
    
    /**
     * 根据ID获取答案详情
     * 
     * @param id 答案ID
     * @return 答案对象
     */
    Answer getAnswerById(Long id);
    
    /**
     * 根据条件查询答案列表
     * 
     * @param answer 查询条件
     * @return 答案列表
     */
    List<Answer> selectAnswerList(Answer answer);
    
    /**
     * 根据条件分页查询答案列表
     * 
     * @param page 页码
     * @param pageSize 每页记录数
     * @param answer 查询条件
     * @return 分页结果
     */
    IPage<Answer> selectAnswerPage(int page, int pageSize, Answer answer);
    
    /**
     * 统计问卷回答人数
     * 
     * @param questionnaireId 问卷ID
     * @return 回答人数
     */
    int countResponsesByQuestionnaireId(Long questionnaireId);
    
    /**
     * 获取问题的统计数据
     * 
     * @param questionId 问题ID
     * @return 统计数据
     */
    List<Map<String, Object>> getQuestionStats(Long questionId);
    
    /**
     * 根据ID删除答案
     * 
     * @param id 答案ID
     * @return 是否成功
     */
    boolean removeById(Long id);
} 