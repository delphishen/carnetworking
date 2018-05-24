package com.fgwater.frame.web.controller.logistics;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fgwater.core.model.DateJsonValueProcessor;
import com.fgwater.core.utils.ExcelUtil;
import com.fgwater.core.utils.ResponseUtil;
import com.fgwater.core.utils.SessionUtils;
import com.fgwater.frame.model.system.User;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import net.sf.json.JsonConfig;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.logistics.Customer;
import com.fgwater.frame.service.logistics.CustomerService;

@Controller
@RequestMapping(value = "/logistics", produces = "text/plain;charset=UTF-8;")
/* 
添加注解 @Controller 将其标识为控制器，这里仅仅是一个普通的Java类，
通过简单的注解，就可以将其解析为Servlet类来响应用户的请求
*/
public class CustomerController extends BaseController {

	@Resource
	private CustomerService customerService;

	@Injection
	private List<Customer> customers;

	@Injection
	private Customer customer;

	@ResponseBody
	@RequestMapping(value = "queryCustomer.do")
	public String query() {

		this.responseModel.mount(this.customerService.query(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);
		//	System.out.println(this.requestModel.getParams());
		return this.responseModel.serial();
	}


	@ResponseBody
	@RequestMapping(value = "queryDriverDispatcher.do")
	public String queryDriverDispatcher() {


		User user = SessionUtils.getCurrUser();

		System.out.println("===================="+this.requestModel.getParams());
		String remark = this.requestModel.getParams().get("remark");
		System.out.println("======================="+user.getRoleId());
		if (user.getRoleId().equals("20")){

			this.responseModel.mount(this.customerService.queryDriverDispatcher(this.requestModel
					.getParams()), MOUNT_TYPE_PAGING);



		}else {
			this.responseModel.mount(this.customerService.query(this.requestModel
					.getParams()), MOUNT_TYPE_PAGING);

		}


		//	System.out.println(this.requestModel.getParams());
		return this.responseModel.serial();
	}


	@ResponseBody
	@RequestMapping(value = "getAllCustomer.do")
	public String getAll() {
		this.responseModel.mount(this.customerService.getAll(this.requestModel.getParams()), MOUNT_TYPE_JA);
		
	//	JSONArray ja = JSONArray.fromObject(this.truckService.getAll(this.requestModel.getParams()));
	//	Object swap = ja;	
	//	System.out.println(swap.toString());
	//	System.out.println(this.requestModel.getParams());
	//	System.out.println("getAllCustomer====="+this.responseModel.serial());
		return this.responseModel.serial();
	}

	@ResponseBody
	@RequestMapping(value = "saveCustomer.do")
	public String save() {


		System.out.println(this.getCustomer().toString());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.customerService.saveOrUpdate(this.getCustomer()));
	//	System.out.println(this.getTruck().toString());
		return jo.toString();
	}

	@ResponseBody
	@RequestMapping(value = "deleteCustomer.do")
	public String delete() {
	//	System.out.println(this.getTrucks());
		try {
			this.customerService.delete(this.getCustomers());


		}catch (Exception e ){
			System.out.println(e.getMessage());
			JSONObject jo = new JSONObject();
			jo.put("success", true);
			jo.put("msg", "999");
			return jo.toString();
		}
		
		return this.responseModel.serial();
	}

	@ResponseBody
	@RequestMapping(value = "exportDriver.do")
	public void exportDriver(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {

		Map<String ,String > map = new HashMap<>();
		String fleetId =  httpServletRequest.getParameter("fleetId");
		String driverName = httpServletRequest.getParameter("driverName");
		String tel = httpServletRequest.getParameter("tel");
		String queryfleetId = httpServletRequest.getParameter("queryfleetId");

		map.put("fleetId",fleetId);
		map.put("driverName",driverName);
		map.put("tel",tel);
		map.put("queryfleetId",queryfleetId);

		try {

			Workbook wb = new HSSFWorkbook();
			String heads[] = { "所属平台", "所属机构","司机姓名","当前状态","性别","司机类型","移动电话","联系地址"};
			List<Map<String,String>> mapList = this.customerService.queryexcel(map);

			JsonConfig config = new JsonConfig();
			config.registerJsonValueProcessor(Timestamp.class,new DateJsonValueProcessor("yyyy-MM-dd HH:mm:ss"));


			JSONArray rs = JSONArray.fromObject(mapList,config);
			ExcelUtil.fillExcelDriver(rs,wb,heads);
			//ResultSet re =  this.userService.findAll();
			//ExcelUtil.fillExcelData(rs,wb,heads);
			ResponseUtil.export(httpServletResponse,wb,"司机信息.xls");
		}catch (Exception e){
			System.out.println(e.getStackTrace());
			JSONObject jo = new JSONObject();
			jo.element("success", false);
		}
		//ResultSet  re = ResultSet.
		JSONObject jo = new JSONObject();
		jo.element("success", true);

	}

	public List<Customer> getCustomers() {
		return customers;
	}

	public void setCustomers(List<Customer> customers) {
		this.customers = customers;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

}
