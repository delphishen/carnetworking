package com.fgwater.frame.mapper.logistics;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.logistics.BusType;
import com.fgwater.frame.model.logistics.BusTypePrice;

import java.util.List;
import java.util.Map;

public interface BusTypePriceMapper extends BaseMapper<BusTypePrice> {


    @Paging
    public List<Map<String, String>> query(Map<String, String> params);


    public void deleteTable(Map<String, String> map);


    List<Map<String,Object>> queryBusTypePriceList(Map<String, String> params);


    int checkName(BusTypePrice busTypePrice);

    int checkNameById(BusTypePrice busTypePrice);

}
