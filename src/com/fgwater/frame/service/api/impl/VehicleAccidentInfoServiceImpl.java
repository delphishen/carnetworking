package com.fgwater.frame.service.api.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.api.VehicleAccidentInfoMapper;
import com.fgwater.frame.mapper.api.VehicleOilInfoMapper;
import com.fgwater.frame.model.api.VehicleAccidentInfo;
import com.fgwater.frame.model.api.VehicleOilInfo;
import com.fgwater.frame.service.api.VehicleAccidentInfoService;
import com.fgwater.frame.service.api.VehicleOilInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("vehicleAccidentInfoService")
public class VehicleAccidentInfoServiceImpl extends BaseServiceImpl implements VehicleAccidentInfoService {

	@Resource
	private VehicleAccidentInfoMapper vehicleAccidentInfoMapper;


    @Override
    public boolean saveOrUpdate(VehicleAccidentInfo vehicleAccidentInfo) {

        int count = 0;

        if (StrUtils.isNullOrEmpty(vehicleAccidentInfo.getId())){
            vehicleAccidentInfo.setId(UUIDUtils.getUUID());
            vehicleAccidentInfoMapper.insert(vehicleAccidentInfo);
        }else {
            vehicleAccidentInfoMapper.updatemodel(vehicleAccidentInfo);
        }
         return  count == 0;
    }

    @Override
    public List<Map<String, String>> query(Map<String, String> params) {
        return vehicleAccidentInfoMapper.query(params);
    }

    @Override
    public void delete(List<VehicleAccidentInfo> vehicleAccidentInfos) {

        for (VehicleAccidentInfo vehicleAccidentInfo : vehicleAccidentInfos) {
            this.vehicleAccidentInfoMapper.deletePhysical(vehicleAccidentInfo);
        }
    }


}
