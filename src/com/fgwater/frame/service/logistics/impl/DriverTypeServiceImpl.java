package com.fgwater.frame.service.logistics.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.SessionUtils;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.logistics.CustomerMapper;
import com.fgwater.frame.mapper.logistics.DriverTypeMapper;
import com.fgwater.frame.model.logistics.BusType;
import com.fgwater.frame.model.logistics.Customer;
import com.fgwater.frame.model.logistics.DriverType;
import com.fgwater.frame.service.logistics.CustomerService;
import com.fgwater.frame.service.logistics.DriverTypeService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service("driverTypeService")
public class DriverTypeServiceImpl extends BaseServiceImpl implements DriverTypeService {

	@Resource
	private DriverTypeMapper driverTypeMapper;




	@Override
	public List<Map<String, String>>  query(Map<String, String> params) {
		return driverTypeMapper.query(params);
	}



	public boolean saveOrUpdate(DriverType driverType) {
		//int count = this.driverTypeMapper.check(driverType, "driverType");
		 int count = driverTypeMapper.checkByFleetId(driverType);
		if (count == 0) {
			if (StrUtils.isNullOrEmpty(driverType.getId())) {
				driverType.setId(UUIDUtils.getUUID());
				driverTypeMapper.insert(driverType);
			} else {
				driverTypeMapper.update(driverType);
			}
		}
		return count == 0;
	}







	public void delete(DriverType driverType) {
		driverTypeMapper.deletePhysicalCascade(driverType);
	}


	public void deleteTable(List<DriverType> driverTypes) {
		for (DriverType driverType : driverTypes) {
			JSONObject jo = JSONObject.fromObject(driverType);
			Map<String, String> map = this.toMap(jo);
			driverTypeMapper.deleteTable(map);
		}
	}

	@Override
	public List<DriverType> getAll(Map<String, String> params) {
		return this.driverTypeMapper.getAll(params);
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
