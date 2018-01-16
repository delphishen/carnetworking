package com.fgwater.frame.service.logistics;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.logistics.DispatcherDriver;
import com.fgwater.frame.model.logistics.DispatcherPlateNo;

import java.util.List;
import java.util.Map;

public interface DispatcherDriverService extends BaseService {


    public boolean savedispatcherDriver(DispatcherDriver dispatcherDriver);

    public List<Map<String,String>> query(Map<String, String> params);


    public void deleteTable(List<DispatcherDriver> dispatcherDrivers);
}

