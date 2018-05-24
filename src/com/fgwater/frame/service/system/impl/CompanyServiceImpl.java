package com.fgwater.frame.service.system.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.SessionUtils;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.system.CompanyMapper;
import com.fgwater.frame.mapper.system.FleetMapper;
import com.fgwater.frame.model.system.Company;
import com.fgwater.frame.model.system.Fleet;
import com.fgwater.frame.model.system.User;
import com.fgwater.frame.service.system.CompanyService;
import com.fgwater.frame.service.system.FleetService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("companyService")
public class CompanyServiceImpl extends BaseServiceImpl implements
		CompanyService {

	@Resource
	private CompanyMapper companyMapper;


	public JSONArray getTreeAll(Map<String, String> params) {

		User user = SessionUtils.getCurrUser();

		JSONArray ja = new JSONArray();

		if (("10").equals(user.getRoleId())){
			ja = JSONArray.fromObject(this.companyMapper.getTreeAll(params));
		}else {
			params.put("userId",user.getId());
			ja = JSONArray.fromObject(this.companyMapper.getTreeByCompany(params));
		}



		System.out.println("-----------companyservice======"+ja);
		System.out.println("============getcompanyboot======="+this.getByRoot(ja, "0", new JSONArray()));

		return this.getByRoot(ja, "0", new JSONArray());


		//	return ja;
	}


	public boolean saveOrUpdate(Company company) {
		//int count = this.companyMapper.check(company, "company");
		int count = 0;

		if(StrUtils.isNullOrEmpty(company.getId())){
			count = this.companyMapper.checkCompany(company);

		}
		if (count == 0) {
			if (StrUtils.isNullOrEmpty(company.getId())) {
				company.setId(UUIDUtils.getUUID());
				companyMapper.insert(company);
			} else {
				companyMapper.update(company);
			}
		}
		return count == 0;
	}


	public void delete(Company company) {
		companyMapper.deletePhysicalCascade(company);
	}

	@Override
	public List<Map<String,String>> getTreechild(Map<String, String> params) {
		return this.companyMapper.getTreechild(params);
	}

	@Override
	public JSONArray getTreeCompanyApprove(Map<String, String> params) {

		JSONArray ja = new JSONArray();
		User user = SessionUtils.getCurrUser();
		if (("10").equals(user.getRoleId()) ){
			ja = JSONArray.fromObject(this.companyMapper.getTreeCompanyApprove(params));
		}else {
			params.put("userId",user.getId());
			 ja = JSONArray.fromObject(this.companyMapper.getTreeCompanyApproveById(params));

		}
		return null;
	}




	private JSONArray getByRoot(JSONArray ja, String root, JSONArray res) {
		for (int i = 0; i < ja.size(); i++) {
			JSONObject jo = ja.getJSONObject(i);
			if (root.equals(jo.getString("fatherId"))) {
				JSONArray children = new JSONArray();
				children = this.getByRoot(ja, jo.getString("id"), children);
				if (children.size() == 0) {
					jo.put("leaf", true);
				} else {
					jo.put("leaf", false);
					jo.put("expanded", true);
					jo.put("children", children);
				}
				res.add(jo);
			}
		}
		return res;
	}



}
