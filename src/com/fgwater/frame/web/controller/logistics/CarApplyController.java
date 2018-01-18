package com.fgwater.frame.web.controller.logistics;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.CarApply;
import com.fgwater.frame.service.logistics.ApplyTypeService;
import com.fgwater.frame.service.logistics.CarApplyService;
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
public class CarApplyController extends BaseController {

	@Resource
	private CarApplyService applyService;


	@Injection
	private  List<CarApply> carApplies;

	@Injection
	private CarApply carApply;


	@ResponseBody
	@RequestMapping(value = "querycarApply.do")
	public String query() {



		System.out.println("=========获取未审核信息========"+this.applyService.query(this.requestModel.getParams()));

		this.responseModel.mount(this.applyService.query(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);

		return this.responseModel.serial();
	}


	@ResponseBody
	@RequestMapping(value = "querydispatchLog.do")
	public String querydispatchLog() {



		this.responseModel.mount(this.applyService.querydispatchLog(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);

		return this.responseModel.serial();
	}

	@ResponseBody
	@RequestMapping(value = "queryapproveLog.do")
	public String queryapproveLog() {



		this.responseModel.mount(this.applyService.queryapproveLog(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);

		return this.responseModel.serial();
	}


	@ResponseBody
	@RequestMapping(value = "queryinsanity.do")
	public String queryinsanity() {



		this.responseModel.mount(this.applyService.queryinsanity(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);

		return this.responseModel.serial();
	}
	@ResponseBody
	@RequestMapping(value = "querydispatch.do")
	public String querydispatch() {



		this.responseModel.mount(this.applyService.querydispatch(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);

		return this.responseModel.serial();
	}


	@ResponseBody
	@RequestMapping(value = "savecarApply.do")
	public String savebusType() {

		System.out.println("===========获取结算类型============"+this.getCarApply());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.applyService.savecarApply(this.getCarApply()));

		return jo.toString();
	}


	@ResponseBody
	@RequestMapping(value = "updatearApply.do")
	public String delete() {
		System.out.println("============获取未审核信息zzzzzz==============="+this.getCarApply());
		this.applyService.updateTable(this.getCarApply());
		return this.responseModel.serial();
	}






	public List<CarApply> getCarApplies() {
		return carApplies;
	}

	public void setCarApplies(List<CarApply> carApplies) {
		this.carApplies = carApplies;
	}

	public CarApply getCarApply() {
		return carApply;
	}

	public void setCarApply(CarApply carApply) {
		this.carApply = carApply;
	}
}
