package com.fgwater.frame.mapper.logistics;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.logistics.BusType;
import com.fgwater.frame.model.logistics.CarTypePrice;

import java.util.List;
import java.util.Map;

public interface CarTypePriceMapper extends BaseMapper<CarTypePrice> {



    @Paging
    List<Map<String,String>> query(Map<String, String> params);


}
