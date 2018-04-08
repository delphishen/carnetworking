package com.fgwater.frame.service.system;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.system.Attach;
import com.fgwater.frame.model.system.Role;

import java.util.List;
import java.util.Map;

public interface RoleService extends BaseService {

	public List<Map<String, String>> query(Map<String, String> params);




	public  boolean saveOrUpdate(Role role);

    public List<Role> getRoleById(Map<String, String> params);

}
