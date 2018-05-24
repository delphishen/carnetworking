package com.fgwater.frame.mapper.api;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.api.ApplyApproveInfo;
import com.fgwater.frame.model.api.DeployApproveInfo;

import java.util.List;
import java.util.Map;

public interface DeployApproveInfoMapper extends BaseMapper<DeployApproveInfo> {


    @Paging
    List<Map<String,String>> query(Map<String, String> params);

}
