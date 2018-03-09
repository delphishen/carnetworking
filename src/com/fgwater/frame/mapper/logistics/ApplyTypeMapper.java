package com.fgwater.frame.mapper.logistics;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.BusType;

import java.util.List;
import java.util.Map;

public interface ApplyTypeMapper extends BaseMapper<ApplyType> {


    @Paging
    public List<Map<String, String>> query(Map<String, String> params);


    public void deleteTable(Map<String, String> map);


    public int chekById(ApplyType applyType);

}
