package com.fgwater.frame.web.controller.logistics;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.CarPeccancy;
import com.fgwater.frame.service.logistics.ApplyTypeService;
import com.fgwater.frame.service.logistics.CarPeccancyService;
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
public class CarPeccancyController extends BaseController {

	@Resource
	private CarPeccancyService carPeccancyService;


	@Injection
	private  List<CarPeccancy> carPeccancies;

	@Injection
	private CarPeccancy carPeccancy;



	@ResponseBody
	@RequestMapping(value = "savecarPeccancy.do")
	public String savebusType() {

		System.out.println("===========获取结算类型============"+this.getCarPeccancy());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.carPeccancyService.saveOrUpdatePeccancy(this.getCarPeccancy()));

		return jo.toString();
	}


	@ResponseBody
	@RequestMapping(value = "queryeccancy.do")
	public String query() {


		this.responseModel.mount(this.carPeccancyService.queryeccancy(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);



		return this.responseModel.serial();
	}



	@ResponseBody
	@RequestMapping(value = "deletePeccancy.do")
	public String delete() {
		System.out.println("==============获取司机违章list============="+this.getCarPeccancies());
		this.carPeccancyService.deleteTable(this.getCarPeccancies());
		return this.responseModel.serial();
	}





	public List<CarPeccancy> getCarPeccancies() {
		return carPeccancies;
	}

	public void setCarPeccancies(List<CarPeccancy> carPeccancies) {
		this.carPeccancies = carPeccancies;
	}

	public CarPeccancy getCarPeccancy() {
		return carPeccancy;
	}

	public void setCarPeccancy(CarPeccancy carPeccancy) {
		this.carPeccancy = carPeccancy;
	}
}
