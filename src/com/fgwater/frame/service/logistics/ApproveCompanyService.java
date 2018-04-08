package com.fgwater.frame.service.logistics;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.logistics.ApproveCompany;
import com.fgwater.frame.model.logistics.DispatcherDriver;

import java.util.List;
import java.util.Map;

public interface ApproveCompanyService extends BaseService {


    public boolean savedispatcherDriver(ApproveCompany approveCompany);

    public List<Map<String,String>> query(Map<String, String> params);


    public void deleteTable(List<ApproveCompany> approveCompanies);

    public List<Map<String,String>> queryapproveAuditor(Map<String, String> params);

}

