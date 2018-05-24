package com.fgwater.frame.web.controller.api;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.utils.SessionUtils;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.api.MaintenanceInfo;
import com.fgwater.frame.model.system.Attach;
import com.fgwater.frame.service.api.MaintenanceInfoService;
import com.fgwater.frame.service.system.AttachService;
import net.sf.json.JSONObject;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Iterator;
import java.util.List;

@Controller
@Scope("request")
@RequestMapping(value = "/api", produces = "text/plain;charset=UTF-8;")

/* 
添加注解 @Controller 将其标识为控制器，这里仅仅是一个普通的Java类，
通过简单的注解，就可以将其解析为Servlet类来响应用户的请求
*/

public class MaintenanceInfoController extends BaseController {

	@Resource
	private MaintenanceInfoService maintenanceInfoService;

	@Injection
	private MaintenanceInfo maintenanceInfo;

	@Injection
	private List<MaintenanceInfo> maintenanceInfos;



    /**
     * 查询维修厂基本信息
     * @return
     */

    @ResponseBody
    @RequestMapping(value = "queryMaintenanceInfo.do")
    public String query() {


        System.out.println(this.requestModel.getParams());
        this.responseModel.mount(this.maintenanceInfoService.query(this.requestModel
                .getParams()), MOUNT_TYPE_PAGING);
        return this.responseModel.serial();
    }





    /**
     *保存或者更新维修厂信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "saveMaintenanceInfo.do")
    public String save() {
        JSONObject jo = new JSONObject();
        jo.element("success", true);
        jo.element("label", this.maintenanceInfoService.saveOrUpdate(this
                .getMaintenanceInfo()));
        return jo.toString();
    }



    /**
     * 删除维修厂信息
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "deleteMaintenanceInfo.do")
    public String delete() {

        try {
            this.maintenanceInfoService.delete(this.getMaintenanceInfos());
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










    public MaintenanceInfo getMaintenanceInfo() {
        return maintenanceInfo;
    }

    public void setMaintenanceInfo(MaintenanceInfo maintenanceInfo) {
        this.maintenanceInfo = maintenanceInfo;
    }

    public List<MaintenanceInfo> getMaintenanceInfos() {
        return maintenanceInfos;
    }

    public void setMaintenanceInfos(List<MaintenanceInfo> maintenanceInfos) {
        this.maintenanceInfos = maintenanceInfos;
    }
}
