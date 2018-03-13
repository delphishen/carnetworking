package com.fgwater.frame.service.logistics.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.logistics.ApplyTypeMapper;
import com.fgwater.frame.mapper.logistics.DispatcherPlateNoMapper;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.Customer;
import com.fgwater.frame.model.logistics.DispatcherPlateNo;
import com.fgwater.frame.service.logistics.ApplyTypeService;
import com.fgwater.frame.service.logistics.DispatcherPlateNoService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.DispatcherServlet;

import javax.annotation.Resource;
import javax.persistence.Id;
import java.util.*;

@Service("dispatcherPlateNoService")
public class DispatcherPlateNoServiceImpl extends BaseServiceImpl implements DispatcherPlateNoService {

	@Resource
	private DispatcherPlateNoMapper dispatcherPlateNoMapper;


	@Override
	public boolean savedispatcherPlateNo(DispatcherPlateNo dispatcherPlateNo) {

		int count = 0;
		String  pid  = dispatcherPlateNo.getPlateNoId();
		List<String> plateNoId = Arrays.asList(pid.split(","));
		for (String plate:plateNoId){
			dispatcherPlateNo.setPlateNoId(plate);
			count = dispatcherPlateNoMapper.checkByPlateNoId(dispatcherPlateNo);
			if(count!=0){
				return  false;
			}
		}


		//int count = this.dispatcherPlateNoMapper.check(dispatcherPlateNo, "plateNoId");


		//System.out.println("=================count==================="+count);




		if(count ==0) {
			if (StrUtils.isNullOrEmpty(dispatcherPlateNo.getId())) {
				System.out.println("=====================id为空=============");

				List<String> dispatcherPlateNos = Arrays.asList(pid.split(","));
				for (String dis : dispatcherPlateNos) {
					DispatcherPlateNo diss = new DispatcherPlateNo();
					diss.setId(UUIDUtils.getUUID());
					diss.setUserId(dispatcherPlateNo.getUserId());
					diss.setPlateNoId(dis);
					diss.setFleetId(dispatcherPlateNo.getFleetId());
					this.dispatcherPlateNoMapper.insert(diss);
				}
			} else {
				System.out.println("====================id不为空！！！！！===================");
				this.dispatcherPlateNoMapper.update(dispatcherPlateNo);
			}
		}






		return count == 0;
	}

	@Override
	public List<Map<String, String>> query(Map<String, String> params) {

		return this.dispatcherPlateNoMapper.query(params);
	}

	@Override
	public void deleteTable(List<DispatcherPlateNo> dispatcherPlateNos) {


		for (DispatcherPlateNo dispatcherPlateNo : dispatcherPlateNos) {
			JSONObject jo = JSONObject.fromObject(dispatcherPlateNo);
			Map<String, String> map = this.toMap(jo);
			dispatcherPlateNoMapper.deleteTable(map);
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
