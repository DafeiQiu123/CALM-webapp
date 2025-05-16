package com.maple.exception;

import com.maple.util.ResultUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常处理器
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    /**
     * 处理所有未捕获的异常
     */
    @ExceptionHandler(Exception.class)
    public ResultUtil.Result<Void> handleException(Exception e) {
        log.error("系统异常", e);
        return ResultUtil.error("系统异常，请稍后重试");
    }
    
    /**
     * 处理运行时异常
     */
    @ExceptionHandler(RuntimeException.class)
    public ResultUtil.Result<Void> handleRuntimeException(RuntimeException e) {
        log.error("运行时异常", e);
        return ResultUtil.error("运行时异常，请稍后重试");
    }
} 