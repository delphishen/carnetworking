package com.fgwater.frame.web.controller.logistics;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.logistics.BusType;
import com.fgwater.frame.model.logistics.BusTypePrice;
import com.fgwater.frame.service.logistics.BusTypePriceService;
import com.fgwater.frame.service.logistics.BusTypeService;
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
public class BusTypePriceController extends BaseController {

	@Resource
	private BusTypePriceService busTypePriceService;


	@Injection
	private  List<BusTypePrice> busTypePrices;

	@Injection
	private BusTypePrice busTypePrice;



	@ResponseBody
	@RequestMapping(value = "queryBusTypePrice.do")
	public String query() {


		System.out.println("=================params==========="+this.requestModel.getParams());

		this.responseModel.mount(this.busTypePriceService.query(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);

		return this.responseModel.serial();
	}



	@ResponseBody
	@RequestMapping(value = "queryBusTypePriceList.do")
	public String queryBusTypePriceList() {


		System.out.println("=================params==========="+this.requestModel.getParams());

		this.responseModel.mount(this.busTypePriceService.queryBusTypePriceList(this.requestModel
				.getParams()), MOUNT_TYPE_JA);

		return this.responseModel.serial();
	}




	@ResponseBody
	@RequestMapping(value = "deleteBusTypePrice.do")
	public String delete() {
		System.out.println("==============获取包车业务类型list============="+this.getBusTypePrices());
		this.busTypePriceService.deleteTable(this.getBusTypePrices());
		return this.responseModel.serial();
	}









	@ResponseBody
	@RequestMapping(value = "savebusTypePrice.do")
	public String savebusType() {

		System.out.println("===========获取包车业务类型============"+this.getBusTypePrice());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.busTypePriceService.saveOrUpdateBusType(this.getBusTypePrice()));

		return jo.toString();
	}

	public List<BusTypePrice> getBusTypePrices() {
		return busTypePrices;
	}

	public void setBusTypePrices(List<BusTypePrice> busTypePrices) {
		this.busTypePrices = busTypePrices;
	}

	public BusTypePrice getBusTypePrice() {
		return busTypePrice;
	}

	public void setBusTypePrice(BusTypePrice busTypePrice) {
		this.busTypePrice = busTypePrice;
	}
}
