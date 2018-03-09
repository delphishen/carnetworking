package com.fgwater.frame.web.controller.logistics;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.logistics.BusType;
import com.fgwater.frame.model.logistics.DriverType;
import com.fgwater.frame.service.logistics.BusTypeService;
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
public class BusTypeController extends BaseController {

	@Resource
	private BusTypeService busTypeService;


	@Injection
	private  List<BusType> busTypes;

	@Injection
	private BusType busType;



	@ResponseBody
	@RequestMapping(value = "queryBusType.do")
	public String query() {

		this.responseModel.mount(this.busTypeService.query(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);

		return this.responseModel.serial();
	}


	@ResponseBody
	@RequestMapping(value = "getAllBusType.do")
	public String getAll() {
		this.responseModel.mount(this.busTypeService.getAll(this.requestModel
				.getParams()), MOUNT_TYPE_JA);


		//	System.out.println(this.requestModel.getParams());
		//	System.out.println(this.responseModel.serial());
		return this.responseModel.serial();
	}


	@ResponseBody
	@RequestMapping(value = "deleteBusType.do")
	public String delete() {
		System.out.println("==============获取包车业务类型list============="+this.getBusTypes());
		try {
			this.busTypeService.deleteTable(this.getBusTypes());
		}catch (Exception e){

			JSONObject jo = new JSONObject();
			jo.put("success", false);
			jo.put("msg", "ok");
			return jo.toString();
		}

		return this.responseModel.serial();
	}









	@ResponseBody
	@RequestMapping(value = "savebusType.do")
	public String savebusType() {

		System.out.println("===========获取包车业务类型============"+this.getBusType());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.busTypeService.saveOrUpdateBusType(this.getBusType()));

		return jo.toString();
	}


	public BusTypeService getBusTypeService() {
		return busTypeService;
	}

	public void setBusTypeService(BusTypeService busTypeService) {
		this.busTypeService = busTypeService;
	}

	public List<BusType> getBusTypes() {
		return busTypes;
	}

	public void setBusTypes(List<BusType> busTypes) {
		this.busTypes = busTypes;
	}

	public BusType getBusType() {
		return busType;
	}

	public void setBusType(BusType busType) {
		this.busType = busType;
	}
}
