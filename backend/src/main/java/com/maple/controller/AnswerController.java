package com.maple.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.maple.dto.AnswerContent;
import com.maple.dto.AnswerRequest;
import com.maple.entity.Answer;
import com.maple.service.AnswerService;
import com.maple.util.JsonUtil;
import com.maple.util.ResultUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 答案控制器
 */
@Slf4j
@Api(tags = "答案接口")
@RestController
@RequestMapping("/api/answer")
public class AnswerController {
    
    @Autowired
    private AnswerService answerService;
    
    /**
     * 提交答案
     * 
     * @param answerRequest 答案请求对象
     * @param request HTTP请求
     * @return 提交结果
     */
    @ApiOperation("提交答案")
    @PostMapping("/submit")
    public ResultUtil.Result<Void> submitAnswer(@RequestBody AnswerRequest answerRequest, HttpServletRequest request) {
        try {
            if (answerRequest == null || answerRequest.getAnswers() == null || answerRequest.getAnswers().isEmpty()) {
                return ResultUtil.error("答案数据不能为空");
            }
            
            // 创建答案对象
            Answer answer = new Answer();
            answer.setQuestionnaireId(answerRequest.getQuestionnaireId());
            answer.setUserId(answerRequest.getUserId());
            answer.setUserType(answerRequest.getUserType());
            answer.setTimeSpent(answerRequest.getTimeSpent());
            
            // 设置IP地址和创建时间
            answer.setIpAddress(getIpAddr(request));
            answer.setCreateTime(new Date());
            
            // 设置设备信息
            answer.setDeviceInfo(request.getHeader("User-Agent"));
            
            // 将答案列表转为JSON存储
            AnswerContent content = new AnswerContent();
            content.setAnswers(answerRequest.getAnswers());
            answer.setContent(JsonUtil.toJson(content));
            
            // 保存答案
            boolean result = answerService.save(answer);
            
            return result ? ResultUtil.success() : ResultUtil.error("提交失败");
        } catch (Exception e) {
            log.error("提交答案异常", e);
            return ResultUtil.error("提交答案异常: " + e.getMessage());
        }
    }
    
    /**
     * 获取答案详情
     * 
     * @param id 答案ID
     * @return 答案详情
     */
    @ApiOperation("获取答案详情")
    @GetMapping("/{id}")
    public ResultUtil.Result<Answer> getAnswerDetail(@PathVariable Long id) {
        try {
            if (id == null || id <= 0) {
                return ResultUtil.error("ID参数无效");
            }
            
            Answer answer = answerService.getAnswerById(id);
            if (answer == null) {
                return ResultUtil.error("未找到对应ID的答案");
            }
            
            return ResultUtil.success(answer);
        } catch (Exception e) {
            log.error("获取答案详情异常", e);
            return ResultUtil.error("获取答案详情异常: " + e.getMessage());
        }
    }
    
    /**
     * 获取答案列表
     * 
     * @param answer 查询条件
     * @return 答案列表
     */
    @ApiOperation("获取答案列表")
    @GetMapping("/list")
    public ResultUtil.Result<List<Answer>> getAnswerList(Answer answer) {
        try {
            List<Answer> list = answerService.selectAnswerList(answer);
            return ResultUtil.success(list);
        } catch (Exception e) {
            log.error("获取答案列表异常", e);
            return ResultUtil.error("获取答案列表异常: " + e.getMessage());
        }
    }
    
    /**
     * 分页获取答案列表
     * 
     * @param page 页码
     * @param pageSize 每页记录数
     * @param answer 查询条件
     * @return 分页结果
     */
    @ApiOperation("分页获取答案列表")
    @GetMapping("/page")
    public ResultUtil.Result<IPage<Answer>> getAnswerPage(
            @ApiParam(value = "页码", defaultValue = "1") @RequestParam(defaultValue = "1") int page,
            @ApiParam(value = "每页记录数", defaultValue = "10") @RequestParam(defaultValue = "10") int pageSize,
            Answer answer) {
        try {
            IPage<Answer> pageResult = answerService.selectAnswerPage(page, pageSize, answer);
            return ResultUtil.success(pageResult);
        } catch (Exception e) {
            log.error("分页获取答案列表异常", e);
            return ResultUtil.error("分页获取答案列表异常: " + e.getMessage());
        }
    }
    
    /**
     * 统计问卷回答人数
     * 
     * @param questionnaireId 问卷ID
     * @return 回答人数
     */
    @ApiOperation("统计问卷回答人数")
    @GetMapping("/count/{questionnaireId}")
    public ResultUtil.Result<Integer> countResponses(@PathVariable Long questionnaireId) {
        try {
            int count = answerService.countResponsesByQuestionnaireId(questionnaireId);
            return ResultUtil.success(count);
        } catch (Exception e) {
            log.error("统计问卷回答人数异常", e);
            return ResultUtil.error("统计问卷回答人数异常: " + e.getMessage());
        }
    }
    
    /**
     * 获取问题统计数据
     * 
     * @param questionId 问题ID
     * @return 统计数据
     */
    @ApiOperation("获取问题统计数据")
    @GetMapping("/stats/{questionId}")
    public ResultUtil.Result<List<Map<String, Object>>> getQuestionStats(@PathVariable Long questionId) {
        try {
            List<Map<String, Object>> stats = answerService.getQuestionStats(questionId);
            return ResultUtil.success(stats);
        } catch (Exception e) {
            log.error("获取问题统计数据异常", e);
            return ResultUtil.error("获取问题统计数据异常: " + e.getMessage());
        }
    }
    
    /**
     * 删除答案
     * 
     * @param id 答案ID
     * @return 删除结果
     */
    @ApiOperation("删除答案")
    @DeleteMapping("/{id}")
    public ResultUtil.Result<Boolean> deleteAnswer(@PathVariable Long id) {
        try {
            if (id == null || id <= 0) {
                return ResultUtil.error("ID参数无效");
            }
            
            boolean result = answerService.removeById(id);
            return result ? ResultUtil.success(true) : ResultUtil.error("删除失败，可能数据不存在");
        } catch (Exception e) {
            log.error("删除答案异常", e);
            return ResultUtil.error("删除答案异常: " + e.getMessage());
        }
    }
    
    /**
     * 删除答案（POST方法）
     * 
     * @param id 答案ID
     * @return 删除结果
     */
    @ApiOperation("删除答案（POST方法）")
    @PostMapping("/{id}")
    public ResultUtil.Result<Boolean> deleteAnswerByPost(@PathVariable Long id) {
        return deleteAnswer(id);
    }
    
    /**
     * 获取请求的真实IP地址
     */
    private String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
} 