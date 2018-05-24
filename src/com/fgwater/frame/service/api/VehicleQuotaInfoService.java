package com.fgwater.frame.service.api;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.api.InsuranceInfo;
import com.fgwater.frame.model.api.VehicleQuotaInfo;

import java.util.List;
import java.util.Map;

public interface VehicleQuotaInfoService extends BaseService {


    boolean saveOrUpdate(VehicleQuotaInfo vehicleQuotaInfo);


    List<Map<String,String>> query(Map<String, String> params);

    void delete(List<VehicleQuotaInfo> vehicleQuotaInfos);

}
