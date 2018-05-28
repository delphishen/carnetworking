package com.fgwater.frame.service.api.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.api.VehicleOilInfoMapper;
import com.fgwater.frame.mapper.api.VehicleSupportInfoMapper;
import com.fgwater.frame.model.api.VehicleOilInfo;
import com.fgwater.frame.model.api.VehicleSupportInfo;
import com.fgwater.frame.service.api.VehicleOilInfoService;
import com.fgwater.frame.service.api.VehicleSupportInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("vehicleOilInfoService")
public class VehicleOilInfoServiceImpl extends BaseServiceImpl implements VehicleOilInfoService {

	@Resource
	private VehicleOilInfoMapper vehicleOilInfoMapper;


    @Override
    public boolean saveOrUpdate(VehicleOilInfo vehicleOilInfo) {

        int count = 0;

        if (StrUtils.isNullOrEmpty(vehicleOilInfo.getId())){
            vehicleOilInfo.setId(UUIDUtils.getUUID());
            vehicleOilInfoMapper.insert(vehicleOilInfo);
        }else {
            vehicleOilInfoMapper.updatemodel(vehicleOilInfo);
        }
         return  count == 0;
    }

    @Override
    public List<Map<String, String>> query(Map<String, String> params) {
        return vehicleOilInfoMapper.query(params);
    }

    @Override
    public void delete(List<VehicleOilInfo> vehicleOilInfos) {

        for (VehicleOilInfo vehicleOilInfo : vehicleOilInfos) {
            this.vehicleOilInfoMapper.deletePhysical(vehicleOilInfo);
        }
    }


}
