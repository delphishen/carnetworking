package com.fgwater.frame.web.controller.logistics;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.model.DateJsonValueProcessor;
import com.fgwater.core.utils.ExcelUtil;
import com.fgwater.core.utils.ResponseUtil;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.Passenger;
import com.fgwater.frame.service.logistics.ApplyTypeService;
import com.fgwater.frame.service.logistics.PassengerService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	@RequestMapping(value = "queryPassengerById.do")
	public String queryPassengerById() {

		this.responseModel.mount(this.passengerService.queryPassengerById(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);

		return this.responseModel.serial();
	}



	@ResponseBody
	@RequestMapping(value = "deletePassenger.do")
	public String delete() {

		this.passengerService.deleteTable(this.getPassengers());
		return this.responseModel.serial();
	}


	@ResponseBody
	@RequestMapping(value = "exportPassenger.do")
	public void exportPassenger(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {

		Map<String ,String > map = new HashMap<>();
		String fleetId =  httpServletRequest.getParameter("fleetId");
		String passengerName = httpServletRequest.getParameter("passengerName");
		String mobile = httpServletRequest.getParameter("mobile");
		String queryfleetId = httpServletRequest.getParameter("queryfleetId");

		map.put("fleetId",fleetId);
		map.put("passengerName",passengerName);
		map.put("mobile",mobile);
		map.put("queryfleetId",queryfleetId);

		try {

			Workbook wb = new HSSFWorkbook();
			String heads[] = { "所属平台", "所属机构","乘客姓名","性别","手机号码","联系地址"};
			List<Map<String,String>> mapList = this.passengerService.queryexcel(map);

			JsonConfig config = new JsonConfig();
			config.registerJsonValueProcessor(Timestamp.class,new DateJsonValueProcessor("yyyy-MM-dd HH:mm:ss"));


			JSONArray rs = JSONArray.fromObject(mapList,config);
			ExcelUtil.fillExcelPassenger(rs,wb,heads);
			//ResultSet re =  this.userService.findAll();
			//ExcelUtil.fillExcelData(rs,wb,heads);
			ResponseUtil.export(httpServletResponse,wb,"乘客信息.xls");
		}catch (Exception e){
			System.out.println(e.getStackTrace());
			JSONObject jo = new JSONObject();
			jo.element("success", false);
		}
		//ResultSet  re = ResultSet.
		JSONObject jo = new JSONObject();
		jo.element("success", true);

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
