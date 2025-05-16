package com.maple;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * 问卷调查系统启动类
 */
@SpringBootApplication
@EnableTransactionManagement
public class QuestionnaireApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuestionnaireApiApplication.class, args);
        System.out.println("启动成功！！！");
    }

}
