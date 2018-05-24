package com.fgwater.frame.mapper.logistics;

import java.util.List;
import java.util.Map;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.logistics.Customer;

public interface CustomerMapper extends BaseMapper<Customer> {

	@Paging
	public List<Map<String, String>> query(Map<String, String> params);

	public List<Customer> getAll(Map<String, String> params);

	public void saveTable(Map<String, String> params);

	public void updateTable(Map<String, String> params);

	public void deleteTable(Map<String, String> params);
	
	public int checkName(Map<String, String> params);

    @Paging
	public  List<Map<String,String>> queryDriverDispatcher(Map<String, String> params);

    public Map<String,Object> queryById(String driverId);

    int checkById(Map<String, String> map);

    List<Map<String,String>> queryexcel(Map<String, String> map);

    @Paging
    List<Map<String,String>> queryByUserId(Map<String, String> m);

}
