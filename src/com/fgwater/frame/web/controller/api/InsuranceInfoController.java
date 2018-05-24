package com.fgwater.frame.web.controller.api;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.api.InsuranceInfo;
import com.fgwater.frame.model.api.MaintenanceInfo;
import com.fgwater.frame.service.api.InsuranceInfoService;
import com.fgwater.frame.service.api.MaintenanceInfoService;
import net.sf.json.JSONObject;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@Scope("request")
@RequestMapping(value = "/api", produces = "text/plain;charset=UTF-8;")

/* 
添加注解 @Controller 将其标识为控制器，这里仅仅是一个普通的Java类，
通过简单的注解，就可以将其解析为Servlet类来响应用户的请求
*/

public class InsuranceInfoController extends BaseController {

	@Resource
	private InsuranceInfoService insuranceInfoService;

	@Injection
	private InsuranceInfo insuranceInfo;

	@Injection
	private List<InsuranceInfo>  insuranceInfos;



    /**
     * 查询保险公司基本信息
     * @return
     */

    @ResponseBody
    @RequestMapping(value = "queryInsuranceInfo.do")
    public String query() {


        System.out.println(this.requestModel.getParams());
        this.responseModel.mount(this.insuranceInfoService.query(this.requestModel
                .getParams()), MOUNT_TYPE_PAGING);
        return this.responseModel.serial();
    }





    /**
     *保存或者更新保险公司信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "saveInsuranceInfo.do")
    public String save() {
        JSONObject jo = new JSONObject();
        jo.element("success", true);
        jo.element("label", this.insuranceInfoService.saveOrUpdate(this
                .getInsuranceInfo()));
        return jo.toString();
    }



    /**
     * 删除保险公司信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "deleteInsuranceInfo.do")
    public String delete() {

        try {
            this.insuranceInfoService.delete(this.getInsuranceInfos());
        }catch (Exception e){
            System.out.println("----------异常报告----------"+e);
            JSONObject jo = new JSONObject();
            jo.put("success", false);
            jo.put("msg", "error");
            return  jo.toString();


        }
        //this.employeeService.delete(this.getEmployees());
        return this.responseModel.serial();
    }


    public InsuranceInfo getInsuranceInfo() {
        return insuranceInfo;
    }

    public void setInsuranceInfo(InsuranceInfo insuranceInfo) {
        this.insuranceInfo = insuranceInfo;
    }

    public List<InsuranceInfo> getInsuranceInfos() {
        return insuranceInfos;
    }

    public void setInsuranceInfos(List<InsuranceInfo> insuranceInfos) {
        this.insuranceInfos = insuranceInfos;
    }
}
