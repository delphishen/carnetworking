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
import java.text.SimpleDateFormat;
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
				dispatcherDriver1.setFleetId(dispatcherDriver.getFleetId());

				int count =  this.dispatcherDriverMapper.checkName(dispatcherDriver1);
				if(count == 0){
					this.dispatcherDriverMapper.insert(dispatcherDriver1);
				}else {
					return  false;
				}


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

	@Override
	public boolean savebuqueryDriverRotasType(Map<String, String> params) {

		String departureTime = params.get("departureTime");
		System.out.println("====departureTime======="+departureTime);
		List<Map<String, Object>> mapList = dispatcherDriverMapper.savebuqueryDriverRotasType(params);

		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");



		for (Map<String,Object> map:mapList ){
			try {
				Date in = simpleDateFormat.parse(map.get("clockIn").toString());
				Date out = simpleDateFormat.parse(map.get("clockOut").toString());
				Date departure = simpleDateFormat.parse(departureTime);
				System.out.println(!departure.before(in));
				System.out.println(departure.before(out));
				if (!departure.before(in) && departure.before(out)){
					return  true;
				}
			}catch (Exception e){

			}

//			System.out.println("上班时间"+map.get("clockIn"));
//			System.out.println("下班时间"+map.get("clockOut"));
//			JSONObject jsonObject = JSONObject.fromObject(map);
//			System.out.println(jsonObject.toString());
//			int i = (map.get("clockIn").toString()).compareTo(departureTime);
//			int j = (map.get("clockOut").toString()).compareTo(departureTime);
//			//System.out.println(departureTime.compareTo(map.get("clockIn").toString()));
//			System.out.println((map.get("clockIn").toString()).compareTo(departureTime));
//			if(i>0){
//				return  true;
//
//			}


//			if (j>0){
//				return  true;
//			}

		}
		return false;
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
