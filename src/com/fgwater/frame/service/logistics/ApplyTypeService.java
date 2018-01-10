package com.fgwater.frame.service.logistics;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.BusType;

import java.util.List;
import java.util.Map;

public interface ApplyTypeService extends BaseService {


    public boolean saveOrUpdateBusType(ApplyType applyType);

    public List<Map<String, String>> query(Map<String, String> params);

    public void deleteTable(List<ApplyType> applyTypes);




}

