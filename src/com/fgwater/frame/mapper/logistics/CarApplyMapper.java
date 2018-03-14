package com.fgwater.frame.mapper.logistics;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.CarApply;

import java.util.List;
import java.util.Map;

public interface CarApplyMapper extends BaseMapper<CarApply> {


    @Paging
    List<Map<String,String>> query(Map<String, String> params);

    public void updateTable(CarApply carApply);

    public void insertlog(Map<String, String> map);

    @Paging
    List<Map<String,String>> queryinsanity(Map<String, String> params);

    @Paging
    List<Map<String,String>> queryapproveLog(Map<String, String> params);


    public void savecarApply(CarApply carApply);

    public  void insertdispatchlog(Map<String, String> map);

    @Paging
    public List<Map<String,String>> querydispatchLog(Map<String, String> params);


    @Paging
    public List<Map<String,String>> querydispatch(Map<String, String> params);

    @Paging
    public List<Map<String,String>> queryAllCarApply(Map<String, String> params);

    public void cancelcarApply(CarApply carApply);

    public void deleteTable(Map<String, String> map);

}
