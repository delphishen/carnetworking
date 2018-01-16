package com.fgwater.frame.web.controller.logistics;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.DriverRota;
import com.fgwater.frame.service.logistics.ApplyTypeService;
import com.fgwater.frame.service.logistics.DriverRotaService;
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
public class DriverRotaController extends BaseController {

	@Resource
	private DriverRotaService driverRotaService;


	@Injection
	private  List<DriverRota> driverRotas;

	@Injection
	private DriverRota driverRota;


	@ResponseBody
	@RequestMapping(value = "queryDriverRota.do")
	public String query() {

		this.responseModel.mount(this.driverRotaService.query(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);

		return this.responseModel.serial();
	}


	@ResponseBody
	@RequestMapping(value = "deleteDriverRota.do")
	public String delete() {
		System.out.println("==============获取司机排班参数============="+this.getDriverRotas());
		this.driverRotaService.deleteTable(this.getDriverRotas());
		return this.responseModel.serial();
	}









	@ResponseBody
	@RequestMapping(value = "saveDriverRota.do")
	public String savebusType() {

		System.out.println("===========获取司机排班参数============"+this.getDriverRota());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.driverRotaService.saveOrUpdateBusType(this.getDriverRota()));

		return jo.toString();
	}


	public List<DriverRota> getDriverRotas() {
		return driverRotas;
	}

	public void setDriverRotas(List<DriverRota> driverRotas) {
		this.driverRotas = driverRotas;
	}

	public DriverRota getDriverRota() {
		return driverRota;
	}

	public void setDriverRota(DriverRota driverRota) {
		this.driverRota = driverRota;
	}
}
