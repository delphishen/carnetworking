package com.fgwater.frame.mapper.api;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.api.AcrapApproveInfo;
import com.fgwater.frame.model.api.VehicleInsuranceInfo;

import java.util.List;
import java.util.Map;

public interface VehicleInsuranceInfoMapper extends BaseMapper<VehicleInsuranceInfo> {


    @Paging
    List<Map<String,String>> query(Map<String, String> params);

}
