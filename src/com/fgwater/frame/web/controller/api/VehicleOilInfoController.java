package com.fgwater.frame.web.controller.api;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.api.VehicleOilInfo;
import com.fgwater.frame.model.api.VehicleSupportInfo;
import com.fgwater.frame.service.api.VehicleOilInfoService;
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

public class VehicleOilInfoController extends BaseController {

	@Resource
	private VehicleOilInfoService vehicleOilInfoService;

	@Injection
	private VehicleOilInfo vehicleOilInfo;

	@Injection
	private List<VehicleOilInfo> vehicleOilInfos;



    /**
     * 查询实物加油记录信息
     * @return
     */

    @ResponseBody
    @RequestMapping(value = "queryVehicleOilInfo.do")
    public String query() {


        System.out.println(this.requestModel.getParams());
        this.responseModel.mount(this.vehicleOilInfoService.query(this.requestModel
                .getParams()), MOUNT_TYPE_PAGING);
        return this.responseModel.serial();
    }





    /**
     *保存或者更新加油记录信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "saveVehicleOilInfo.do")
    public String save() {
        JSONObject jo = new JSONObject();
        jo.element("success", true);
        jo.element("label", this.vehicleOilInfoService.saveOrUpdate(this
                .getVehicleOilInfo()));
        return jo.toString();
    }



    /**
     * 删除加油记录信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "deleteVehicleOilInfo.do")
    public String delete() {

        try {
            this.vehicleOilInfoService.delete(this.getVehicleOilInfos());
        }catch (Exception e){
            System.out.println("----------异常报告----------"+e);
            JSONObject jo = new JSONObject();
            jo.put("success", false);
            jo.put("msg", "error");
            return  jo.toString();


        }
        return this.responseModel.serial();
    }


    public VehicleOilInfo getVehicleOilInfo() {
        return vehicleOilInfo;
    }

    public void setVehicleOilInfo(VehicleOilInfo vehicleOilInfo) {
        this.vehicleOilInfo = vehicleOilInfo;
    }

    public List<VehicleOilInfo> getVehicleOilInfos() {
        return vehicleOilInfos;
    }

    public void setVehicleOilInfos(List<VehicleOilInfo> vehicleOilInfos) {
        this.vehicleOilInfos = vehicleOilInfos;
    }
}
