package com.fgwater.frame.service.logistics.impl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.SessionUtils;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.logistics.CustomerMapper;
import com.fgwater.frame.model.logistics.Customer;
import com.fgwater.frame.service.logistics.CustomerService;

@Service("customerService")
public class CustomerServiceImpl extends BaseServiceImpl implements CustomerService {

	@Resource
	private CustomerMapper customerMapper;

	public List<Map<String, String>> query(Map<String, String> m) {
		
		return this.customerMapper.query(m);
	}

	public List<Customer> getAll(Map<String, String> m) {
		
		//	JSONArray ja = JSONArray.fromObject(truckMapper.getAll(params));
		//	Object swap = ja;	
		//	System.out.println(swap.toString());

		return customerMapper.getAll(m);
	}

	
	public boolean saveOrUpdate(Customer customer) {
		JSONObject jo = JSONObject.fromObject(customer);
		Map<String, String> map = this.toMap(jo);
		int count = 0;

		count = this.customerMapper.checkName(map);

		if (count == 0) {
			if (StrUtils.isNullOrEmpty(map.get("id"))) {
				map.put("id", UUIDUtils.getUUID());
				customer.setId(UUIDUtils.getUUID());

				customerMapper.insert(customer);
			} else {
				customerMapper.update(customer);
			}
		}
		return count == 0;
	}

	public void delete(List<Customer> customers) {
		for (Customer customer : customers) {
			JSONObject jo = JSONObject.fromObject(customer);
			Map<String, String> map = this.toMap(jo);
			customerMapper.deleteTable(map);
		}
	}

	@Override
	public List<Map<String, String>> queryDriverDispatcher(Map<String, String> params) {
		return this.customerMapper.queryDriverDispatcher(params);
	}

	@Override
	public Map<String, Object> queryById(String driverId) {
		return this.customerMapper.queryById(driverId);
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

	public Map<String, String> buildInsert(Map<String, String> map) {
		map.put("creator", SessionUtils.getCurrUserId());
		map.put("crTime", StrUtils.getCurrFormatTime());
		map.put("modifier", SessionUtils.getCurrUserId());
		map.put("moTime", StrUtils.getCurrFormatTime());
		map.put("flag", "1");
		return map;
	}

	public Map<String, String> buildUpdate(Map<String, String> map) {
		map.put("modifier", SessionUtils.getCurrUserId());
		map.put("moTime", StrUtils.getCurrFormatTime());
		return map;
	}
}
