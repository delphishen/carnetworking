package com.fgwater.frame.service.logistics.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.logistics.ApplyTypeMapper;
import com.fgwater.frame.mapper.logistics.BusTypeMapper;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.BusType;
import com.fgwater.frame.service.logistics.ApplyTypeService;
import com.fgwater.frame.service.logistics.BusTypeService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service("applyTypeService")
@Transactional
public class ApplyTypeServiceImpl extends BaseServiceImpl implements ApplyTypeService {

	@Resource
	private ApplyTypeMapper applyTypeMapper;





	@Override
	public List<Map<String, String>>  query(Map<String, String> params) {
		return applyTypeMapper.query(params);
	}


	public void deleteTable(List<ApplyType> applyTypes) {
		for (ApplyType applyType : applyTypes) {
			JSONObject jo = JSONObject.fromObject(applyType);
			Map<String, String> map = this.toMap(jo);
			applyTypeMapper.deleteTable(map);
		}
	}






	public boolean saveOrUpdateBusType(ApplyType applyType) {
		//int count = this.applyTypeMapper.check(applyType, "settlement");
		 int count = this.applyTypeMapper.chekById(applyType);
		if (count == 0) {
			if (StrUtils.isNullOrEmpty(applyType.getId())) {
				applyType.setId(UUIDUtils.getUUID());
				applyTypeMapper.insert(applyType);
			} else {
				applyTypeMapper.update(applyType);
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
