package com.maple.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.maple.entity.WxUser;
import com.maple.service.WxUserService;
import com.maple.util.JwtUtil;
import com.maple.util.ResultUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 微信认证控制器
 */
@Slf4j
@Api(tags = "微信认证接口")
@RestController
@RequestMapping("/api/wx")
public class WxAuthController {
    
    @Autowired
    private WxUserService wxUserService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Value("${wx.appid}")
    private String appid;
    
    @Value("${wx.secret}")
    private String secret;
    
    /**
     * 微信登录
     * 
     * @param params 登录参数
     * @param request HTTP请求
     * @return 登录结果
     */
    @ApiOperation("微信登录")
    @PostMapping("/login")
    public ResultUtil.Result<Map<String, Object>> login(@RequestBody Map<String, String> params, HttpServletRequest request) {
        try {
            String code = params.get("code");
            if (code == null || code.isEmpty()) {
                return ResultUtil.error("微信code不能为空");
            }
            
            log.info("微信登录，code: {}", code);
            
            // 获取微信openId和session_key
            String url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid +
                    "&secret=" + secret + "&js_code=" + code + "&grant_type=authorization_code";
            
            // 创建并配置RestTemplate
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.getMessageConverters().add(new StringHttpMessageConverter(StandardCharsets.UTF_8));
            restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
            
            // 调用微信API
            String responseStr = restTemplate.getForObject(url, String.class);
            log.info("微信返回结果: {}", responseStr);
            
            // 解析微信返回的JSON数据
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> response = mapper.readValue(responseStr, Map.class);
            
            // 检查是否有错误
            if (response.containsKey("errcode") && !response.get("errcode").equals(0)) {
                String errMsg = (String) response.getOrDefault("errmsg", "未知错误");
                log.error("微信登录失败: {}", errMsg);
                return ResultUtil.error("微信登录失败: " + errMsg);
            }
            
            // 获取openid和session_key
            String openId = (String) response.get("openid");
            String sessionKey = (String) response.get("session_key");
            
            if (openId == null || openId.isEmpty()) {
                return ResultUtil.error("获取微信openid失败");
            }
            
            // 查询用户
            WxUser wxUser = wxUserService.getByOpenId(openId);
            
            // 用户不存在则创建
            if (wxUser == null) {
                wxUser = new WxUser();
                wxUser.setOpenId(openId);
                wxUser.setSessionKey(sessionKey);
                wxUser.setStatus("0"); // 正常状态
                wxUser.setCreateTime(new Date());
                wxUserService.saveUser(wxUser);
            } else {
                // 更新session_key
                wxUser.setSessionKey(sessionKey);
                wxUserService.updateUser(wxUser);
            }
            
            // 保存登录信息
            String ip = getIpAddr(request);
            wxUserService.saveLoginInfo(wxUser, ip);
            
            // 生成token
            String token = jwtUtil.generateToken(wxUser);
            
            Map<String, Object> result = new HashMap<>();
            result.put("token", token);
            result.put("openid", openId);
            result.put("userId", wxUser.getId());
            
            return ResultUtil.success("登录成功", result);
        } catch (Exception e) {
            log.error("微信登录异常", e);
            return ResultUtil.error("微信登录异常: " + e.getMessage());
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