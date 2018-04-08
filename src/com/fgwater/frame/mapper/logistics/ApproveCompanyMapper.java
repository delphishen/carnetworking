package com.fgwater.frame.mapper.logistics;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.logistics.ApproveCompany;
import com.fgwater.frame.model.logistics.DispatcherDriver;
import com.fgwater.frame.model.logistics.DispatcherPlateNo;

import java.util.List;
import java.util.Map;

public interface ApproveCompanyMapper extends BaseMapper<ApproveCompany> {


    @Paging
    public List<Map<String, String>> query(Map<String, String> params);


    public void deleteTable(Map<String, String> map);


    public void savedispatcherPlateNo(DispatcherPlateNo diss);

    @Paging
    public List<Map<String,String>> queryapproveAuditor(Map<String, String> params);

    @Paging
    public List<Map<String,String>> queryapproveByCompany(Map<String, String> params);

    @Paging
    public List<Map<String,String>> queryapproveAuditorByFatherId(Map<String, String> params);

}
