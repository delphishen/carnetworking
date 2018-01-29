package com.fgwater.frame.service.logistics.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.SessionUtils;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.logistics.ApplyTypeMapper;
import com.fgwater.frame.mapper.logistics.CarApplyMapper;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.CarApply;
import com.fgwater.frame.service.logistics.ApplyTypeService;
import com.fgwater.frame.service.logistics.CarApplyService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service("carApplyService")
public class CarApplyServiceImpl extends BaseServiceImpl implements CarApplyService {

	@Resource
	private CarApplyMapper applyMapper;











	@Override
	public List<Map<String, String>> query(Map<String, String> params) {
		return this.applyMapper.query(params);
	}

	@Override
	public void updateTable(CarApply carApply) {

		this.applyMapper.updateTable(carApply);

		Map<String,String> map =  new HashMap<String, String>();
		map.put("id",UUIDUtils.getUUID());
		map.put("fleetId",carApply.getFleetId());
		map.put("carApplyNo",carApply.getCarApplyNo());
		map.put("activityId",carApply.getActivityId());
		map.put("statues","已审核");
		map.put("userId", SessionUtils.getCurrUserId());
		map.put("approveDatetime",StrUtils.getCurrFormatTime());


		System.out.println(map);
		this.applyMapper.insertlog(map);







	}

	@Override
	public List<Map<String, String>> queryinsanity(Map<String, String> params) {
		return this.applyMapper.queryinsanity(params);
	}

	@Override
	public List<Map<String, String>> queryapproveLog(Map<String, String> params) {
		return this.applyMapper.queryapproveLog(params);
	}

	@Override
	public boolean savecarApply(CarApply carApply) {

		this.applyMapper.savecarApply(carApply);
		Map<String,String> map =  new HashMap<String, String>();
		map.put("id",UUIDUtils.getUUID());
		map.put("fleetId",carApply.getFleetId());
		map.put("carApplyNo",carApply.getCarApplyNo());
		map.put("plateNoId",carApply.getPlateNoId());
		map.put("driverId",carApply.getDriverId());
		map.put("userId",SessionUtils.getCurrUserId());
		map.put("dispatchDatetime",StrUtils.getCurrFormatTime());


		System.out.println("=============添加调度日志map=========="+map);

		this.applyMapper.insertdispatchlog(map);


		return true;
	}

	@Override
	public List<Map<String, String>> querydispatchLog(Map<String, String> params) {
		return this.applyMapper.querydispatchLog(params);
	}

	@Override
	public List<Map<String, String>> querydispatch(Map<String, String> params) {
		return this.applyMapper.querydispatch(params);
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
