package com.fgwater.frame.service.system;

import java.sql.ResultSet;
import java.util.List;
import java.util.Map;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.system.User;

public interface UserService extends BaseService {

	public List<Map<String, String>> query(Map<String, String> m);

	public List<User> getAll(Map<String, String> params);

	public User findByEmpId(String empId);

	public User getByName(String name);

	public boolean saveOrUpdate(User user);

	public void delete(List<User> users);
	
	public boolean resetPassword(User user);


	public List<User> getUserByFleetId(Map<String, String> params);

    public List<Map<String,Object>> findByFleetId(String fleetId);

    public Map<String,String> findByUserId(String currUserId);

	public List<Map<String, String>> queryManager(Map<String, String> params);

    public  List<Map<String,Object>> findAll();

}
