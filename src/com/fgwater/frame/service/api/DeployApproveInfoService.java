package com.fgwater.frame.service.api;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.api.ApplyApproveInfo;
import com.fgwater.frame.model.api.DeployApproveInfo;

import java.util.List;
import java.util.Map;

public interface DeployApproveInfoService extends BaseService {


    boolean saveOrUpdate(DeployApproveInfo deployApproveInfo);


    List<Map<String,String>> query(Map<String, String> params);

    void delete(List<DeployApproveInfo> deployApproveInfos);

}
