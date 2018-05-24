package com.fgwater.frame.mapper.api;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.api.InsuranceInfo;
import com.fgwater.frame.model.api.VehicleQuotaInfo;

import java.util.List;
import java.util.Map;

public interface VehicleQuotaInfoMapper extends BaseMapper<VehicleQuotaInfo> {


    @Paging
    List<Map<String,String>> query(Map<String, String> params);

}
