package com.fgwater.frame.service.logistics;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.logistics.BusType;
import com.fgwater.frame.model.logistics.BusTypePrice;

import java.util.List;
import java.util.Map;

public interface BusTypePriceService extends BaseService {





    public boolean saveOrUpdateBusType(BusTypePrice busTypePrice);

    public List<Map<String, String>> query(Map<String, String> params);

    public void deleteTable(List<BusTypePrice> busTypePrices);






}

