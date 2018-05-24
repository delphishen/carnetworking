package com.fgwater.frame.service.api;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.api.MaintenanceInfo;
import com.fgwater.frame.model.system.Attach;

import java.util.List;
import java.util.Map;

public interface MaintenanceInfoService extends BaseService {


    boolean saveOrUpdate(MaintenanceInfo maintenanceInfo);


    List<Map<String,String>> query(Map<String, String> params);

    void delete(List<MaintenanceInfo> maintenanceInfos);

}
