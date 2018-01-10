package com.fgwater.frame.mapper.logistics;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.logistics.Customer;
import com.fgwater.frame.model.logistics.DriverType;

import java.util.List;
import java.util.Map;

public interface DriverTypeMapper extends BaseMapper<DriverType> {



	@Paging
	public List<Map<String, String>> query(Map<String, String> params);


    public void deleteTable(Map<String, String> map);

    public   List<DriverType> getAll(Map<String, String> params);


}
