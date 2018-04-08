package com.fgwater.frame.mapper.system;

import com.fgwater.core.annotation.Paging;
import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.system.Company;
import com.fgwater.frame.model.system.Fleet;

import java.util.List;
import java.util.Map;

public interface CompanyMapper extends BaseMapper<Company> {

    public List<Company> getTreeAll(Map<String, String> params);


    @Paging
    public   List<Map<String,String>> getTreechild(Map<String, String> params);

    public List<Company> getTreeByCompany(Map<String, String> params);

    public List<Company> getTreeCompanyApprove(Map<String, String> params);

    public List<Company> getTreeCompanyApproveById(Map<String, String> params);

    public List<Map<String,String>> getTreeCompany(Map<String, String> params);

}
