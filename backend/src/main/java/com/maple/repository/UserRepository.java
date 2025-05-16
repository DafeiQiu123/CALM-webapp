package com.maple.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.maple.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

/**
 * 用户数据访问层
 */
@Mapper
public interface UserRepository extends BaseMapper<User> {
    
    /**
     * 根据用户名查询用户
     * 
     * @param username 用户名
     * @return 用户对象
     */
    @Select("SELECT * FROM t_user WHERE username = #{username} AND status = '0'")
    User findByUsername(@Param("username") String username);
    
    /**
     * 更新用户登录信息
     * 
     * @param userId 用户ID
     * @param ip 登录IP
     * @return 影响行数
     */
    @Update("UPDATE t_user SET login_ip = #{ip}, login_time = NOW() WHERE id = #{userId}")
    int updateLoginInfo(@Param("userId") Long userId, @Param("ip") String ip);
} 