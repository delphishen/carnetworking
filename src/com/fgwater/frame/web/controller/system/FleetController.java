package com.fgwater.frame.web.controller.system;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.system.Employee;
import com.fgwater.frame.model.system.Fleet;
import com.fgwater.frame.service.system.EmployeeService;
import com.fgwater.frame.service.system.FleetService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@Scope("request")
@RequestMapping(value = "/system", produces = "text/plain;charset=UTF-8;")
/* 
添加注解 @Controller 将其标识为控制器，这里仅仅是一个普通的Java类，
通过简单的注解，就可以将其解析为Servlet类来响应用户的请求
*/
public class FleetController extends BaseController {


	@Resource
	private FleetService fleetService;

	@Injection
	private Fleet fleet;

	@Injection
	private  List<Fleet> fleets;


	@ResponseBody
	@RequestMapping(value = "getTreeAllFleetList.do")
	public String getAll() {

		System.out.println("==========获取param================="+this.requestModel.getParams());

		this.responseModel.mount(this.fleetService.getTreeAll(this.requestModel.getParams()), MOUNT_TYPE_JA);

		//System.out.println("buildFleet======"+this.responseModel.serial());
		return this.responseModel.serial();
	}





	@ResponseBody
	@RequestMapping(value = "saveFleet.do")
	public String save() {

		System.out.println("===========saveFleet============"+this.getFleet());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.fleetService.saveOrUpdate(this.getFleet()));

		return jo.toString();
	}

	@ResponseBody
	@RequestMapping(value = "deleteFleet.do")
	public String delete() {
		System.out.println("==============deletefleet============="+this.getFleet());
		this.fleetService.delete(this.getFleet());
		return this.responseModel.serial();
	}






	public Fleet getFleet() {
		return fleet;
	}

	public void setFleet(Fleet fleet) {
		this.fleet = fleet;
	}

	public List<Fleet> getFleets() {
		return fleets;
	}

	public void setFleets(List<Fleet> fleets) {
		this.fleets = fleets;
	}
}
