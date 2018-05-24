package com.fgwater.frame.service.api;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.api.AcrapApproveInfo;
import com.fgwater.frame.model.api.ApplyApproveInfo;

import java.util.List;
import java.util.Map;

public interface AcrapApproveInfoService extends BaseService {


    boolean saveOrUpdate(AcrapApproveInfo acrapApproveInfo);


    List<Map<String,String>> query(Map<String, String> params);

    void delete(List<AcrapApproveInfo>  acrapApproveInfos);

}
