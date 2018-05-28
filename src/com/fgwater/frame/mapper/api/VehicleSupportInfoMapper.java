package com.fgwater.frame.mapper.api;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.api.VehicleInsuranceInfo;
import com.fgwater.frame.model.api.VehicleSupportInfo;

import java.util.List;
import java.util.Map;

public interface VehicleSupportInfoMapper extends BaseMapper<VehicleSupportInfo> {


    @Paging
    List<Map<String,String>> query(Map<String, String> params);

}
