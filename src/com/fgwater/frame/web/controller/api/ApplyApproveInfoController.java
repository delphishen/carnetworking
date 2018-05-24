package com.fgwater.frame.web.controller.api;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.api.ApplyApproveInfo;
import com.fgwater.frame.model.api.InsuranceInfo;
import com.fgwater.frame.service.api.ApplyApproveInfoService;
import com.fgwater.frame.service.api.InsuranceInfoService;
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

public class ApplyApproveInfoController extends BaseController {

	@Resource
	private ApplyApproveInfoService applyApproveInfoService;

	@Injection
	private ApplyApproveInfo applyApproveInfo;

	@Injection
	private List<ApplyApproveInfo>  applyApproveInfos;



    /**
     * 查询车辆申购审批信息
     * @return
     */

    @ResponseBody
    @RequestMapping(value = "queryApplyApproveInfo.do")
    public String query() {


        System.out.println(this.requestModel.getParams());
        this.responseModel.mount(this.applyApproveInfoService.query(this.requestModel
                .getParams()), MOUNT_TYPE_PAGING);
        return this.responseModel.serial();
    }





    /**
     *保存或者更新车辆申购审批信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "saveApplyApproveInfo.do")
    public String save() {
        JSONObject jo = new JSONObject();
        jo.element("success", true);
        jo.element("label", this.applyApproveInfoService.saveOrUpdate(this
                .getApplyApproveInfo()));
        return jo.toString();
    }



    /**
     * 删除车辆申购审批信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "deleteApplyApproveInfo.do")
    public String delete() {

        try {
            this.applyApproveInfoService.delete(this.getApplyApproveInfos());
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


    public ApplyApproveInfo getApplyApproveInfo() {
        return applyApproveInfo;
    }

    public void setApplyApproveInfo(ApplyApproveInfo applyApproveInfo) {
        this.applyApproveInfo = applyApproveInfo;
    }

    public List<ApplyApproveInfo> getApplyApproveInfos() {
        return applyApproveInfos;
    }

    public void setApplyApproveInfos(List<ApplyApproveInfo> applyApproveInfos) {
        this.applyApproveInfos = applyApproveInfos;
    }
}
