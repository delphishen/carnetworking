package com.fgwater.frame.mapper.logistics;

import java.util.List;
import java.util.Map;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.logistics.Truck;

public interface TruckMapper extends BaseMapper<Truck> {

	@Paging
	public List<Map<String, String>> query(Map<String, String> params);

	public List<Truck> getAll(Map<String, String> params);

	public void saveTable(Map<String, String> params);

	public void updateTable(Map<String, String> params);

	public void deleteTable(Map<String, String> params);

	public int checkPlateNumber(Map<String, String> params);

    @Paging
	public  List<Map<String,String>> queryTruckDispatcher(Map<String, String> params);

    public Map<String,Object> queryCarTyoe(String plateNoId);

}
