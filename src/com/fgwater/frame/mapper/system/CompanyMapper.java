package com.fgwater.frame.mapper.system;

import com.fgwater.core.mapper.BaseMapper;
import com.fgwater.frame.model.system.Company;
import com.fgwater.frame.model.system.Fleet;

import java.util.List;
import java.util.Map;

public interface CompanyMapper extends BaseMapper<Company> {

    public List<Company> getTreeAll(Map<String, String> params);


}
