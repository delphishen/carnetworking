package com.fgwater.frame.web.controller.api;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.api.VehicleAccidentInfo;
import com.fgwater.frame.model.api.VehicleOilInfo;
import com.fgwater.frame.service.api.VehicleAccidentInfoService;
import com.fgwater.frame.service.api.VehicleOilInfoService;
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

public class VehicleAccidentInfoController extends BaseController {

	@Resource
	private VehicleAccidentInfoService vehicleAccidentInfoService;

	@Injection
	private VehicleAccidentInfo vehicleAccidentInfo;

	@Injection
	private List<VehicleAccidentInfo> vehicleAccidentInfos;



    /**
     * 查询车辆事故信息
     * @return
     */

    @ResponseBody
    @RequestMapping(value = "queryVehicleAccidentInfo.do")
    public String query() {


        System.out.println(this.requestModel.getParams());
        this.responseModel.mount(this.vehicleAccidentInfoService.query(this.requestModel
                .getParams()), MOUNT_TYPE_PAGING);
        return this.responseModel.serial();
    }





    /**
     *保存或者更新车辆事故信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "saveVehicleAccidentInfo.do")
    public String save() {
        JSONObject jo = new JSONObject();
        jo.element("success", true);
        jo.element("label", this.vehicleAccidentInfoService.saveOrUpdate(this
                .getVehicleAccidentInfo()));
        return jo.toString();
    }



    /**
     * 删除车辆事故信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "deleteVehicleAccidentInfo.do")
    public String delete() {

        try {
            this.vehicleAccidentInfoService.delete(this.getVehicleAccidentInfos());
        }catch (Exception e){
            System.out.println("----------异常报告----------"+e);
            JSONObject jo = new JSONObject();
            jo.put("success", false);
            jo.put("msg", "error");
            return  jo.toString();


        }
        return this.responseModel.serial();
    }


    public VehicleAccidentInfo getVehicleAccidentInfo() {
        return vehicleAccidentInfo;
    }

    public void setVehicleAccidentInfo(VehicleAccidentInfo vehicleAccidentInfo) {
        this.vehicleAccidentInfo = vehicleAccidentInfo;
    }

    public List<VehicleAccidentInfo> getVehicleAccidentInfos() {
        return vehicleAccidentInfos;
    }

    public void setVehicleAccidentInfos(List<VehicleAccidentInfo> vehicleAccidentInfos) {
        this.vehicleAccidentInfos = vehicleAccidentInfos;
    }
}
