package com.fgwater.frame.service.api;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.api.InsuranceInfo;
import com.fgwater.frame.model.api.OilStationInfo;

import java.util.List;
import java.util.Map;

public interface OilStationInfoService extends BaseService {


    boolean saveOrUpdate(OilStationInfo oilStationInfo);


    List<Map<String,String>> query(Map<String, String> params);

    void delete(List<OilStationInfo> oilStationInfos);

}
