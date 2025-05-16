package com.maple.service;

import com.maple.entity.User;

/**
 * 用户服务接口
 */
public interface UserService {
    
    /**
     * 用户登录
     * 
     * @param username 用户名
     * @param password 密码
     * @param ip 登录IP
     * @return 用户对象，登录失败返回null
     */
    User login(String username, String password, String ip);
    
    /**
     * 根据ID获取用户信息
     * 
     * @param userId 用户ID
     * @return 用户对象
     */
    User getUserById(Long userId);
    
    /**
     * 更新用户信息
     * 
     * @param user 用户对象
     * @return 是否成功
     */
    boolean updateUser(User user);
} 