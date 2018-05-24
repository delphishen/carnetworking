package com.fgwater.frame.service.api;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.api.ApplyApproveInfo;
import com.fgwater.frame.model.api.InsuranceInfo;

import java.util.List;
import java.util.Map;

public interface ApplyApproveInfoService extends BaseService {


    boolean saveOrUpdate(ApplyApproveInfo applyApproveInfo);


    List<Map<String,String>> query(Map<String, String> params);

    void delete(List<ApplyApproveInfo> applyApproveInfos);

}
