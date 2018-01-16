package com.fgwater.frame.service.logistics;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.DriverRota;

import java.util.List;
import java.util.Map;

public interface DriverRotaService extends BaseService {


    public boolean saveOrUpdateBusType(DriverRota driverRota);

    public List<Map<String, String>> query(Map<String, String> params);

    public void deleteTable(List<DriverRota> driverRotas);




}

