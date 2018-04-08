package com.fgwater.frame.web.controller.system;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.system.RolePageRight;
import com.fgwater.frame.model.system.UserPageRight;
import com.fgwater.frame.service.system.MenuService;
import com.fgwater.frame.service.system.RolePageRightService;
import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping(value = "/system", produces = "text/plain;charset=UTF-8;")
public class RoleRightController extends BaseController {

	@Resource
	private RolePageRightService rolePageRightService;

	@Resource
	private MenuService menuService;

	@Injection
	private  RolePageRight rolePageRight;

	@Injection
	private List<RolePageRight> rolePageRights;



	@ResponseBody
	@RequestMapping(value = "saveRoleRight.do")  //菜单权限保存
	public String saveRoleRight() {


		this.rolePageRightService.save(this.getRolePageRights());
		return this.responseModel.serial();
	}


	public RolePageRight getRolePageRight() {
		return rolePageRight;
	}

	public void setRolePageRight(RolePageRight rolePageRight) {
		this.rolePageRight = rolePageRight;
	}

	public List<RolePageRight> getRolePageRights() {
		return rolePageRights;
	}

	public void setRolePageRights(List<RolePageRight> rolePageRights) {
		this.rolePageRights = rolePageRights;
	}
}
