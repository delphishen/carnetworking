package com.fgwater.frame.service.logistics.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.logistics.ApplyTypeMapper;
import com.fgwater.frame.mapper.logistics.PassengerMapper;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.Passenger;
import com.fgwater.frame.service.logistics.ApplyTypeService;
import com.fgwater.frame.service.logistics.PassengerService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service("passengerService")
public class PassengerServiceImpl extends BaseServiceImpl implements PassengerService {

	@Resource
	private PassengerMapper passengerMapper;












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


	@Override
	public boolean saveOrUpdateBusType(Passenger passenger) {

		//int count = this.passengerMapper.check(passenger, "settlement");
			if (StrUtils.isNullOrEmpty(passenger.getId())) {
				passenger.setId(UUIDUtils.getUUID());
				passengerMapper.insert(passenger);
			} else {
				passengerMapper.update(passenger);
			}

		return true;
	}

	@Override
	public List<Map<String, String>> query(Map<String, String> params) {
		return this.passengerMapper.query(params);
	}

	@Override
	public void deleteTable(List<Passenger> passengers) {

		for (Passenger passenger : passengers) {
			JSONObject jo = JSONObject.fromObject(passenger);
			Map<String, String> map = this.toMap(jo);
			this.passengerMapper.deleteTable(map);
		}

	}
}
