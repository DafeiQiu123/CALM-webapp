package com.maple.controller;

import com.maple.dto.LoginRequest;
import com.maple.dto.LoginResponse;
import com.maple.entity.User;
import com.maple.service.UserService;
import com.maple.util.JwtUtil;
import com.maple.util.ResultUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * 认证控制器
 */
@Slf4j
@Api(tags = "认证接口")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    /**
     * 用户登录
     * 
     * @param loginRequest 登录请求
     * @param request HTTP请求
     * @return 登录结果
     */
    @ApiOperation("用户登录")
    @PostMapping("/login")
    public ResultUtil.Result<LoginResponse> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        try {
            // 参数校验
            if (loginRequest == null) {
                return ResultUtil.error("登录参数不能为空");
            }
            
            String username = loginRequest.getUsername();
            String password = loginRequest.getPassword();
            
            if (!StringUtils.hasText(username) || !StringUtils.hasText(password)) {
                return ResultUtil.error("用户名和密码不能为空");
            }
            
            // 获取登录IP
            String ip = getIpAddr(request);
            
            // 调用登录服务
            User user = userService.login(username, password, ip);
            if (user != null) {
                // 生成令牌
                String token = jwtUtil.generateToken(user.getId(), user.getUsername());
                
                // 构建登录响应
                LoginResponse loginResponse = new LoginResponse(
                        user.getId(),
                        user.getUsername(),
                        user.getNickName(),
                        token,
                        user.getAvatar()
                );
                
                return ResultUtil.success(loginResponse);
            } else {
                return ResultUtil.error("用户名或密码错误");
            }
        } catch (Exception e) {
            log.error("用户登录异常", e);
            return ResultUtil.error("用户登录异常: " + e.getMessage());
        }
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