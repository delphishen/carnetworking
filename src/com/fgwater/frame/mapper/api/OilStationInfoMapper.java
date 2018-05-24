package com.fgwater.frame.mapper.api;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.api.InsuranceInfo;
import com.fgwater.frame.model.api.OilStationInfo;

import java.util.List;
import java.util.Map;

public interface OilStationInfoMapper extends BaseMapper<OilStationInfo> {


    @Paging
    List<Map<String,String>> query(Map<String, String> params);

}
