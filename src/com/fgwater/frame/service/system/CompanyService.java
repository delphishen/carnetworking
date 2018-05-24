package com.fgwater.frame.service.system;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.system.Company;
import com.fgwater.frame.model.system.Fleet;
import net.sf.json.JSONArray;

import java.util.List;
import java.util.Map;

public interface CompanyService extends BaseService {


    public JSONArray getTreeAll(Map<String, String> params);

    public boolean saveOrUpdate(Company company);

    public  void  delete(Company company);

    public List<Map<String,String>> getTreechild(Map<String, String> params);


    public JSONArray getTreeCompanyApprove(Map<String, String> params);



}
