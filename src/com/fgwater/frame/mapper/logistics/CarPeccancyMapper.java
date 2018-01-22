package com.fgwater.frame.mapper.logistics;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.CarPeccancy;

import java.util.List;
import java.util.Map;

public interface CarPeccancyMapper extends BaseMapper<CarPeccancy> {


    @Paging
    public List<Map<String,String>> queryeccancy(Map<String, String> params);

    public void deleteTable(Map<String, String> map);

}
