package com.fgwater.frame.service.logistics;

import java.util.List;
import java.util.Map;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.logistics.Truck;

public interface TruckService extends BaseService {

	public List<Map<String, String>> query(Map<String, String> m);

	public List<Truck> getAll(Map<String, String> params);

	public boolean saveOrUpdate(Truck truck);

	public void delete(List<Truck> truck);

    public List<Map<String,String>> queryTruckDispatcher(Map<String, String> params);

    public  Map<String,Object> queryCarTyoe(String plateNoId);

	public List<Map<String,String>> queryTruckDispatcherByRoot(Map<String, String> params);

	List<Map<String,String>> queryExcel(Map<String, String> map);


}
