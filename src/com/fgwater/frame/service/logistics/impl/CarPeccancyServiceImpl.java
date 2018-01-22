package com.fgwater.frame.service.logistics.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.logistics.ApplyTypeMapper;
import com.fgwater.frame.mapper.logistics.CarPeccancyMapper;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.CarPeccancy;
import com.fgwater.frame.service.logistics.ApplyTypeService;
import com.fgwater.frame.service.logistics.CarPeccancyService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service("carPeccancyService")
public class CarPeccancyServiceImpl extends BaseServiceImpl implements CarPeccancyService {

	@Resource
	private CarPeccancyMapper carPeccancyMapper;












	@Override
	public boolean saveOrUpdatePeccancy(CarPeccancy carPeccancy) {


			if (StrUtils.isNullOrEmpty(carPeccancy.getId())) {
				carPeccancy.setId(UUIDUtils.getUUID());
				carPeccancyMapper.insert(carPeccancy);
			} else {
				carPeccancyMapper.update(carPeccancy);
			}

		return true;
	}

	@Override
	public List<Map<String, String>> queryeccancy(Map<String, String> params) {
		return this.carPeccancyMapper.queryeccancy(params);
	}

	@Override
	public void deleteTable(List<CarPeccancy> carPeccancies) {

		for (CarPeccancy carPeccancie : carPeccancies) {
			JSONObject jo = JSONObject.fromObject(carPeccancie);
			Map<String, String> map = this.toMap(jo);
			carPeccancyMapper.deleteTable(map);
		}

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
