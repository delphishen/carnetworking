package com.fgwater.frame.service.api;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.api.InsuranceInfo;
import com.fgwater.frame.model.api.MaintenanceInfo;

import java.util.List;
import java.util.Map;

public interface InsuranceInfoService extends BaseService {


    boolean saveOrUpdate(InsuranceInfo insuranceInfo);


    List<Map<String,String>> query(Map<String, String> params);

    void delete(List<InsuranceInfo>  insuranceInfos);

}
