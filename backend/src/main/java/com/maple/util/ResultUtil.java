package com.maple.util;

import lombok.Data;

import java.io.Serializable;

/**
 * 统一返回结果工具类
 */
public class ResultUtil {
    
    /**
     * 返回成功结果
     * 
     * @param <T> 泛型
     * @return 成功结果
     */
    public static <T> Result<T> success() {
        return new Result<>(0, "操作成功", null);
    }
    
    /**
     * 返回成功结果
     * 
     * @param data 数据
     * @param <T> 泛型
     * @return 成功结果
     */
    public static <T> Result<T> success(T data) {
        return new Result<>(0, "操作成功", data);
    }
    
    /**
     * 返回成功结果
     * 
     * @param msg 消息
     * @param data 数据
     * @param <T> 泛型
     * @return 成功结果
     */
    public static <T> Result<T> success(String msg, T data) {
        return new Result<>(0, msg, data);
    }
    
    /**
     * 返回错误结果
     * 
     * @param <T> 泛型
     * @return 错误结果
     */
    public static <T> Result<T> error() {
        return new Result<>(500, "操作失败", null);
    }
    
    /**
     * 返回错误结果
     * 
     * @param msg 消息
     * @param <T> 泛型
     * @return 错误结果
     */
    public static <T> Result<T> error(String msg) {
        return new Result<>(500, msg, null);
    }
    
    /**
     * 返回错误结果
     * 
     * @param code 错误码
     * @param msg 消息
     * @param <T> 泛型
     * @return 错误结果
     */
    public static <T> Result<T> error(int code, String msg) {
        return new Result<>(code, msg, null);
    }
    
    /**
     * 返回结果类
     * 
     * @param <T> 泛型
     */
    @Data
    public static class Result<T> implements Serializable {
        private static final long serialVersionUID = 1L;
        
        /**
         * 状态码
         */
        private int code;
        
        /**
         * 消息
         */
        private String msg;
        
        /**
         * 数据
         */
        private T data;
        
        public Result(int code, String msg, T data) {
            this.code = code;
            this.msg = msg;
            this.data = data;
        }
    }
} 