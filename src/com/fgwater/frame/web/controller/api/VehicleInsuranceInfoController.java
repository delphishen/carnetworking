package com.fgwater.frame.web.controller.api;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.api.AcrapApproveInfo;
import com.fgwater.frame.model.api.VehicleInsuranceInfo;
import com.fgwater.frame.service.api.AcrapApproveInfoService;
import com.fgwater.frame.service.api.VehicleInsuranceInfoService;
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

public class VehicleInsuranceInfoController extends BaseController {

	@Resource
	private VehicleInsuranceInfoService vehicleInsuranceInfoService;

	@Injection
	private VehicleInsuranceInfo vehicleInsuranceInfo;

	@Injection
	private List<VehicleInsuranceInfo>  vehicleInsuranceInfos;



    /**
     * 查询车辆保险信息
     * @return
     */

    @ResponseBody
    @RequestMapping(value = "queryVehicleInsuranceInfo.do")
    public String query() {


        System.out.println(this.requestModel.getParams());
        this.responseModel.mount(this.vehicleInsuranceInfoService.query(this.requestModel
                .getParams()), MOUNT_TYPE_PAGING);
        return this.responseModel.serial();
    }





    /**
     *保存或者更新车辆保险信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "saveVehicleInsuranceInfo.do")
    public String save() {
        JSONObject jo = new JSONObject();
        jo.element("success", true);
        jo.element("label", this.vehicleInsuranceInfoService.saveOrUpdate(this
                .getVehicleInsuranceInfo()));
        return jo.toString();
    }



    /**
     * 删除车辆保险信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "deleteVehicleInsuranceInfo.do")
    public String delete() {

        try {
            this.vehicleInsuranceInfoService.delete(this.getVehicleInsuranceInfos());
        }catch (Exception e){
            System.out.println("----------异常报告----------"+e);
            JSONObject jo = new JSONObject();
            jo.put("success", false);
            jo.put("msg", "error");
            return  jo.toString();


        }
        return this.responseModel.serial();
    }


    public VehicleInsuranceInfo getVehicleInsuranceInfo() {
        return vehicleInsuranceInfo;
    }

    public void setVehicleInsuranceInfo(VehicleInsuranceInfo vehicleInsuranceInfo) {
        this.vehicleInsuranceInfo = vehicleInsuranceInfo;
    }

    public List<VehicleInsuranceInfo> getVehicleInsuranceInfos() {
        return vehicleInsuranceInfos;
    }

    public void setVehicleInsuranceInfos(List<VehicleInsuranceInfo> vehicleInsuranceInfos) {
        this.vehicleInsuranceInfos = vehicleInsuranceInfos;
    }
}
