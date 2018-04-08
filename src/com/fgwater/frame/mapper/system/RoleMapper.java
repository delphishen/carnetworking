package com.fgwater.frame.mapper.system;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.system.Attach;
import com.fgwater.frame.model.system.Role;

import java.util.List;
import java.util.Map;

public interface RoleMapper extends BaseMapper<Role> {

	@Paging
	public List<Map<String, String>> query(Map<String, String> params);

	public Attach getById(String id);

    public  int checkByFleetId(Role role);

    public List<Role> getRoleById(Map<String, String> params);


    public List<Role> getRoleByCompany(Map<String, String> params);

    public List<Role> getRoleByManager(Map<String, String> params);

}
