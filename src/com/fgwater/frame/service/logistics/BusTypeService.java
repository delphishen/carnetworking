package com.fgwater.frame.service.logistics;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.logistics.BusType;
import com.fgwater.frame.model.logistics.DriverType;

import java.util.List;
import java.util.Map;

public interface BusTypeService extends BaseService {





    public boolean saveOrUpdateBusType(BusType busType);

    public List<Map<String, String>> query(Map<String, String> params);

    public void deleteTable(List<BusType> busTypes);


    public List<BusType> getAll(Map<String, String> params);

}

