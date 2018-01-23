package com.fgwater.frame.mapper.system;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.logistics.TaskList;
import com.fgwater.frame.model.system.Employee;
import com.fgwater.frame.model.system.Fleet;

import java.util.List;
import java.util.Map;

public interface FleetMapper extends BaseMapper<Fleet> {


	public List<Fleet> getTreeAll(Map<String, String> params);

    public List<Fleet> getTreeFleetList(Map<String, String> params);

}
