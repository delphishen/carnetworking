package com.fgwater.frame.mapper.api;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.api.VehicleAccidentInfo;
import com.fgwater.frame.model.api.VehicleOilInfo;

import java.util.List;
import java.util.Map;

public interface VehicleAccidentInfoMapper extends BaseMapper<VehicleAccidentInfo> {


    @Paging
    List<Map<String,String>> query(Map<String, String> params);

}
