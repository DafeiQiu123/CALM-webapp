package com.maple.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.maple.dto.AnswerContent;
import com.maple.dto.AnswerItem;
import com.maple.entity.Answer;
import com.maple.repository.AnswerRepository;
import com.maple.service.AnswerService;
import com.maple.util.JsonUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * 答案服务实现类
 */
@Service
public class AnswerServiceImpl extends ServiceImpl<AnswerRepository, Answer> implements AnswerService {
    
    /**
     * 保存单个答案
     * 
     * @param answer 答案对象
     * @return 是否成功
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean save(Answer answer) {
        if (answer == null) {
            return false;
        }
        
        if (answer.getCreateTime() == null) {
            answer.setCreateTime(new Date());
        }
        
        return super.save(answer);
    }
    
    /**
     * 批量保存答案
     * 
     * @param answers 答案列表
     * @return 是否成功
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean saveBatch(List<Answer> answers) {
        if (answers == null || answers.isEmpty()) {
            return false;
        }
        
        Date now = new Date();
        for (Answer answer : answers) {
            if (answer.getCreateTime() == null) {
                answer.setCreateTime(now);
            }
        }
        
        return super.saveBatch(answers);
    }
    
    /**
     * 根据条件查询答案列表
     * 
     * @param answer 查询条件
     * @return 答案列表
     */
    @Override
    public List<Answer> selectAnswerList(Answer answer) {
        LambdaQueryWrapper<Answer> queryWrapper = new LambdaQueryWrapper<>();
        
        if (answer.getQuestionnaireId() != null) {
            queryWrapper.eq(Answer::getQuestionnaireId, answer.getQuestionnaireId());
        }
        
        if (answer.getUserId() != null && !answer.getUserId().isEmpty()) {
            queryWrapper.eq(Answer::getUserId, answer.getUserId());
        }
        
        queryWrapper.orderByDesc(Answer::getCreateTime);
        return list(queryWrapper);
    }
    
    /**
     * 根据条件分页查询答案列表
     * 
     * @param page 页码
     * @param pageSize 每页记录数
     * @param answer 查询条件
     * @return 分页结果
     */
    @Override
    public IPage<Answer> selectAnswerPage(int page, int pageSize, Answer answer) {
        // 创建分页对象
        Page<Answer> pageable = new Page<>(page, pageSize);
        
        // 构建查询条件
        LambdaQueryWrapper<Answer> queryWrapper = new LambdaQueryWrapper<>();
        
        if (answer.getQuestionnaireId() != null) {
            queryWrapper.eq(Answer::getQuestionnaireId, answer.getQuestionnaireId());
        }
        
        if (answer.getUserId() != null && !answer.getUserId().isEmpty()) {
            queryWrapper.eq(Answer::getUserId, answer.getUserId());
        }
        
        queryWrapper.orderByDesc(Answer::getCreateTime);
        
        // 执行分页查询
        return page(pageable, queryWrapper);
    }
    
    /**
     * 统计问卷回答人数
     * 
     * @param questionnaireId 问卷ID
     * @return 回答人数
     */
    @Override
    public int countResponsesByQuestionnaireId(Long questionnaireId) {
        return baseMapper.countResponsesByQuestionnaireId(questionnaireId);
    }
    
    /**
     * 获取问题的统计数据
     * 处理JSON格式的答案内容
     * 
     * @param questionId 问题ID
     * @return 统计数据
     */
    @Override
    public List<Map<String, Object>> getQuestionStats(Long questionId) {
        if (questionId == null) {
            return Collections.emptyList();
        }
        
        // 获取所有答卷
        LambdaQueryWrapper<Answer> queryWrapper = new LambdaQueryWrapper<>();
        List<Answer> answers = list(queryWrapper);
        
        // 从JSON中提取指定问题的答案
        Map<String, Integer> contentCountMap = new HashMap<>();
        
        for (Answer answer : answers) {
            String content = answer.getContent();
            if (content == null || content.isEmpty()) {
                continue;
            }
            
            // 解析JSON
            AnswerContent answerContent = JsonUtil.fromJson(content, AnswerContent.class);
            if (answerContent == null || answerContent.getAnswers() == null) {
                continue;
            }
            
            // 查找指定问题的答案
            for (AnswerItem item : answerContent.getAnswers()) {
                if (questionId.equals(item.getQuestionId())) {
                    String answerText = item.getContent();
                    contentCountMap.put(answerText, contentCountMap.getOrDefault(answerText, 0) + 1);
                    break;  // 找到后就可以跳出内层循环
                }
            }
        }
        
        // 转换为统计结果
        return contentCountMap.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> stat = new HashMap<>(2);
                    stat.put("content", entry.getKey());
                    stat.put("count", entry.getValue());
                    return stat;
                })
                .collect(Collectors.toList());
    }

    /**
     * 根据ID获取答案详情
     * 
     * @param id 答案ID
     * @return 答案对象
     */
    @Override
    public Answer getAnswerById(Long id) {
        if (id == null) {
            return null;
        }
        return baseMapper.selectById(id);
    }
    
    /**
     * 根据ID删除答案
     * 
     * @param id 答案ID
     * @return 是否成功
     */
    @Override
    public boolean removeById(Long id) {
        if (id == null) {
            return false;
        }
        return super.removeById(id);
    }
} 