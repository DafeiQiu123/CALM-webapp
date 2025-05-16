package com.maple.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * 跨域配置
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // 方法1：使用allowedOriginPatterns代替allowedOrigin
        config.addAllowedOriginPattern("*");
        
        // 方法2：或者明确列出允许的域名（根据您的前端地址配置）
        // config.addAllowedOrigin("http://localhost:3000");
        // config.addAllowedOrigin("http://localhost:8080");
        // config.addAllowedOrigin("http://您的实际域名");
        
        // 允许所有头信息访问
        config.addAllowedHeader("*");
        // 允许所有请求方法访问
        config.addAllowedMethod("*");
        // 允许发送Cookie
        config.setAllowCredentials(true);
        // 设置OPTIONS预检请求的有效期，单位为秒
        config.setMaxAge(3600L);
        
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
} 