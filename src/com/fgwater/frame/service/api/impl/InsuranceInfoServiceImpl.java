package com.fgwater.frame.service.api.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.api.InsuranceInfoMapper;
import com.fgwater.frame.mapper.api.MaintenanceInfoMapper;
import com.fgwater.frame.model.api.InsuranceInfo;
import com.fgwater.frame.model.api.MaintenanceInfo;
import com.fgwater.frame.service.api.InsuranceInfoService;
import com.fgwater.frame.service.api.MaintenanceInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("insuranceInfoService")
public class InsuranceInfoServiceImpl extends BaseServiceImpl implements InsuranceInfoService {

	@Resource
	private InsuranceInfoMapper  insuranceInfoMapper;


    @Override
    public boolean saveOrUpdate(InsuranceInfo insuranceInfo) {

        int count = 0;

        if (StrUtils.isNullOrEmpty(insuranceInfo.getId())){
            insuranceInfo.setId(UUIDUtils.getUUID());
            insuranceInfoMapper.insert(insuranceInfo);
        }else {
            insuranceInfoMapper.updatemodel(insuranceInfo);
        }
         return  count == 0;
    }

    @Override
    public List<Map<String, String>> query(Map<String, String> params) {
        return insuranceInfoMapper.query(params);
    }

    @Override
    public void delete(List<InsuranceInfo> insuranceInfos) {

        for (InsuranceInfo insuranceInfo : insuranceInfos) {
            this.insuranceInfoMapper.deletePhysical(insuranceInfo);
        }
    }


}
