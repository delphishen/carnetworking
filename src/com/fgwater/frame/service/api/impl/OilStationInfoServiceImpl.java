package com.fgwater.frame.service.api.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.api.InsuranceInfoMapper;
import com.fgwater.frame.mapper.api.OilStationInfoMapper;
import com.fgwater.frame.model.api.InsuranceInfo;
import com.fgwater.frame.model.api.OilStationInfo;
import com.fgwater.frame.service.api.InsuranceInfoService;
import com.fgwater.frame.service.api.OilStationInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("oilStationInfoService")
public class OilStationInfoServiceImpl extends BaseServiceImpl implements OilStationInfoService {

	@Resource
	private OilStationInfoMapper oilStationInfoMapper;


    @Override
    public boolean saveOrUpdate(OilStationInfo oilStationInfo) {

        int count = 0;

        if (StrUtils.isNullOrEmpty(oilStationInfo.getId())){
            oilStationInfo.setId(UUIDUtils.getUUID());
            oilStationInfoMapper.insert(oilStationInfo);
        }else {
            oilStationInfoMapper.updatemodel(oilStationInfo);
        }
         return  count == 0;
    }

    @Override
    public List<Map<String, String>> query(Map<String, String> params) {
        return oilStationInfoMapper.query(params);
    }

    @Override
    public void delete(List<OilStationInfo>  oilStationInfos) {

        for (OilStationInfo oilStationInfo : oilStationInfos) {
            this.oilStationInfoMapper.deletePhysical(oilStationInfo);
        }
    }


}
