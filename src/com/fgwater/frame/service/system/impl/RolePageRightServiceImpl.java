package com.fgwater.frame.service.system.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.system.RolePageRightMapper;
import com.fgwater.frame.mapper.system.UserPageRightMapper;
import com.fgwater.frame.model.system.RolePageRight;
import com.fgwater.frame.model.system.UserPageRight;
import com.fgwater.frame.service.system.RolePageRightService;
import com.fgwater.frame.service.system.UserPageRightService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("rolePageRightService")
public class RolePageRightServiceImpl extends BaseServiceImpl implements
		RolePageRightService {

	@Resource
	private RolePageRightMapper rolePageRightMapper;

	public List<Map<String, Object>> getByUserId(String userId) {
		return this.rolePageRightMapper.getByUserId(userId);
	}
	 //菜单权限保存
	public void save(List<RolePageRight> list) {
		this.rolePageRightMapper.deleteByField(RolePageRight.class, "roleId",
				list.get(0).getRoleId());


		for (RolePageRight pageRight : list) {
			pageRight.setId(UUIDUtils.getUUID());
			this.rolePageRightMapper.insert(pageRight);

		}
	}

}
