package com.fgwater.frame.web.controller.system;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.system.Company;
import com.fgwater.frame.model.system.Role;
import com.fgwater.frame.service.system.CompanyService;
import com.fgwater.frame.service.system.RoleService;
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
public class RoleController extends BaseController {


	@Resource
	private RoleService roleService;


	@Injection
	private Role role;

	private  List<Role> roles;


	@ResponseBody
	@RequestMapping(value = "saveRole.do")
	public String save() {

		//System.out.println("userService==="+this.getUser());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.roleService.saveOrUpdate(this.getRole()));
		return jo.toString();
	}



	@ResponseBody
	@RequestMapping(value = "getRoleById.do")
	public String getRoleById() {
		this.responseModel.mount(this.roleService.getRoleById(this.requestModel
				.getParams()), MOUNT_TYPE_JA);
		return this.responseModel.serial();
	}


	@ResponseBody
	@RequestMapping(value = "queryRole.do")
	public String query() {
		this.responseModel.mount(this.roleService.query(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);
		//	System.out.println(this.responseModel.serial());
		System.out.println(this.responseModel.serial());
		return this.responseModel.serial();
	}







	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}
}
