package com.fgwater.frame.service.api.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.api.ApplyApproveInfoMapper;
import com.fgwater.frame.mapper.api.InsuranceInfoMapper;
import com.fgwater.frame.model.api.ApplyApproveInfo;
import com.fgwater.frame.model.api.InsuranceInfo;
import com.fgwater.frame.service.api.ApplyApproveInfoService;
import com.fgwater.frame.service.api.InsuranceInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("applyApproveInfoService")
public class ApplyApproveInfoServiceImpl extends BaseServiceImpl implements ApplyApproveInfoService {

	@Resource
	private ApplyApproveInfoMapper applyApproveInfoMapper;


    @Override
    public boolean saveOrUpdate(ApplyApproveInfo applyApproveInfo) {

        int count = 0;

        if (StrUtils.isNullOrEmpty(applyApproveInfo.getId())){
            applyApproveInfo.setId(UUIDUtils.getUUID());
            applyApproveInfoMapper.insert(applyApproveInfo);
        }else {
            applyApproveInfoMapper.updatemodel(applyApproveInfo);
        }
         return  count == 0;
    }

    @Override
    public List<Map<String, String>> query(Map<String, String> params) {
        return applyApproveInfoMapper.query(params);
    }

    @Override
    public void delete(List<ApplyApproveInfo> applyApproveInfos) {

        for (ApplyApproveInfo applyApproveInfo : applyApproveInfos) {
            this.applyApproveInfoMapper.deletePhysical(applyApproveInfo);
        }
    }


}
