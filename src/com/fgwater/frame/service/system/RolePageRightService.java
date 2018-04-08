package com.fgwater.frame.service.system;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.system.RolePageRight;
import com.fgwater.frame.model.system.UserPageRight;

import java.util.List;
import java.util.Map;

public interface RolePageRightService extends BaseService {

	public List<Map<String, Object>> getByUserId(String userId);

	public void save(List<RolePageRight> list);   //菜单权限保存

}
