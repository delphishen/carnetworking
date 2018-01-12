package com.fgwater.frame.service.logistics.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.logistics.ApplyTypeMapper;
import com.fgwater.frame.mapper.logistics.DispatcherPlateNoMapper;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.service.logistics.ApplyTypeService;
import com.fgwater.frame.service.logistics.DispatcherPlateNoService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service("dispatcherPlateNoService")
public class DispatcherPlateNoServiceImpl extends BaseServiceImpl implements DispatcherPlateNoService {

	@Resource
	private DispatcherPlateNoMapper dispatcherPlateNoMapper;




















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
