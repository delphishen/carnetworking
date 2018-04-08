package com.fgwater.frame.service.logistics.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.SessionUtils;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.logistics.ApplyTypeMapper;
import com.fgwater.frame.mapper.logistics.CarApplyMapper;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.CarApply;
import com.fgwater.frame.model.logistics.Truck;
import com.fgwater.frame.model.system.User;
import com.fgwater.frame.service.logistics.ApplyTypeService;
import com.fgwater.frame.service.logistics.CarApplyService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.*;

@Service("carApplyService")
public class CarApplyServiceImpl extends BaseServiceImpl implements CarApplyService {

	@Resource
	private CarApplyMapper applyMapper;



	@Override
	public List<Map<String, String>> query(Map<String, String> params) {
		String localeName = "";
		List<Map<String,String >> mapList = new ArrayList<>();

		User  user = SessionUtils.getCurrUser();
		if (("10").equals(user.getRoleId())){
			mapList = this.applyMapper.query(params);
		}else {
			params.put("userId",user.getId());
			mapList = this.applyMapper.queryByCompany(params);
		}


		for (Map<String,String>  map :mapList){
			//System.out.println("=======订单编号==========="+map.get("carApplyNo"));
			List<Map<String,String>> maps = this.applyMapper.findapplylocale(map);
			for (Map<String,String>  map1:maps){
				localeName = localeName+map1.get("localeName")+",";

			}
			map.put("localeName",localeName);
			localeName = "";
		}



		return mapList;


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



		if(StrUtils.isNullOrEmpty(carApply.getCarApplyNo())){
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

			Date date = new Date();
			String datatime = simpleDateFormat.format(date);

			carApply.setCarApplyNo(datatime);
			carApply.setOrderFrom("后台下单");
			carApply.setStatuesId("10");
			carApply.setDriverId(null);
			carApply.setPlateNoId(null);
			this.applyMapper.insert(carApply);

		}else {
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
		}




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

	@Override
	public List<Map<String, String>> queryAllCarApply(Map<String, String> params) {

		User user = SessionUtils.getCurrUser();
		List<Map<String,String >> mapList = new ArrayList<>();
		if (("10").equals(user.getRoleId())){
			mapList = this.applyMapper.queryAllCarApply(params);
		}else {
			params.put("userId",user.getId());
			mapList = this.applyMapper.queryCarApplyByUserId(params);

		}



		String localeName = "";

		for (Map<String,String>  map :mapList){
			List<Map<String,String>> maps = this.applyMapper.findapplylocale(map);
			for (Map<String,String>  map1:maps){
				localeName = localeName+map1.get("localeName")+",";

			}
			map.put("localeName",localeName);
			localeName = "";
		}
		return mapList;
	}

	@Override
	public void cancelcarApply(CarApply carApply) {

		this.applyMapper.cancelcarApply(carApply);

		Map<String,String> map =  new HashMap<String, String>();
		map.put("id",UUIDUtils.getUUID());
		map.put("fleetId",carApply.getFleetId());
		map.put("carApplyNo",carApply.getCarApplyNo());
		map.put("activityId",carApply.getActivityId());
		map.put("statues","已取消");
		map.put("userId", SessionUtils.getCurrUserId());
		map.put("approveDatetime",StrUtils.getCurrFormatTime());


		System.out.println(map);
		this.applyMapper.insertlog(map);

	}

	@Override
	public void deletecarApply(List<CarApply> carApplies) {
		for (CarApply carApplie : carApplies) {
			JSONObject jo = JSONObject.fromObject(carApplie);
			Map<String, String> map = this.toMap(jo);
			applyMapper.backgroundCancel(map);
			//applyMapper.deleteTable(map);
		}
	}

	@Override
	public boolean insertcarApply(CarApply carApply) {
        carApply.setStatuesId("10");
        carApply.setDriverId(null);
        carApply.setPlateNoId(null);
         String carApplyNo = carApply.getUserId()+System.currentTimeMillis();
        carApply.setCarApplyNo(carApplyNo);
        System.currentTimeMillis();
	    carApply.setOrderFrom("后台下单");


		applyMapper.insert(carApply);
		return true;
	}

	@Override
	public Map<String, String> queryOrder(String carApplyNo) {
		return applyMapper.queryOrder(carApplyNo);
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
