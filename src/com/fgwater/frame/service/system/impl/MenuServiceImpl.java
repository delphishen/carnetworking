package com.fgwater.frame.service.system.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.SessionUtils;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.system.MenuMapper;
import com.fgwater.frame.model.system.Menu;
import com.fgwater.frame.model.system.User;
import com.fgwater.frame.service.system.MenuService;

@Service("menuService")
public class MenuServiceImpl extends BaseServiceImpl implements MenuService {

	@Resource
	private MenuMapper menuMapper;

	//菜单权限分配读取所有菜单
	public JSONArray getAllMenus() {

		List<Map<String ,Object>> maps =  new ArrayList<>();

		User user = SessionUtils.getCurrUser();


		if (("rootempolyee").equals(user.getId())){
			maps = this.menuMapper.getAll();
		}else {
			List<Map<String,Object>> fatherMap = this.menuMapper.getByFatherId();

			maps = this.menuMapper.getAllByUserId(user.getEmpId());
			if (maps.size() == 0){
				maps = this.menuMapper.getAllByRoleId(user.getRoleId());
			}
			for (Map<String,Object> map:fatherMap){
				maps.add(map);
			}
		}


			return this.getByRoot(JSONArray.fromObject(maps),
							"0", new JSONArray());
			
		
		

	};

	//菜单权限分配，读取选择的用户的菜单权限
	public List<Map<String, Object>> getByUserId(String userId) {
		return this.menuMapper.getByUserId(userId);
	}
	
	 //系统登录根据用户权限读取菜单
	public JSONArray getMenusByUserId(String userId) {
		
		/*JSONArray ja = JSONArray.fromObject(this.getByRoot(JSONArray.fromObject(this.menuMapper.getByUserId(userId)),"0", new JSONArray()));
		Object swap = ja;
	System.out.println("getMenusByUserId============="+swap.toString());		*/
		
		//return this.getByRoot(JSONArray.fromObject(this.menuMapper
		//		.getByUserId(userId)), "0", new JSONArray());
		//2017.07.04 修改 判断登录用户如果是root 管理员，显示所有菜单
		User user = SessionUtils.getCurrUser();
		
		if (user.getLoginName().equals("root") ) {
			return this.getByRoot(JSONArray.fromObject(this.menuMapper.getAll()),"0", new JSONArray());
		} else {
			return this.getByRoot(JSONArray.fromObject(this.menuMapper.getByUserId(userId)), "0", new JSONArray());
		}		
	
//	System.out.println("getLinesAll=========="+this.getByRoot(JSONArray.fromObject(this.menuMapper.getAll()),"0", new JSONArray()));
	};

	public boolean saveOrUpdate(Menu menu) {
		int count = this.menuMapper.check(menu, "text");
		menu.setIsAdd(true);
		menu.setIsDel(true);
		menu.setIsModify(true);
		menu.setIsSee(true);
		if (count == 0) {
			if (StrUtils.isNullOrEmpty(menu.getId())) {
				menu.setId(UUIDUtils.getUUID());
				menuMapper.insert(menu);
			} else {
				menuMapper.update(menu);
			}
		}
		return count == 0;
	}

	public void delete(Menu menu) {
		menuMapper.deletePhysicalCascade(menu);
	}

	@Override
	public List<Map<String, Object>> getByRoleIdMenu(String userId) {
		return this.menuMapper.getByRoleIdMenu(userId);
	}

	@Override
	public List<Map<String, Object>> getByRoleId(String roleId) {
		return this.menuMapper.getByRoleId(roleId);
	}

	@Override
	public JSONArray getMenusByRoleId(String userId) {
		User user = SessionUtils.getCurrUser();

		if (user.getLoginName().equals("root") ) {
			return this.getByRoot(JSONArray.fromObject(this.menuMapper.getAll()),"0", new JSONArray());
		} else {
			return this.getByRoot(JSONArray.fromObject(this.menuMapper.getByRoleIdMenu(userId)), "0", new JSONArray());
		}
	}

