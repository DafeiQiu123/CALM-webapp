package com.maple.service;

import com.maple.entity.WxUser;

/**
 * 微信用户服务接口
 */
public interface WxUserService {
    
    /**
     * 根据OpenID查询用户
     * 
     * @param openId 微信OpenID
     * @return 用户信息
     */
    WxUser getByOpenId(String openId);
    
    /**
     * 保存用户
     * 
     * @param wxUser 用户信息
     * @return 是否成功
     */
    boolean saveUser(WxUser wxUser);
    
    /**
     * 更新用户
     * 
     * @param wxUser 用户信息
     * @return 是否成功
     */
    boolean updateUser(WxUser wxUser);
    
    /**
     * 保存登录信息
     * 
     * @param wxUser 用户信息
     * @param ip 登录IP
     * @return 是否成功
     */
    boolean saveLoginInfo(WxUser wxUser, String ip);
} 