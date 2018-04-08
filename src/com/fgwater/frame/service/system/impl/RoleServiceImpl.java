package com.fgwater.frame.service.system.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.SessionUtils;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.system.AttachMapper;
import com.fgwater.frame.mapper.system.RoleMapper;
import com.fgwater.frame.model.system.Attach;
import com.fgwater.frame.model.system.Role;
import com.fgwater.frame.model.system.User;
import com.fgwater.frame.service.system.AttachService;
import com.fgwater.frame.service.system.RoleService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.File;
import java.util.*;

@Service("roleService")
public class RoleServiceImpl extends BaseServiceImpl implements RoleService {

	@Resource
	private RoleMapper roleMapper;

	public List<Map<String, String>> query(Map<String, String> params) {
		return this.roleMapper.query(params);
	}

	@Override
	public boolean saveOrUpdate(Role role) {
		//JSONObject jo = JSONObject.fromObject(role);
		//Map<String, String> map = this.toMap(jo);

        int count = roleMapper.checkByFleetId(role);

        if (count == 0){
            if (StrUtils.isNullOrEmpty(role.getId())) {

                role.setId(UUIDUtils.getUUID());

                roleMapper.insert(role);
            } else {
                roleMapper.update(role);
            }
        }


		return count == 0;
	}

	@Override
	public List<Role> getRoleById(Map<String, String> params) {
		User user = SessionUtils.getCurrUser();
		String name = user.getLoginName();
		String roleId = user.getRoleId();
		if(("10").equals(roleId)){
			if (("root").equals(name)){
				return roleMapper.getRoleById(params);
			}else {
				return  roleMapper.getRoleByManager(params);

			}
		}else {
			return roleMapper.getRoleByCompany(params);
		}

	}


	@SuppressWarnings("unchecked")
	private Map<String, String> toMap(JSONObject jo) {
		Map<String, String> map = new HashMap<String, String>();
		Iterator<String> iterator = jo.keys();
		while (iterator.hasNext()) {
			String key = iterator.next();
			map.put(key, jo.getString(key));
		}
		return map;
	}


}
