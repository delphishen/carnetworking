package com.fgwater.frame.service.api.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.api.VehicleInsuranceInfoMapper;
import com.fgwater.frame.model.api.AcrapApproveInfo;
import com.fgwater.frame.model.api.VehicleInsuranceInfo;
import com.fgwater.frame.service.api.VehicleInsuranceInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("vehicleInsuranceInfoService")
public class VehicleInsuranceInfoServiceImpl extends BaseServiceImpl implements VehicleInsuranceInfoService {

	@Resource
	private VehicleInsuranceInfoMapper vehicleInsuranceInfoMapper ;


    @Override
    public boolean saveOrUpdate(VehicleInsuranceInfo vehicleInsuranceInfo) {

        int count = 0;

        if (StrUtils.isNullOrEmpty(vehicleInsuranceInfo.getId())){
            vehicleInsuranceInfo.setId(UUIDUtils.getUUID());
            vehicleInsuranceInfoMapper.insert(vehicleInsuranceInfo);
        }else {
            vehicleInsuranceInfoMapper.updatemodel(vehicleInsuranceInfo);
        }
         return  count == 0;
    }

    @Override
    public List<Map<String, String>> query(Map<String, String> params) {
        return vehicleInsuranceInfoMapper.query(params);
    }

    @Override
    public void delete(List<VehicleInsuranceInfo> vehicleInsuranceInfos) {

        for (VehicleInsuranceInfo vehicleInsuranceInfo : vehicleInsuranceInfos) {
            this.vehicleInsuranceInfoMapper.deletePhysical(vehicleInsuranceInfo);
        }
    }


}
