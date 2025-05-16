package com.maple.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.maple.entity.User;
import com.maple.repository.UserRepository;
import com.maple.service.UserService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

/**
 * 用户服务实现类
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserRepository, User> implements UserService {
    
    /**
     * 用户登录
     * 
     * @param username 用户名
     * @param password 密码
     * @param ip 登录IP
     * @return 用户对象，登录失败返回null
     */
    @Override
    public User login(String username, String password, String ip) {
        User user = baseMapper.findByUsername(username);
        
        if (user != null && checkPassword(password, user.getPassword())) {
            // 更新登录信息
            baseMapper.updateLoginInfo(user.getId(), ip);
            
            // 不返回密码
            user.setPassword(null);
            return user;
        }
        
        return null;
    }
    
    /**
     * 根据ID获取用户信息
     * 
     * @param userId 用户ID
     * @return 用户对象
     */
    @Override
    public User getUserById(Long userId) {
        User user = getById(userId);
        if (user != null) {
            // 不返回密码
            user.setPassword(null);
        }
        return user;
    }
    
    /**
     * 更新用户信息
     * 
     * @param user 用户对象
     * @return 是否成功
     */
    @Override
    public boolean updateUser(User user) {
        // 如果密码不为空，则加密
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            user.setPassword(hashPassword(user.getPassword()));
        }
        return updateById(user);
    }
    
    /**
     * 检查密码是否正确
     * 
     * @param plainPassword 明文密码
     * @param hashedPassword 加密后的密码
     * @return 是否匹配
     */
    private boolean checkPassword(String plainPassword, String hashedPassword) {
        try {
            return BCrypt.checkpw(plainPassword, hashedPassword);
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * 对密码进行加密
     * 
     * @param password 明文密码
     * @return 加密后的密码
     */
    private String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }
} 