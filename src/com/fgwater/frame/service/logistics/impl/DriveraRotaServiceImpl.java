package com.fgwater.frame.service.logistics.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.logistics.ApplyTypeMapper;
import com.fgwater.frame.mapper.logistics.DriverRotaMapper;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.DriverRota;
import com.fgwater.frame.service.logistics.ApplyTypeService;
import com.fgwater.frame.service.logistics.DriverRotaService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service("driverRotaService")
public class DriveraRotaServiceImpl extends BaseServiceImpl implements DriverRotaService {

	@Resource
	private DriverRotaMapper driverRotaMapper;





	@Override
	public List<Map<String, String>>  query(Map<String, String> params) {
		return driverRotaMapper.query(params);
	}


	public void deleteTable(List<DriverRota> driverRotas) {
		for (DriverRota driverRota : driverRotas) {
			JSONObject jo = JSONObject.fromObject(driverRota);
			Map<String, String> map = this.toMap(jo);
			driverRotaMapper.deleteTable(map);
		}
	}







	public boolean saveOrUpdateBusType(DriverRota driverRota) {

		String  clockIn = driverRota.getClockIn().substring(0,10);
		String driverId = driverRota.getDriverId();
		Map<String,String> params = new HashMap<>();
		params.put("clockIn",clockIn);
		params.put("driverId",driverId);
		int count =  driverRotaMapper.chevkByClock(params);

		//int count = this.driverRotaMapper.check(driverRota, "driverId");
		if (count == 0) {
			if (StrUtils.isNullOrEmpty(driverRota.getId())) {
				driverRota.setId(UUIDUtils.getUUID());
				driverRotaMapper.insert(driverRota);
			} else {
				driverRotaMapper.update(driverRota);
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
