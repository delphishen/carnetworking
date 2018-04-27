package com.fgwater.frame.web.controller.app;


import com.fgwater.core.web.controller.BaseController;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author chendp
 * @date 2018/4/15 22:49
 */

@Controller
@Scope("request")
@RequestMapping(value = "/app", produces = "text/plain;charset=UTF-8;")
public class AppController extends BaseController {

    @ResponseBody
    @RequestMapping(value = "/getApp.do")
    public String app(){
        return "hello";
    }


}
