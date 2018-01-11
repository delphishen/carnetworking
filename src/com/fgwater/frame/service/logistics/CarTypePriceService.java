package com.fgwater.frame.service.logistics;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.logistics.BusType;
import com.fgwater.frame.model.logistics.CarTypePrice;

import java.util.List;
import java.util.Map;

public interface CarTypePriceService extends BaseService {






    public boolean saveOrUpdate(CarTypePrice carTypePrice);


    public  List<Map<String,String>> query(Map<String, String> params);

    public   void deleteTable(List<CarTypePrice> carTypePrices);

}

