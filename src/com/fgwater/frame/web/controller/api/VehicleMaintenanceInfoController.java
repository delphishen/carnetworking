package com.fgwater.frame.web.controller.api;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.api.AcrapApproveInfo;
import com.fgwater.frame.model.api.VehicleMaintenanceInfo;
import com.fgwater.frame.service.api.AcrapApproveInfoService;
import com.fgwater.frame.service.api.VehicleMaintenanceInfoService;
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

public class VehicleMaintenanceInfoController extends BaseController {

	@Resource
	private VehicleMaintenanceInfoService vehicleMaintenanceInfoService;

	@Injection
	private VehicleMaintenanceInfo vehicleMaintenanceInfo;

	@Injection
	private List<VehicleMaintenanceInfo> vehicleMaintenanceInfos;



    /**
     * 查询车辆维修记录审批信息
     * @return
     */

    @ResponseBody
    @RequestMapping(value = "queryVehicleMaintenanceInfo.do")
    public String query() {


        System.out.println(this.requestModel.getParams());
        this.responseModel.mount(this.vehicleMaintenanceInfoService.query(this.requestModel
                .getParams()), MOUNT_TYPE_PAGING);
        return this.responseModel.serial();
    }





    /**
     *保存或者更新车辆维修记录审批信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "saveVehicleMaintenanceInfo.do")
    public String save() {
        JSONObject jo = new JSONObject();
        jo.element("success", true);
        jo.element("label", this.vehicleMaintenanceInfoService.saveOrUpdate(this
                .getVehicleMaintenanceInfo()));
        return jo.toString();
    }



    /**
     * 删除车辆维修记录审批信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "deleteVehicleMaintenanceInfo.do")
    public String delete() {

        try {
            this.vehicleMaintenanceInfoService.delete(this.getVehicleMaintenanceInfos());
        }catch (Exception e){
            System.out.println("----------异常报告----------"+e);
            JSONObject jo = new JSONObject();
            jo.put("success", false);
            jo.put("msg", "error");
            return  jo.toString();


        }
        return this.responseModel.serial();
    }


    public VehicleMaintenanceInfo getVehicleMaintenanceInfo() {
        return vehicleMaintenanceInfo;
    }

    public void setVehicleMaintenanceInfo(VehicleMaintenanceInfo vehicleMaintenanceInfo) {
        this.vehicleMaintenanceInfo = vehicleMaintenanceInfo;
    }

    public List<VehicleMaintenanceInfo> getVehicleMaintenanceInfos() {
        return vehicleMaintenanceInfos;
    }

    public void setVehicleMaintenanceInfos(List<VehicleMaintenanceInfo> vehicleMaintenanceInfos) {
        this.vehicleMaintenanceInfos = vehicleMaintenanceInfos;
    }
}