	private JSONArray getByRoot(JSONArray menuArr, String root, JSONArray res) {
		for (int i = 0; i < menuArr.size(); i++) {
			JSONObject jo = menuArr.getJSONObject(i);
			jo.put("isBtn", false);// 标志为非按钮
			// 根据父ID获取元素
			if (root.equals(jo.getString("fatherId"))) {
				// 判断是否为叶子，是则装配，否则递归
				if (jo.getInt("menuLeaf") != 1) {
					jo.put("leaf", false);
					jo.put("expanded", true);
					jo.put("children", this.getByRoot(menuArr, jo.getString("id"), new JSONArray()));
				} else {
					jo.put("leaf", true);					
					if(jo.getBoolean("isSee")==true){
						jo.put("see","<input type=\"checkbox\" onclick=\"clickCheck(this,1)\" id=\""+jo.getString("id")+"_see\" name=\"see\"/>");
					}					
					if(jo.getBoolean("isModify")==true){
						jo.put("modify","<input type=\"checkbox\" onclick=\"clickCheck(this,1)\" id=\""+jo.getString("id")+"_modify\" name=\"modify\"/>");
					}
					if(jo.getBoolean("isAdd")==true){
						jo.put("add","<input type=\"checkbox\" onclick=\"clickCheck(this,1)\" id=\""+jo.getString("id")+"_add\" name=\"add\"/>");
					}
					if(jo.getBoolean("isDel")==true){
						jo.put("del","<input type=\"checkbox\" onclick=\"clickCheck(this,1)\" id=\""+jo.getString("id")+"_del\" name=\"del\"/>");
					}					
				}
				res.add(jo);
			}
		}
		return res;
	}
	
	
	
	
  //2017.08.24 菜单权限分配，读取所有系统菜单，为何单独写这个是因为在原来的getByRoot 中叶子加
//jo.put("uiProvider","col");  会报错
//	private JSONArray getByRootMenu(JSONArray menuArr, String root, JSONArray res) {
//		for (int i = 0; i < menuArr.size(); i++) {
//			JSONObject jo = menuArr.getJSONObject(i);
//			jo.put("isBtn", false);// 标志为非按钮
//			// 根据父ID获取元素
//			if (root.equals(jo.getString("fatherId"))) {
//				// 判断是否为叶子，是则装配，否则递归
//				if (jo.getInt("menuLeaf") != 1) {
//					jo.put("leaf", false);
//					jo.put("expanded", true);
//					jo.put("children", this.getByRootMenu(menuArr, jo.getString("id"), new JSONArray()));
//				} else {
//					jo.put("leaf", true);	
//				//	jo.put("uiProvider","col");
//				//	jo.put("checked",false);	
//					if(jo.getBoolean("isSee")==true){
//						jo.put("see","<input type=\"checkbox\" onclick=\"clickCheck(this,1)\" id=\""+jo.getString("id")+"_see\" name=\"see\"/>");
//					}					
//					if(jo.getBoolean("isModify")==true){
//						jo.put("modify","<input type=\"checkbox\" onclick=\"clickCheck(this,1)\" id=\""+jo.getString("id")+"_modify\" name=\"modify\"/>");
//					}
//					if(jo.getBoolean("isAdd")==true){
//						jo.put("add","<input type=\"checkbox\" onclick=\"clickCheck(this,1)\" id=\""+jo.getString("id")+"_add\" name=\"add\"/>");
//					}
//					if(jo.getBoolean("isDel")==true){
//						jo.put("del","<input type=\"checkbox\" onclick=\"clickCheck(this,1)\" id=\""+jo.getString("id")+"_del\" name=\"del\"/>");
//					}					
//				}
//				res.add(jo);
//			}
//		}
//		return res;
//	}	
//	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
