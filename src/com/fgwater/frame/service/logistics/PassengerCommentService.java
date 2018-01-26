package com.fgwater.frame.service.logistics;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.logistics.ApplyType;

import java.util.List;
import java.util.Map;

public interface PassengerCommentService extends BaseService {


    public List<Map<String,String>> query(Map<String, String> params);


}

