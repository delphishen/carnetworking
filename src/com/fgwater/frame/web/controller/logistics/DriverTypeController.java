package com.fgwater.frame.web.controller.logistics;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.logistics.BusType;
import com.fgwater.frame.model.logistics.Customer;
import com.fgwater.frame.model.logistics.DriverType;
import com.fgwater.frame.service.logistics.CustomerService;
import com.fgwater.frame.service.logistics.DriverTypeService;
import net.sf.json.JSONArray;
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
public class DriverTypeController extends BaseController {

	@Resource
	private DriverTypeService driverTypeService;

	@Injection
	private List<DriverType> driverTypes;

	@Injection
	private DriverType driverType;


	/*@ResponseBody
	@RequestMapping(value = "getAllDriverType.do")
	public String getAll() {
		this.responseModel.mount(this.driverTypeService.getAll(this.requestModel
				.getParams()), MOUNT_TYPE_JA);

		JSONArray ja = JSONArray.fromObject(this.driverTypeService.getAll(this.requestModel.getParams()));
		Object swap = ja;
		System.out.println(swap.toString());
		//	System.out.println(this.requestModel.getParams());
		//	System.out.println(this.responseModel.serial());
		System.out.println(this.responseModel.serial());
		return this.responseModel.serial();
	}*/

	@ResponseBody
	@RequestMapping(value = "queryDriverType.do")
	public String query() {







		this.responseModel.mount(this.driverTypeService.query(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);









		return this.responseModel.serial();
	}


	@ResponseBody
	@RequestMapping(value = "getAlldriverType.do")
	public String getAll() {
		this.responseModel.mount(this.driverTypeService.getAll(this.requestModel
				.getParams()), MOUNT_TYPE_JA);

		JSONArray ja = JSONArray.fromObject(this.driverTypeService.getAll(this.requestModel.getParams()));
		Object swap = ja;
		System.out.println("-----司机类别------"+swap.toString());
		//	System.out.println(this.requestModel.getParams());
		//	System.out.println(this.responseModel.serial());
		return this.responseModel.serial();
	}



	@ResponseBody
	@RequestMapping(value = "savedriverType.do")
	public String save() {

		System.out.println("===========savedriverType============"+this.getDriverType());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.driverTypeService.saveOrUpdate(this.getDriverType()));

		return jo.toString();
	}


	@ResponseBody
	@RequestMapping(value = "deletedriverType.do")
	public String delete() {
		try {
			this.driverTypeService.deleteTable(this.getDriverTypes());
		}catch (Exception e){

			JSONObject jsonObject = new JSONObject();
			jsonObject.put("success", false);
			jsonObject.put("msg", "ok");
			return  jsonObject.toString();
		}

		return this.responseModel.serial();
	}


















	public List<DriverType> getDriverTypes() {
		return driverTypes;
	}

	public void setDriverTypes(List<DriverType> driverTypes) {
		this.driverTypes = driverTypes;
	}

	public DriverType getDriverType() {
		return driverType;
	}

	public void setDriverType(DriverType driverType) {
		this.driverType = driverType;
	}


}
