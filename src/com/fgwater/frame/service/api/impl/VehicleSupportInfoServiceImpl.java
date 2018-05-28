package com.fgwater.frame.service.api.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.api.VehicleInsuranceInfoMapper;
import com.fgwater.frame.mapper.api.VehicleSupportInfoMapper;
import com.fgwater.frame.model.api.VehicleInsuranceInfo;
import com.fgwater.frame.model.api.VehicleSupportInfo;
import com.fgwater.frame.service.api.VehicleInsuranceInfoService;
import com.fgwater.frame.service.api.VehicleSupportInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("vehicleSupportInfoService")
public class VehicleSupportInfoServiceImpl extends BaseServiceImpl implements VehicleSupportInfoService {

	@Resource
	private VehicleSupportInfoMapper vehicleSupportInfoMapper;


    @Override
    public boolean saveOrUpdate(VehicleSupportInfo vehicleSupportInfo) {

        int count = 0;

        if (StrUtils.isNullOrEmpty(vehicleSupportInfo.getId())){
            vehicleSupportInfo.setId(UUIDUtils.getUUID());
            vehicleSupportInfoMapper.insert(vehicleSupportInfo);
        }else {
            vehicleSupportInfoMapper.updatemodel(vehicleSupportInfo);
        }
         return  count == 0;
    }

    @Override
    public List<Map<String, String>> query(Map<String, String> params) {
        return vehicleSupportInfoMapper.query(params);
    }

    @Override
    public void delete(List<VehicleSupportInfo> vehicleSupportInfos) {

        for (VehicleSupportInfo vehicleSupportInfo : vehicleSupportInfos) {
            this.vehicleSupportInfoMapper.deletePhysical(vehicleSupportInfo);
        }
    }


}
