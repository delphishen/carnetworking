package com.fgwater.frame.service.logistics;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.Passenger;

import java.util.List;
import java.util.Map;

public interface PassengerService extends BaseService {


    public   boolean saveOrUpdateBusType(Passenger passenger);

    public List<Map<String ,String>> query(Map<String, String> params);


    public void deleteTable(List<Passenger> passengers);

    public List<Map<String ,String>> queryPassengerById(Map<String, String> params);


}

