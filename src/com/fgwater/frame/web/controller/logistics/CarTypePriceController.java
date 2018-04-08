package com.fgwater.frame.web.controller.logistics;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.logistics.BusType;
import com.fgwater.frame.model.logistics.CarTypePrice;
import com.fgwater.frame.service.logistics.BusTypeService;
import com.fgwater.frame.service.logistics.CarTypePriceService;
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
public class CarTypePriceController extends BaseController {

	@Resource
	private CarTypePriceService carTypePriceService;


	@Injection
	private  List<CarTypePrice> carTypePrices;

	@Injection
	private CarTypePrice carTypePrice;


	@ResponseBody
	@RequestMapping(value = "saveCarTypePrice.do")
	public String save() {


		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.carTypePriceService.saveOrUpdate(this.getCarTypePrice()));
		//	System.out.println(this.getTruck().toString());
		return jo.toString();
	}


	@ResponseBody
	@RequestMapping(value = "queryCarTypePrice.do")
	public String query() {

		this.responseModel.mount(this.carTypePriceService.query(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);

		return this.responseModel.serial();
	}




	@ResponseBody
	@RequestMapping(value = "deleteCarTypePrice.do")
	public String delete() {
		System.out.println("==============deletedriverType============="+this.getCarTypePrices());
		this.carTypePriceService.deleteTable(this.getCarTypePrices());
		return this.responseModel.serial();
	}








	public List<CarTypePrice> getCarTypePrices() {
		return carTypePrices;
	}

	public void setCarTypePrices(List<CarTypePrice> carTypePrices) {
		this.carTypePrices = carTypePrices;
	}

	public CarTypePrice getCarTypePrice() {
		return carTypePrice;
	}

	public void setCarTypePrice(CarTypePrice carTypePrice) {
		this.carTypePrice = carTypePrice;
	}
}
