package com.fgwater.frame.web.controller.system;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.system.Company;
import com.fgwater.frame.model.system.Fleet;
import com.fgwater.frame.service.system.CompanyService;
import com.fgwater.frame.service.system.FleetService;
import net.sf.json.JSONObject;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@Scope("request")
@RequestMapping(value = "/system", produces = "text/plain;charset=UTF-8;")
/* 
添加注解 @Controller 将其标识为控制器，这里仅仅是一个普通的Java类，
通过简单的注解，就可以将其解析为Servlet类来响应用户的请求
*/
public class CompanyController extends BaseController {


	@Resource
	private CompanyService companyService;


	@Injection
	private Company company;

	private  List<Company> companies;

	@ResponseBody
	@RequestMapping(value = "getTreeAllCompanyList.do")
	public String getAll() {
		this.responseModel.mount(this.companyService.getTreeAll(this.requestModel.getParams()), MOUNT_TYPE_JA);

		System.out.println("buildCompany======"+this.responseModel.serial());
		return this.responseModel.serial();
	}


	//获取单位机构树子集
	@ResponseBody
	@RequestMapping(value = "getTreechild.do")
	public String getTreechild() {
		this.responseModel.mount(this.companyService.getTreechild(this.requestModel.getParams()), MOUNT_TYPE_PAGING);

		System.out.println("buildCompany======"+this.responseModel.serial());
		return this.responseModel.serial();
	}




	@ResponseBody
	@RequestMapping(value = "saveCompany.do")
	public String save() {

		System.out.println("===========saveCompany============"+this.getCompany());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.companyService.saveOrUpdate(this.getCompany()));

		return jo.toString();
	}

	@ResponseBody
	@RequestMapping(value = "deleteCompany.do")
	public String delete() {
		System.out.println("==============deleteCompany============="+this.getCompany());
		this.companyService.delete(this.getCompany());
		return this.responseModel.serial();
	}











	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public List<Company> getCompanies() {
		return companies;
	}

	public void setCompanies(List<Company> companies) {
		this.companies = companies;
	}
}
