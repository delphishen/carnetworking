package com.fgwater.frame.service.logistics;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.logistics.BusType;
import com.fgwater.frame.model.logistics.Customer;
import com.fgwater.frame.model.logistics.DriverType;

import java.util.List;
import java.util.Map;

public interface DriverTypeService extends BaseService {


    public List<Map<String, String>> query(Map<String, String> params);

    public boolean saveOrUpdate(DriverType driverType);





    public   void delete(DriverType driverType);

    public void deleteTable(List<DriverType> driverTypes);

    public  List<DriverType> getAll(Map<String, String> params);

}

