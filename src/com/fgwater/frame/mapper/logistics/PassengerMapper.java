package com.fgwater.frame.mapper.logistics;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.Passenger;

import java.util.List;
import java.util.Map;

public interface PassengerMapper extends BaseMapper<Passenger> {


    @Paging
    public List<Map<String,String>> query(Map<String, String> params);


    public void deleteTable(Map<String, String> map);

    @Paging
    public List<Map<String,String>> queryPassengerById(Map<String, String> params);

    public  String findPhone(String userId);

    @Paging
    public List<Map<String,String>> queryByCompany(Map<String, String> params);


    Map<String,Object> findById(String id);

    int checkPhone(Passenger passenger);

    List<Map<String,String>> queryexcel(Map<String, String> map);

}



