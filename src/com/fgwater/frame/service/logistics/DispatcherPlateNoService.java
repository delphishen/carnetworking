package com.fgwater.frame.service.logistics;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.DispatcherPlateNo;

import java.util.List;
import java.util.Map;

public interface DispatcherPlateNoService extends BaseService {


    public boolean savedispatcherPlateNo(DispatcherPlateNo dispatcherPlateNo);

    public List<Map<String,String>> query(Map<String, String> params);


    public void deleteTable(List<DispatcherPlateNo> dispatcherPlateNos);

}

