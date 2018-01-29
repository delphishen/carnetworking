package com.fgwater.frame.web.controller.logistics;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.Passenger;
import com.fgwater.frame.service.logistics.ApplyTypeService;
import com.fgwater.frame.service.logistics.PassengerService;
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
public class PassengerController extends BaseController {

	@Resource
	private PassengerService passengerService;


	@Injection
	private  List<Passenger> passengers;

	@Injection
	private Passenger passenger;



	@ResponseBody
	@RequestMapping(value = "savePassenger.do")
	public String savePassenger() {

		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.passengerService.saveOrUpdateBusType(this.getPassenger()));

		return jo.toString();
	}


	@ResponseBody
	@RequestMapping(value = "queryPassenger.do")
	public String query() {

		this.responseModel.mount(this.passengerService.query(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);

		return this.responseModel.serial();
	}


	@ResponseBody
	@RequestMapping(value = "deletePassenger.do")
	public String delete() {

		this.passengerService.deleteTable(this.getPassengers());
		return this.responseModel.serial();
	}









	public List<Passenger> getPassengers() {
		return passengers;
	}

	public void setPassengers(List<Passenger> passengers) {
		this.passengers = passengers;
	}

	public Passenger getPassenger() {
		return passenger;
	}

	public void setPassenger(Passenger passenger) {
		this.passenger = passenger;
	}
}
