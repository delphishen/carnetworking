package com.fgwater.frame.service.api;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.api.VehicleOilInfo;
import com.fgwater.frame.model.api.VehicleSupportInfo;

import java.util.List;
import java.util.Map;

public interface VehicleOilInfoService extends BaseService {


    boolean saveOrUpdate(VehicleOilInfo vehicleOilInfo);


    List<Map<String,String>> query(Map<String, String> params);

    void delete(List<VehicleOilInfo> vehicleOilInfos);

}
