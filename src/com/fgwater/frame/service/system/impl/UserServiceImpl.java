package com.fgwater.frame.service.system.impl;

import java.sql.ResultSet;
import java.util.*;

import javax.annotation.Resource;

import com.bolang.carnetworking.sms.SMSConfig;
import com.bolang.carnetworking.sms.SMSUtil;
import net.sf.json.JSONObject;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.SessionUtils;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.system.UserMapper;
import com.fgwater.frame.model.system.User;
import com.fgwater.frame.service.system.UserService;

@Service("userService")
public class UserServiceImpl extends BaseServiceImpl implements UserService {

	@Resource
	private UserMapper userMapper;






	public List<Map<String, String>> query(Map<String, String> m) {
		List<Map<String,String>> mapList = new ArrayList<>();


		User user = SessionUtils.getCurrUser();
		if (("10").equals(user.getRoleId())){
			if (user.getIsAdmin() != 1) {
				m.put("isAdmin", "0");
			}
			mapList = this.userMapper.query(m);
			for (Map<String,String>  map :mapList){
//				System.out.println("=====输出==="+map.get("fatherId"));
//				System.out.println("=====输出==="+map.get("fatherId").length());
				if (map.get("roleId").equals("40")){

						Map<String,String > stringMap = this.userMapper.findByFatherId(map.get("fatherId"));
						map.put("fatherName",stringMap.get("fatherName"));

				}else {
					map.put("fatherName",null);
				}


			}

			return mapList;
		}else {
			m.put("userId",user.getId());
			mapList = this.userMapper.queryByCompany(m);

			for (Map<String,String>  map :mapList){

				if (map.get("roleId").equals("40")){

					Map<String,String > stringMap = this.userMapper.findByFatherId(map.get("fatherId"));
					map.put("fatherName",stringMap.get("fatherName"));

				}else {
					map.put("fatherName",null);
				}

			}
			return  mapList;
		}


	}

	public User findByEmpId(String empId) {
		return this.userMapper.findByEmpId(empId);
	}

	public List<User> getAll(Map<String, String> params) {
		return userMapper.getAll(params);
	}

	public User getByName(String name) {
		return this.userMapper.getByName(name);
	}

	public boolean saveOrUpdate(User user) {
		JSONObject jo = JSONObject.fromObject(user);
		Map<String, String> map = this.toMap(jo);

		int count = this.userMapper.checkName(map);

		if (count == 0) {
			if(user.getRemark().equals("管理员")){
				System.out.println(user.getRemark()+"111111111111111111");
				map.put("isAdmin","1");

			}else {
				System.out.println(user.getRemark()+"00000000000000000");
				map.put("isAdmin","0");
			}
			if (StrUtils.isNullOrEmpty(map.get("id"))) {
				map.put("id", UUIDUtils.getUUID());
				String num = "123456";
//				Random random = new Random();
//				for (int i = 0; i < 6; i++) {
//					num += random.nextInt(10);
//				}
				map.put("password", num);
				userMapper.saveUser(this.buildInsert(map));
			} else {
				userMapper.updateUser(this.buildUpdate(map));
			}
		}
		return count == 0;
	}
	
	
	
	public boolean resetPassword(User user) {






		JSONObject jo = JSONObject.fromObject(user);
		Map<String, String> map = this.toMap(jo);		
	//	System.out.println("resetPassword==="+jo.toString());
//				String num = "";
//				Random random = new Random();
//				for (int i = 0; i < 6; i++) {
//					num += random.nextInt(10);
//				}
//				map.put("password", num);
				userMapper.resetPassword(this.buildUpdate(map));
				System.out.println(this.buildUpdate(map));
			
		
		return true;
}

	@Override
	public List<User> getUserByFleetId(Map<String, String> params) {
		return this.userMapper.getUserByFleetId(params);
	}

	@Override
	public List<Map<String,Object>> findByFleetId(String fleetId) {
		return this.userMapper.findByFleetId(fleetId);
	}

	@Override
	public Map<String, String> findByUserId(String currUserId) {
		return this.userMapper.findByUserId(currUserId);
	}

	@Override
	public List<Map<String, String>> queryManager(Map<String, String> params) {
		return this.userMapper.queryManager(params);
	}

	@Override
	public List<Map<String,Object>> findAll() {
		return this.userMapper.findAll();
	}


	public void delete(List<User> users) throws Exception {
		for (User user : users) {
			JSONObject jo = JSONObject.fromObject(user);
			Map<String, String> map = this.toMap(jo);
			int count = userMapper.checkFatherId(map);
			if (count >0){
				throw  new Exception ();
			}
			userMapper.deleteUser(map);
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

	public Map<String, String> buildInsert(Map<String, String> map) {
		map.put("creator", SessionUtils.getCurrUser().getLoginName());
		map.put("crTime", StrUtils.getCurrFormatTime());
		map.put("modifier", SessionUtils.getCurrUser().getLoginName());
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
