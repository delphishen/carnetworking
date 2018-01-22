package com.fgwater.frame.service.logistics;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.CarPeccancy;

import java.util.List;
import java.util.Map;

public interface CarPeccancyService extends BaseService {


    public boolean saveOrUpdatePeccancy(CarPeccancy carPeccancy);

    public List<Map<String,String>> queryeccancy(Map<String, String> params);


    public void deleteTable(List<CarPeccancy> carPeccancies);

}

