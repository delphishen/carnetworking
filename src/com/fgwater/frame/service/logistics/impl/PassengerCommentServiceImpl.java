package com.fgwater.frame.service.logistics.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.logistics.ApplyTypeMapper;
import com.fgwater.frame.mapper.logistics.PassengerCommentMapper;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.PassengerComment;
import com.fgwater.frame.service.logistics.ApplyTypeService;
import com.fgwater.frame.service.logistics.PassengerCommentService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service("passengerCommentService")
public class PassengerCommentServiceImpl extends BaseServiceImpl implements PassengerCommentService {

	@Resource
	private PassengerCommentMapper passengerCommentMapper;









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
	public List<Map<String, String>> query(Map<String, String> params) {
		return this.passengerCommentMapper.query(params);
	}

	@Override
	public void deleteTable(List<PassengerComment> passengerComments) {
		for (PassengerComment passengerComment : passengerComments) {
			JSONObject jo = JSONObject.fromObject(passengerComment);
			Map<String, String> map = this.toMap(jo);
			this.passengerCommentMapper.deleteTable(map);
		}
	}
}
