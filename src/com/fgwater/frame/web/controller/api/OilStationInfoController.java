package com.fgwater.frame.web.controller.api;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.api.InsuranceInfo;
import com.fgwater.frame.model.api.OilStationInfo;
import com.fgwater.frame.service.api.InsuranceInfoService;
import com.fgwater.frame.service.api.OilStationInfoService;
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

public class OilStationInfoController extends BaseController {

	@Resource
	private OilStationInfoService oilStationInfoService;

	@Injection
	private OilStationInfo oilStationInfo;

	@Injection
	private List<OilStationInfo>  oilStationInfos;



    /**
     * 查询加油站点基本信息
     * @return
     */

    @ResponseBody
    @RequestMapping(value = "queryOilStationInfo.do")
    public String query() {


        System.out.println(this.requestModel.getParams());
        this.responseModel.mount(this.oilStationInfoService.query(this.requestModel
                .getParams()), MOUNT_TYPE_PAGING);
        return this.responseModel.serial();
    }





    /**
     *保存或者更新加油站点信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "saveOilStationInfo.do")
    public String save() {
        JSONObject jo = new JSONObject();
        jo.element("success", true);
        jo.element("label", this.oilStationInfoService.saveOrUpdate(this
                .getOilStationInfo()));
        return jo.toString();
    }



    /**
     * 删除加油站点信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "deleteOilStationInfo.do")
    public String delete() {

        try {
            this.oilStationInfoService.delete(this.getOilStationInfos());
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

    public OilStationInfo getOilStationInfo() {
        return oilStationInfo;
    }

    public void setOilStationInfo(OilStationInfo oilStationInfo) {
        this.oilStationInfo = oilStationInfo;
    }

    public List<OilStationInfo> getOilStationInfos() {
        return oilStationInfos;
    }

    public void setOilStationInfos(List<OilStationInfo> oilStationInfos) {
        this.oilStationInfos = oilStationInfos;
    }
}
