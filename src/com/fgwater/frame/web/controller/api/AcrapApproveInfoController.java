package com.fgwater.frame.web.controller.api;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.api.AcrapApproveInfo;
import com.fgwater.frame.model.api.ApplyApproveInfo;
import com.fgwater.frame.service.api.AcrapApproveInfoService;
import com.fgwater.frame.service.api.ApplyApproveInfoService;
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

public class AcrapApproveInfoController extends BaseController {

	@Resource
	private AcrapApproveInfoService acrapApproveInfoService;

	@Injection
	private AcrapApproveInfo acrapApproveInfo;

	@Injection
	private List<AcrapApproveInfo>  acrapApproveInfos;



    /**
     * 查询车辆报废审批信息
     * @return
     */

    @ResponseBody
    @RequestMapping(value = "queryAcrapApproveInfo.do")
    public String query() {


        System.out.println(this.requestModel.getParams());
        this.responseModel.mount(this.acrapApproveInfoService.query(this.requestModel
                .getParams()), MOUNT_TYPE_PAGING);
        return this.responseModel.serial();
    }





    /**
     *保存或者更新车辆报废审批信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "saveAcrapApproveInfo.do")
    public String save() {
        JSONObject jo = new JSONObject();
        jo.element("success", true);
        jo.element("label", this.acrapApproveInfoService.saveOrUpdate(this
                .getAcrapApproveInfo()));
        return jo.toString();
    }



    /**
     * 删除车辆报废审批信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "deleteAcrapApproveInfo.do")
    public String delete() {

        try {
            this.acrapApproveInfoService.delete(this.getAcrapApproveInfos());
        }catch (Exception e){
            System.out.println("----------异常报告----------"+e);
            JSONObject jo = new JSONObject();
            jo.put("success", false);
            jo.put("msg", "error");
            return  jo.toString();


        }
        return this.responseModel.serial();
    }


    public AcrapApproveInfo getAcrapApproveInfo() {
        return acrapApproveInfo;
    }

    public void setAcrapApproveInfo(AcrapApproveInfo acrapApproveInfo) {
        this.acrapApproveInfo = acrapApproveInfo;
    }

    public List<AcrapApproveInfo> getAcrapApproveInfos() {
        return acrapApproveInfos;
    }

    public void setAcrapApproveInfos(List<AcrapApproveInfo> acrapApproveInfos) {
        this.acrapApproveInfos = acrapApproveInfos;
    }
}
