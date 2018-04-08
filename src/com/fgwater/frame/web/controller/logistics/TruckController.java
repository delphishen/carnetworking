package com.fgwater.frame.web.controller.logistics;

import java.util.List;

import javax.annotation.Resource;

import com.fgwater.core.utils.SessionUtils;
import com.fgwater.frame.model.system.User;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.logistics.Truck;
import com.fgwater.frame.service.logistics.TruckService;

@Controller
@RequestMapping(value = "/logistics", produces = "text/plain;charset=UTF-8;")
/* 
添加注解 @Controller 将其标识为控制器，这里仅仅是一个普通的Java类，
通过简单的注解，就可以将其解析为Servlet类来响应用户的请求
*/
public class TruckController extends BaseController {

	@Resource
	private TruckService truckService;

	@Injection
	private List<Truck> trucks;

	@Injection
	private Truck truck;

	@ResponseBody
	@RequestMapping(value = "queryTruck.do")
	public String query() {
			System.out.println("============queryTruck获取车辆信息============"+this.truckService.query(this.requestModel.getParams()));



		this.responseModel.mount(this.truckService.query(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);
	//		System.out.println("queryTruck============"+this.responseModel.serial());
		return this.responseModel.serial();
	}


	@ResponseBody
	@RequestMapping(value = "queryTruckDispatcher.do")
	public String queryTruckDispatcher() {
		//System.out.println("============queryTruck获取车辆信息============"+this.truckService.query(this.requestModel.getParams()));


		String remark = this.requestModel.getParams().get("remark");
		String carTypeId = this.requestModel.getParams().get("carTypeId");

		User user = SessionUtils.getCurrUser();


		if (user.getRoleId().equals("20")){
			this.responseModel.mount(this.truckService.queryTruckDispatcher(this.requestModel
					.getParams()), MOUNT_TYPE_PAGING);
		}else {
			this.responseModel.mount(this.truckService.queryTruckDispatcherByRoot(this.requestModel
					.getParams()), MOUNT_TYPE_PAGING);


		}

		System.out.println("========================"+this.requestModel.getParams());




		//		System.out.println("queryTruck============"+this.responseModel.serial());
		return this.responseModel.serial();
	}






	@ResponseBody
	@RequestMapping(value = "getAllTruck.do")
	public String getAll() {
		this.responseModel.mount(this.truckService.getAll(this.requestModel
				.getParams()), MOUNT_TYPE_JA);
		
	//	JSONArray ja = JSONArray.fromObject(this.truckService.getAll(this.requestModel.getParams()));
	//	Object swap = ja;	
	//	System.out.println(swap.toString());
	//	System.out.println(this.requestModel.getParams());
	//	System.out.println(this.responseModel.serial());
		return this.responseModel.serial();
	}

	@ResponseBody
	@RequestMapping(value = "saveTruck.do")
	public String save() {

		System.out.println("=============车辆信息============="+this.getTruck().toString());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.truckService.saveOrUpdate(this.getTruck()));
	//	System.out.println(this.getTruck().toString());
		return jo.toString();
	}

	@ResponseBody
	@RequestMapping(value = "deleteTruck.do")
	public String delete() {
	//	System.out.println(this.getTrucks());
		this.truckService.delete(this.getTrucks());
		
		return this.responseModel.serial();
	}

	public List<Truck> getTrucks() {
		return trucks;
	}

	public void setTrucks(List<Truck> trucks) {
		this.trucks = trucks;
	}

	public Truck getTruck() {
		return truck;
	}

	public void setTruck(Truck truck) {
		this.truck = truck;
	}

}
