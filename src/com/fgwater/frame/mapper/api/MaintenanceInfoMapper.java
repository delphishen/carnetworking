package com.fgwater.frame.mapper.api;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.api.MaintenanceInfo;
import com.fgwater.frame.model.system.Attach;

import java.util.List;
import java.util.Map;

public interface MaintenanceInfoMapper extends BaseMapper<MaintenanceInfo> {


    @Paging
    List<Map<String,String>> query(Map<String, String> params);

}
