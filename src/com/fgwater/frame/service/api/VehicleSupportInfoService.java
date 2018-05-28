package com.fgwater.frame.service.api;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.api.VehicleInsuranceInfo;
import com.fgwater.frame.model.api.VehicleSupportInfo;

import java.util.List;
import java.util.Map;

public interface VehicleSupportInfoService extends BaseService {


    boolean saveOrUpdate(VehicleSupportInfo vehicleSupportInfo);


    List<Map<String,String>> query(Map<String, String> params);

    void delete(List<VehicleSupportInfo> vehicleSupportInfos);

}
