package com.maple.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.maple.entity.WxUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * 微信用户数据访问层
 */
@Mapper
public interface WxUserRepository extends BaseMapper<WxUser> {
    
    /**
     * 根据OpenID查询用户
     * 
     * @param openId 微信OpenID
     * @return 用户信息
     */
    @Select("SELECT * FROM t_wx_user WHERE open_id = #{openId} LIMIT 1")
    WxUser findByOpenId(@Param("openId") String openId);
} 