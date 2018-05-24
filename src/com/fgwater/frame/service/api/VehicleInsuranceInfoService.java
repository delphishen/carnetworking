package com.fgwater.frame.service.api;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.api.AcrapApproveInfo;
import com.fgwater.frame.model.api.VehicleInsuranceInfo;

import java.util.List;
import java.util.Map;

public interface VehicleInsuranceInfoService extends BaseService {


    boolean saveOrUpdate(VehicleInsuranceInfo vehicleInsuranceInfo);


    List<Map<String,String>> query(Map<String, String> params);

    void delete(List<VehicleInsuranceInfo> vehicleInsuranceInfos);

}
