package com.fgwater.frame.service.api.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.api.AcrapApproveInfoMapper;
import com.fgwater.frame.mapper.api.ApplyApproveInfoMapper;
import com.fgwater.frame.model.api.AcrapApproveInfo;
import com.fgwater.frame.model.api.ApplyApproveInfo;
import com.fgwater.frame.service.api.AcrapApproveInfoService;
import com.fgwater.frame.service.api.ApplyApproveInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("acrapApproveInfoService")
public class AcrapApproveInfoServiceImpl extends BaseServiceImpl implements AcrapApproveInfoService {

	@Resource
	private AcrapApproveInfoMapper acrapApproveInfoMapper;


    @Override
    public boolean saveOrUpdate(AcrapApproveInfo acrapApproveInfo) {

        int count = 0;

        if (StrUtils.isNullOrEmpty(acrapApproveInfo.getId())){
            acrapApproveInfo.setId(UUIDUtils.getUUID());
            acrapApproveInfoMapper.insert(acrapApproveInfo);
        }else {
            acrapApproveInfoMapper.updatemodel(acrapApproveInfo);
        }
         return  count == 0;
    }

    @Override
    public List<Map<String, String>> query(Map<String, String> params) {
        return acrapApproveInfoMapper.query(params);
    }

    @Override
    public void delete(List<AcrapApproveInfo> acrapApproveInfos) {

        for (AcrapApproveInfo acrapApproveInfo : acrapApproveInfos) {
            this.acrapApproveInfoMapper.deletePhysical(acrapApproveInfo);
        }
    }


}
