package com.fgwater.frame.web.controller.logistics;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.logistics.ApproveCompany;
import com.fgwater.frame.model.logistics.DispatcherDriver;
import com.fgwater.frame.service.logistics.ApproveCompanyService;
import com.fgwater.frame.service.logistics.DispatcherDriverService;
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
public class ApproveCompanyController extends BaseController {

	@Resource
	private ApproveCompanyService approveCompanyService;


	@Injection
	private  List<ApproveCompany> approveCompanies;

	@Injection
	private  ApproveCompany approveCompany;



	@ResponseBody
	@RequestMapping(value = "saveapproveCompany.do")
	public String savebusType() {

		System.out.println("===========保存审核员权限信息============"+this.getApproveCompany());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.approveCompanyService.savedispatcherDriver(this.getApproveCompany()));

		return jo.toString();
	}


	@ResponseBody
	@RequestMapping(value = "queryapproveCompany.do")
	public String query() {


		this.responseModel.mount(this.approveCompanyService.query(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);



		return this.responseModel.serial();
	}



	@ResponseBody
	@RequestMapping(value = "deleteapproveCompany.do")
	public String delete() {
		System.out.println("==============保存审核员权限信息============="+this.getApproveCompanies());
		this.approveCompanyService.deleteTable(this.getApproveCompanies());
		return this.responseModel.serial();
	}


	public List<ApproveCompany> getApproveCompanies() {
		return approveCompanies;
	}

	public void setApproveCompanies(List<ApproveCompany> approveCompanies) {
		this.approveCompanies = approveCompanies;
	}

	public ApproveCompany getApproveCompany() {
		return approveCompany;
	}

	public void setApproveCompany(ApproveCompany approveCompany) {
		this.approveCompany = approveCompany;
	}
}
