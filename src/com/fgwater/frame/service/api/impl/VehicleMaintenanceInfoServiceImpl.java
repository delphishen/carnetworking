package com.fgwater.frame.service.api.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.api.AcrapApproveInfoMapper;
import com.fgwater.frame.mapper.api.VehicleMaintenanceInfoMapper;
import com.fgwater.frame.model.api.AcrapApproveInfo;
import com.fgwater.frame.model.api.VehicleMaintenanceInfo;
import com.fgwater.frame.service.api.AcrapApproveInfoService;
import com.fgwater.frame.service.api.VehicleMaintenanceInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("vehicleMaintenanceInfoService")
public class VehicleMaintenanceInfoServiceImpl extends BaseServiceImpl implements VehicleMaintenanceInfoService {

	@Resource
	private VehicleMaintenanceInfoMapper vehicleMaintenanceInfoMapper;


    @Override
    public boolean saveOrUpdate(VehicleMaintenanceInfo vehicleMaintenanceInfo) {

        int count = 0;

        if (StrUtils.isNullOrEmpty(vehicleMaintenanceInfo.getId())){
            vehicleMaintenanceInfo.setId(UUIDUtils.getUUID());
            vehicleMaintenanceInfoMapper.insert(vehicleMaintenanceInfo);
        }else {
            vehicleMaintenanceInfoMapper.updatemodel(vehicleMaintenanceInfo);
        }
         return  count == 0;
    }

    @Override
    public List<Map<String, String>> query(Map<String, String> params) {
        return vehicleMaintenanceInfoMapper.query(params);
    }

    @Override
    public void delete(List<VehicleMaintenanceInfo> vehicleMaintenanceInfos) {

        for (VehicleMaintenanceInfo vehicleMaintenanceInfo : vehicleMaintenanceInfos) {
            this.vehicleMaintenanceInfoMapper.deletePhysical(vehicleMaintenanceInfo);
        }
    }


}
