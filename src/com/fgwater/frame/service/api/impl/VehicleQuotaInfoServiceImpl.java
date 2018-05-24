package com.fgwater.frame.service.api.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.api.InsuranceInfoMapper;
import com.fgwater.frame.mapper.api.VehicleQuotaInfoMapper;
import com.fgwater.frame.model.api.InsuranceInfo;
import com.fgwater.frame.model.api.VehicleQuotaInfo;
import com.fgwater.frame.service.api.InsuranceInfoService;
import com.fgwater.frame.service.api.VehicleQuotaInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("vehicleQuotaInfoService")
public class VehicleQuotaInfoServiceImpl extends BaseServiceImpl implements VehicleQuotaInfoService {

	@Resource
	private VehicleQuotaInfoMapper vehicleQuotaInfoMapper;


    @Override
    public boolean saveOrUpdate(VehicleQuotaInfo vehicleQuotaInfo) {

        int count = 0;

        if (StrUtils.isNullOrEmpty(vehicleQuotaInfo.getId())){
            vehicleQuotaInfo.setId(UUIDUtils.getUUID());
            vehicleQuotaInfoMapper.insert(vehicleQuotaInfo);
        }else {
            vehicleQuotaInfoMapper.updatemodel(vehicleQuotaInfo);
        }
         return  count == 0;
    }

    @Override
    public List<Map<String, String>> query(Map<String, String> params) {
        return vehicleQuotaInfoMapper.query(params);
    }

    @Override
    public void delete(List<VehicleQuotaInfo> vehicleQuotaInfos) {

        for (VehicleQuotaInfo vehicleQuotaInfo : vehicleQuotaInfos) {
            this.vehicleQuotaInfoMapper.deletePhysical(vehicleQuotaInfo);
        }
    }


}
