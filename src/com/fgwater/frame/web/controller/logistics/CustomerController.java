package com.fgwater.frame.web.controller.logistics;

import java.util.List;

import javax.annotation.Resource;
import net.sf.json.JSONObject;

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

		System.out.println("获取司机分页数据"+this.customerService.query(this.requestModel
				.getParams()));
		this.responseModel.mount(this.customerService.query(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);
		//	System.out.println(this.requestModel.getParams());
		return this.responseModel.serial();
	}


	@ResponseBody
	@RequestMapping(value = "queryDriverDispatcher.do")
	public String queryDriverDispatcher() {


		System.out.println("===================="+this.requestModel.getParams());
		String remark = this.requestModel.getParams().get("remark");
		System.out.println("======================="+remark.equals("管理员"));
		if (remark.equals("管理员")){

			this.responseModel.mount(this.customerService.query(this.requestModel
					.getParams()), MOUNT_TYPE_PAGING);

		}else {
			this.responseModel.mount(this.customerService.queryDriverDispatcher(this.requestModel
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
