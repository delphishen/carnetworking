package com.fgwater.frame.mapper.system;

import java.sql.ResultSet;
import java.util.List;
import java.util.Map;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.system.User;

public interface UserMapper extends BaseMapper<User> {

	@Paging
	public List<Map<String, String>> query(Map<String, String> params);

	public List<User> getAll(Map<String, String> params);

	public User findByEmpId(String empId);

	public User getByName(String name);

	public int checkName(Map<String, String> params);

	public void saveUser(Map<String, String> params);

	public void updateUser(Map<String, String> params);

	public void deleteUser(Map<String, String> params);
	
	public void resetPassword(Map<String, String> params);

	public List<User> getUserById(String id);

	public List<User> getUserByRemark(String id);

	public List<User> getUserByFleetId(Map<String, String> params);

	public List<Map<String,Object>> getUserByRemarkApprove(String id);

    public List<Map<String,Object>> findByFleetId(String fleetId);

    public Map<String,String> findByUserId(String currUserId);

    @Paging
    public List<Map<String,String>> queryByCompany(Map<String, String> m);

    @Paging
    public 	List<Map<String,Object>> getUserByRemarkApprove30(String id);

    @Paging
    public 	List<Map<String,Object>> getUserByRemarkApprove40(String id);

    @Paging
    public List<Map<String,String>> queryManager(Map<String, String> params);

    public Map<String,String> findByFatherId(String fatherId);

	@Paging
     public List<Map<String,Object>> getUserByRemarkApprove4(String id);

    public List<Map<String,Object>> findAll();

}
