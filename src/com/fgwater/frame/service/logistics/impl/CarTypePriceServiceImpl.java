package com.fgwater.frame.service.logistics.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.logistics.BusTypeMapper;
import com.fgwater.frame.mapper.logistics.CarTypePriceMapper;
import com.fgwater.frame.model.logistics.BusType;
import com.fgwater.frame.model.logistics.CarTypePrice;
import com.fgwater.frame.service.logistics.BusTypeService;
import com.fgwater.frame.service.logistics.CarTypePriceService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service("carTypePriceService")
public class CarTypePriceServiceImpl extends BaseServiceImpl implements CarTypePriceService {

	@Resource
	private CarTypePriceMapper carTypePriceMapper;


	public boolean saveOrUpdate(CarTypePrice carTypePrice) {

			if (StrUtils.isNullOrEmpty(carTypePrice.getId())) {
				carTypePrice.setId(UUIDUtils.getUUID());
				carTypePriceMapper.insert(carTypePrice);
			} else {
				carTypePriceMapper.update(carTypePrice);
			}

		return true;
	}

	@Override
	public List<Map<String, String>> query(Map<String, String> params) {
		return this.carTypePriceMapper.query(params);
	}

	@Override
	public void deleteTable(List<CarTypePrice> carTypePrices) {

		for (CarTypePrice carTypePrice : carTypePrices) {
			JSONObject jo = JSONObject.fromObject(carTypePrice);
			Map<String, String> map = this.toMap(jo);
			carTypePriceMapper.deleteTable(map);
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
