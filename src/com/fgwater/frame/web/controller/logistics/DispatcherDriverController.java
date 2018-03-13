package com.fgwater.frame.web.controller.logistics;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.logistics.DispatcherDriver;
import com.fgwater.frame.model.logistics.DispatcherPlateNo;
import com.fgwater.frame.service.logistics.DispatcherDriverService;
import com.fgwater.frame.service.logistics.DispatcherPlateNoService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping(value = "/logistics", produces = "text/plain;charset=UTF-8;")
/* 
添加注解 @Controller 将其标识为控制器，这里仅仅是一个普通的Java类，
通过简单的注解，就可以将其解析为Servlet类来响应用户的请求
*/
public class DispatcherDriverController extends BaseController {

	@Resource
	private DispatcherDriverService dispatcherDriverService;


	@Injection
	private  List<DispatcherDriver>  dispatcherDrivers;

	@Injection
	private  DispatcherDriver  dispatcherDriver;



	@ResponseBody
	@RequestMapping(value = "savedispatcherDriver.do")
	public String savebusType() {

		System.out.println("===========保存调度司机信息============"+this.getDispatcherDriver());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.dispatcherDriverService.savedispatcherDriver(this.getDispatcherDriver()));

		return jo.toString();
	}

	@ResponseBody
	@RequestMapping(value = "querydispatcherRota.do")
	public String savebuqueryDriverRotasType() {

		System.out.println("===========保存调度司机信息============"+this.requestModel.getParams());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.dispatcherDriverService.savebuqueryDriverRotasType(this.requestModel.getParams()));

		return jo.toString();
	}


	@ResponseBody
	@RequestMapping(value = "queryispatcherDriver.do")
	public String query() {


		System.out.println("==========================="+this.requestModel.getParams());


		this.responseModel.mount(this.dispatcherDriverService.query(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);



		return this.responseModel.serial();
	}



	@ResponseBody
	@RequestMapping(value = "deletedispatcherDriver.do")
	public String delete() {


		System.out.println("==============删除司机调度信息============="+this.getDispatcherDrivers());
		this.dispatcherDriverService.deleteTable(this.getDispatcherDrivers());
		return this.responseModel.serial();
	}


	public List<DispatcherDriver> getDispatcherDrivers() {
		return dispatcherDrivers;
	}

	public void setDispatcherDrivers(List<DispatcherDriver> dispatcherDrivers) {
		this.dispatcherDrivers = dispatcherDrivers;
	}

	public DispatcherDriver getDispatcherDriver() {
		return dispatcherDriver;
	}

	public void setDispatcherDriver(DispatcherDriver dispatcherDriver) {
		this.dispatcherDriver = dispatcherDriver;
	}
}
