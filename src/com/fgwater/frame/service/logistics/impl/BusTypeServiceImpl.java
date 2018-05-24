package com.fgwater.frame.service.logistics.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.logistics.BusTypeMapper;
import com.fgwater.frame.mapper.logistics.DriverTypeMapper;
import com.fgwater.frame.model.logistics.BusType;
import com.fgwater.frame.model.logistics.DriverType;
import com.fgwater.frame.service.logistics.BusTypeService;
import com.fgwater.frame.service.logistics.DriverTypeService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service("busTypeService")
public class BusTypeServiceImpl extends BaseServiceImpl implements BusTypeService {

	@Resource
	private BusTypeMapper busTypeMapper;






	@Override
	public List<Map<String, String>>  query(Map<String, String> params) {
		System.out.println("-----------参数输出----------"+params);
		return busTypeMapper.query(params);
	}


	public void deleteTable(List<BusType> busTypes) {
		for (BusType busType : busTypes) {
			JSONObject jo = JSONObject.fromObject(busType);
			Map<String, String> map = this.toMap(jo);
			busTypeMapper.deleteTable(map);
		}
	}

	@Override
	public List<BusType> getAll(Map<String, String> params) {
		return this.busTypeMapper.getAll(params);
	}


	public boolean saveOrUpdateBusType(BusType busType) {
		//int count = this.busTypeMapper.check(busType, "charteredBusType");

		int count = 0;

		if (StrUtils.isNullOrEmpty(busType.getId())){
			count = this.busTypeMapper.checkByFleetId(busType);
		}else {
			count = this.busTypeMapper.checkById(busType);
		}


		if (count == 0) {
			if (StrUtils.isNullOrEmpty(busType.getId())) {
				busType.setId(UUIDUtils.getUUID());
				busTypeMapper.insert(busType);
			} else {
				busTypeMapper.update(busType);
			}
		}
		return count == 0;
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
