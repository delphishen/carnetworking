package com.fgwater.frame.service.logistics.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.logistics.BusTypeMapper;
import com.fgwater.frame.mapper.logistics.BusTypePriceMapper;
import com.fgwater.frame.model.logistics.BusType;
import com.fgwater.frame.model.logistics.BusTypePrice;
import com.fgwater.frame.service.logistics.BusTypePriceService;
import com.fgwater.frame.service.logistics.BusTypeService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service("busTypePriceService")
public class BusTypePriceServiceImpl extends BaseServiceImpl implements BusTypePriceService {

	@Resource
	private BusTypePriceMapper busTypePriceMapper;






	@Override
	public List<Map<String, String>>  query(Map<String, String> params) {
		return busTypePriceMapper.query(params);
	}


	public void deleteTable(List<BusTypePrice> busTypePrices) {
		for (BusTypePrice busTypePrice : busTypePrices) {
			JSONObject jo = JSONObject.fromObject(busTypePrice);
			Map<String, String> map = this.toMap(jo);
			busTypePriceMapper.deleteTable(map);
		}
	}







	public boolean saveOrUpdateBusType(BusTypePrice busTypePrice) {


			if (StrUtils.isNullOrEmpty(busTypePrice.getId())) {
				busTypePrice.setId(UUIDUtils.getUUID());
				busTypePriceMapper.insert(busTypePrice);
			} else {
				busTypePriceMapper.update(busTypePrice);
			}

		return true;
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
