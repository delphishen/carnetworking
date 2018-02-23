package com.fgwater.frame.web.controller.logistics;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.BusType;
import com.fgwater.frame.service.logistics.ApplyTypeService;
import com.fgwater.frame.service.logistics.BusTypeService;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
public class ApplyTypeController extends BaseController {







	@Resource
	private ApplyTypeService applyTypeService;


	@Injection
	private  List<ApplyType> applyTypes;

	@Injection
	private ApplyType applyType;


	@ResponseBody
	@RequestMapping(value = "queryApplyType.do")
	public String query() {

		this.responseModel.mount(this.applyTypeService.query(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);

		return this.responseModel.serial();
	}


	@ResponseBody
	@RequestMapping(value = "deleteApplyType.do")
	public String delete() {
		System.out.println("==============获取结算类型list============="+this.getApplyTypes());
		this.applyTypeService.deleteTable(this.getApplyTypes());
		return this.responseModel.serial();
	}









	@ResponseBody
	@RequestMapping(value = "saveApplyType.do")
	public String savebusType() {

		System.out.println("===========获取结算类型============"+this.getApplyType());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.applyTypeService.saveOrUpdateBusType(this.getApplyType()));

		return jo.toString();
	}











	public ApplyTypeService getApplyTypeService() {
		return applyTypeService;
	}

	public void setApplyTypeService(ApplyTypeService applyTypeService) {
		this.applyTypeService = applyTypeService;
	}

	public List<ApplyType> getApplyTypes() {
		return applyTypes;
	}

	public void setApplyTypes(List<ApplyType> applyTypes) {
		this.applyTypes = applyTypes;
	}

	public ApplyType getApplyType() {
		return applyType;
	}

	public void setApplyType(ApplyType applyType) {
		this.applyType = applyType;
	}
}
