package com.fgwater.frame.mapper.logistics;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.PassengerComment;

import java.util.List;
import java.util.Map;

public interface PassengerCommentMapper extends BaseMapper<PassengerComment> {


    @Paging
    public List<Map<String,String>> query(Map<String, String> params);



}
