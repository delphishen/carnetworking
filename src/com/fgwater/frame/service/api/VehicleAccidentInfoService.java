package com.fgwater.frame.service.api;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.api.VehicleAccidentInfo;
import com.fgwater.frame.model.api.VehicleOilInfo;

import java.util.List;
import java.util.Map;

public interface VehicleAccidentInfoService extends BaseService {


    boolean saveOrUpdate(VehicleAccidentInfo vehicleAccidentInfo);


    List<Map<String,String>> query(Map<String, String> params);

    void delete(List<VehicleAccidentInfo> vehicleAccidentInfos);

}
