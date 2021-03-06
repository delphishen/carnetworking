package com.fgwater.frame.service.logistics;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.CarApply;

import java.util.List;
import java.util.Map;

public interface CarApplyService extends BaseService {


    public List<Map<String,String>> query(Map<String, String> params);

    public void updateTable(CarApply carApply);

    public List<Map<String,String>> queryinsanity(Map<String, String> params);

    public List<Map<String,String>> queryapproveLog(Map<String, String> params);

    public   boolean savecarApply(CarApply carApply);

    public List<Map<String,String>> querydispatchLog(Map<String, String> params);

    public List<Map<String,String>> querydispatch(Map<String, String> params);

    public  List<Map<String,String>> queryAllCarApply(Map<String, String> params);

    public void cancelcarApply(CarApply carApply);

    public void deletecarApply(List<CarApply> carApplies);

    public boolean insertcarApply(CarApply carApply);

    public Map<String,String> queryOrder(String carApplyNo);


    List<Map<String,String>> excelAllCarApply(Map<String, String> map);

}

