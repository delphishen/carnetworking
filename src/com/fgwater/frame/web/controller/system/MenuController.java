package com.fgwater.frame.web.controller.system;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.utils.SessionUtils;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.system.Menu;
import com.fgwater.frame.service.system.MenuService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@Scope("request")
@RequestMapping(value = "/system", produces = "text/plain;charset=UTF-8;")
public class MenuController extends BaseController {

	@Resource
	private MenuService menuService;

	@Injection
	private Menu menu;

	/**
	 * //菜单权限分配读取所有菜单
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "buildMenu.do")
	public String build() {
		this.responseModel.mount(this.menuService.getAllMenus(), MOUNT_TYPE_JA);
		
		System.out.println("buildMenu======"+this.responseModel.serial());		
		return this.responseModel.serial();
	}


	/**
	 * //系统登录根据用户权限读取菜单
	 * @return
	 */
	@ResponseBody            
	@RequestMapping(value = "buildByCurrUserMenu.do")
	public String buildByCurrUser() {

		System.out.println(SessionUtils.getCurrUser().getEmpId());

		JSONArray jsonArray = new JSONArray();

		jsonArray = this.menuService.getMenusByUserId(SessionUtils
				.getCurrUser().getId());
		System.out.println("=========="+jsonArray.size());
		if (0 == jsonArray.size()){
			jsonArray = this.menuService.getMenusByRoleId(SessionUtils.getCurrUser().getRoleId());
		}


		this.responseModel.mount(jsonArray, MOUNT_TYPE_JA);

		System.out.println("==========菜单信息============="+this.responseModel.serial());


		return this.responseModel.serial();
	}

	/**
	 * //菜单权限分配，读取选择的用户的菜单权限
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getByUserIdMenu.do")
	public String getByUserIdMenu() {

		List<Map<String,Object>> mapList = new ArrayList<>();
		 mapList = this.menuService.getByUserId(this.requestModel
				.getParams().get("userId"));
		if (mapList.size() == 0){
			mapList = this.menuService.getByRoleIdMenu(this.requestModel.getParams().get("roleId"));

		}

		this.responseModel.mount(mapList, MOUNT_TYPE_JA);
		return this.responseModel.serial();
	}


	/**
	 * /菜单权限分配，读取选择的角色的菜单权限
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getByRoleIdMenu.do")
	public String getByRoleIdMenu() {
		this.responseModel.mount(this.menuService.getByRoleIdMenu(this.requestModel
				.getParams().get("userId")), MOUNT_TYPE_JA);
		return this.responseModel.serial();
	}

	@ResponseBody
	@RequestMapping(value = "saveMenu.do")
	public String save() {
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.menuService.saveOrUpdate(this.getMenu()));
		return jo.toString();
	}


	/**
	 * 删除菜单
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "deleteMenu.do")
	public String delete() {
		this.menuService.delete(this.getMenu());
		return this.responseModel.serial();
	}

	public Menu getMenu() {
		return menu;
	}

	public void setMenu(Menu menu) {
		this.menu = menu;
	}

}
