package com.maple.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.maple.entity.WxUser;
import com.maple.repository.WxUserRepository;
import com.maple.service.WxUserService;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * 微信用户服务实现类
 */
@Service
public class WxUserServiceImpl extends ServiceImpl<WxUserRepository, WxUser> implements WxUserService {
    
    /**
     * 根据OpenID查询用户
     * 
     * @param openId 微信OpenID
     * @return 用户信息
     */
    @Override
    public WxUser getByOpenId(String openId) {
        return baseMapper.findByOpenId(openId);
    }
    
    /**
     * 保存用户
     * 
     * @param wxUser 用户信息
     * @return 是否成功
     */
    @Override
    public boolean saveUser(WxUser wxUser) {
        wxUser.setCreateTime(new Date());
        return save(wxUser);
    }
    
    /**
     * 更新用户
     * 
     * @param wxUser 用户信息
     * @return 是否成功
     */
    @Override
    public boolean updateUser(WxUser wxUser) {
        wxUser.setUpdateTime(new Date());
        return updateById(wxUser);
    }
    
    /**
     * 保存登录信息
     * 
     * @param wxUser 用户信息
     * @param ip 登录IP
     * @return 是否成功
     */
    @Override
    public boolean saveLoginInfo(WxUser wxUser, String ip) {
        wxUser.setLastLoginIp(ip);
        wxUser.setLastLoginTime(new Date());
        wxUser.setUpdateTime(new Date());
        return updateById(wxUser);
    }
} 