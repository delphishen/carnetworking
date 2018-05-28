package com.fgwater.frame.service.api;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.api.AcrapApproveInfo;
import com.fgwater.frame.model.api.VehicleMaintenanceInfo;

import java.util.List;
import java.util.Map;

public interface VehicleMaintenanceInfoService extends BaseService {


    boolean saveOrUpdate(VehicleMaintenanceInfo vehicleMaintenanceInfo);


    List<Map<String,String>> query(Map<String, String> params);

    void delete(List<VehicleMaintenanceInfo> vehicleMaintenanceInfos);

}
