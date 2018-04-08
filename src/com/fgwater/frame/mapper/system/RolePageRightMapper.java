package com.fgwater.frame.mapper.system;

import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.system.RolePageRight;
import com.fgwater.frame.model.system.UserPageRight;

import java.util.List;
import java.util.Map;

public interface RolePageRightMapper extends BaseMapper<RolePageRight> {

	public List<Map<String, Object>> getByUserId(String roleId);

}
