package com.fgwater.frame.mapper.api;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.api.ApplyApproveInfo;
import com.fgwater.frame.model.api.InsuranceInfo;

import java.util.List;
import java.util.Map;

public interface ApplyApproveInfoMapper extends BaseMapper<ApplyApproveInfo> {


    @Paging
    List<Map<String,String>> query(Map<String, String> params);

}
