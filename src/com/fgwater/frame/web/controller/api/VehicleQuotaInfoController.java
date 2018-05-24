package com.fgwater.frame.web.controller.api;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.api.InsuranceInfo;
import com.fgwater.frame.model.api.VehicleQuotaInfo;
import com.fgwater.frame.service.api.InsuranceInfoService;
import com.fgwater.frame.service.api.VehicleQuotaInfoService;
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

public class VehicleQuotaInfoController extends BaseController {

	@Resource
	private VehicleQuotaInfoService vehicleQuotaInfoService;

	@Injection
	private VehicleQuotaInfo vehicleQuotaInfo;

	@Injection
	private List<VehicleQuotaInfo>  vehicleQuotaInfos;



    /**
     * 查询车辆编制基本信息
     * @return
     */

    @ResponseBody
    @RequestMapping(value = "queryVehicleQuotaInfo.do")
    public String query() {


        System.out.println(this.requestModel.getParams());
        this.responseModel.mount(this.vehicleQuotaInfoService.query(this.requestModel
                .getParams()), MOUNT_TYPE_PAGING);
        return this.responseModel.serial();
    }





    /**
     *保存或者更新车辆编制信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "saveVehicleQuotaInfo.do")
    public String save() {
        JSONObject jo = new JSONObject();
        jo.element("success", true);
        jo.element("label", this.vehicleQuotaInfoService.saveOrUpdate(this
                .getVehicleQuotaInfo()));
        return jo.toString();
    }



    /**
     * 删除车辆编制信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "deleteVehicleQuotaInfo.do")
    public String delete() {

        try {
            this.vehicleQuotaInfoService.delete(this.getVehicleQuotaInfos());
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

    public VehicleQuotaInfo getVehicleQuotaInfo() {
        return vehicleQuotaInfo;
    }

    public void setVehicleQuotaInfo(VehicleQuotaInfo vehicleQuotaInfo) {
        this.vehicleQuotaInfo = vehicleQuotaInfo;
    }

    public List<VehicleQuotaInfo> getVehicleQuotaInfos() {
        return vehicleQuotaInfos;
    }

    public void setVehicleQuotaInfos(List<VehicleQuotaInfo> vehicleQuotaInfos) {
        this.vehicleQuotaInfos = vehicleQuotaInfos;
    }
}
