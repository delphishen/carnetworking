package com.fgwater.frame.web.controller.api;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.api.VehicleInsuranceInfo;
import com.fgwater.frame.model.api.VehicleSupportInfo;
import com.fgwater.frame.service.api.VehicleInsuranceInfoService;
import com.fgwater.frame.service.api.VehicleSupportInfoService;
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

public class VehicleSupportInfoController extends BaseController {

	@Resource
	private VehicleSupportInfoService vehicleSupportInfoService;

	@Injection
	private VehicleSupportInfo vehicleSupportInfo;

	@Injection
	private List<VehicleSupportInfo>  vehicleSupportInfos;



    /**
     * 查询实物用车保障信息
     * @return
     */

    @ResponseBody
    @RequestMapping(value = "queryVehicleSupportInfo.do")
    public String query() {


        System.out.println(this.requestModel.getParams());
        this.responseModel.mount(this.vehicleSupportInfoService.query(this.requestModel
                .getParams()), MOUNT_TYPE_PAGING);
        return this.responseModel.serial();
    }





    /**
     *保存或者更新实物用车保障信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "saveVehicleSupportInfo.do")
    public String save() {
        JSONObject jo = new JSONObject();
        jo.element("success", true);
        jo.element("label", this.vehicleSupportInfoService.saveOrUpdate(this
                .getVehicleSupportInfo()));
        return jo.toString();
    }



    /**
     * 删除实物用车保障信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "deleteVehicleSupportInfo.do")
    public String delete() {

        try {
            this.vehicleSupportInfoService.delete(this.getVehicleSupportInfos());
        }catch (Exception e){
            System.out.println("----------异常报告----------"+e);
            JSONObject jo = new JSONObject();
            jo.put("success", false);
            jo.put("msg", "error");
            return  jo.toString();


        }
        return this.responseModel.serial();
    }


    public VehicleSupportInfo getVehicleSupportInfo() {
        return vehicleSupportInfo;
    }

    public void setVehicleSupportInfo(VehicleSupportInfo vehicleSupportInfo) {
        this.vehicleSupportInfo = vehicleSupportInfo;
    }

    public List<VehicleSupportInfo> getVehicleSupportInfos() {
        return vehicleSupportInfos;
    }

    public void setVehicleSupportInfos(List<VehicleSupportInfo> vehicleSupportInfos) {
        this.vehicleSupportInfos = vehicleSupportInfos;
    }
}
