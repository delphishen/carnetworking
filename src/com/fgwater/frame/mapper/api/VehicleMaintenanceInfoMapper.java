package com.fgwater.frame.mapper.api;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.api.AcrapApproveInfo;
import com.fgwater.frame.model.api.VehicleMaintenanceInfo;

import java.util.List;
import java.util.Map;

public interface VehicleMaintenanceInfoMapper extends BaseMapper<VehicleMaintenanceInfo> {


    @Paging
    List<Map<String,String>> query(Map<String, String> params);

}
