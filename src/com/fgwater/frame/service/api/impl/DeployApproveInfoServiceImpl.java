package com.fgwater.frame.service.api.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.api.ApplyApproveInfoMapper;
import com.fgwater.frame.mapper.api.DeployApproveInfoMapper;
import com.fgwater.frame.model.api.ApplyApproveInfo;
import com.fgwater.frame.model.api.DeployApproveInfo;
import com.fgwater.frame.service.api.ApplyApproveInfoService;
import com.fgwater.frame.service.api.DeployApproveInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("deployApproveInfoService")
public class DeployApproveInfoServiceImpl extends BaseServiceImpl implements DeployApproveInfoService {

	@Resource
	private DeployApproveInfoMapper deployApproveInfoMapper;


    @Override
    public boolean saveOrUpdate(DeployApproveInfo deployApproveInfo) {

        int count = 0;

        if (StrUtils.isNullOrEmpty(deployApproveInfo.getId())){
            deployApproveInfo.setId(UUIDUtils.getUUID());
            deployApproveInfoMapper.insert(deployApproveInfo);
        }else {
            deployApproveInfoMapper.updatemodel(deployApproveInfo);
        }
         return  count == 0;
    }

    @Override
    public List<Map<String, String>> query(Map<String, String> params) {
        return deployApproveInfoMapper.query(params);
    }

    @Override
    public void delete(List<DeployApproveInfo> deployApproveInfos) {

        for (DeployApproveInfo deployApproveInfo : deployApproveInfos) {
            this.deployApproveInfoMapper.deletePhysical(deployApproveInfo);
        }
    }


}
