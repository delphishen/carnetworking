package com.fgwater.frame.service.logistics.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.logistics.DispatcherDriverMapper;
import com.fgwater.frame.mapper.logistics.DispatcherPlateNoMapper;
import com.fgwater.frame.model.logistics.DispatcherDriver;
import com.fgwater.frame.model.logistics.DispatcherPlateNo;
import com.fgwater.frame.service.logistics.DispatcherDriverService;
import com.fgwater.frame.service.logistics.DispatcherPlateNoService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

@Service("dispatcherDriverService")
public class DispatcherDriverServiceImpl extends BaseServiceImpl implements DispatcherDriverService {

	@Resource
	private DispatcherDriverMapper dispatcherDriverMapper;


	@Override
	public boolean savedispatcherDriver(DispatcherDriver dispatcherDriver) {

		String  did  = dispatcherDriver.getDriverId();


		if (StrUtils.isNullOrEmpty(dispatcherDriver.getId())){
			System.out.println("=====================id为空=============");

			List<String> dispatcheDrivers = Arrays.asList(did.split(","));
			for (String dis : dispatcheDrivers) {
				DispatcherDriver dispatcherDriver1 = new DispatcherDriver();
				dispatcherDriver1.setId(UUIDUtils.getUUID());
				dispatcherDriver1.setUserId(dispatcherDriver.getUserId());
				dispatcherDriver1.setDriverId(dis);
				this.dispatcherDriverMapper.insert(dispatcherDriver1);
			}
		}else {
			System.out.println("====================id不为空！！！！！===================");
			this.dispatcherDriverMapper.update(dispatcherDriver);
		}






		return true;
	}

	@Override
	public List<Map<String, String>> query(Map<String, String> params) {

		return this.dispatcherDriverMapper.query(params);
	}

	@Override
	public void deleteTable(List<DispatcherDriver> dispatcherDrivers) {

		for (DispatcherDriver dispatcherDriver : dispatcherDrivers) {
			JSONObject jo = JSONObject.fromObject(dispatcherDriver);
			Map<String, String> map = this.toMap(jo);
			dispatcherDriverMapper.deleteTable(map);
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
