package com.fgwater.frame.service.logistics.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.SessionUtils;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.logistics.ApproveCompanyMapper;
import com.fgwater.frame.mapper.logistics.DispatcherDriverMapper;
import com.fgwater.frame.mapper.system.FleetMapper;
import com.fgwater.frame.model.logistics.ApproveCompany;
import com.fgwater.frame.model.logistics.DispatcherDriver;
import com.fgwater.frame.model.system.User;
import com.fgwater.frame.service.logistics.ApproveCompanyService;
import com.fgwater.frame.service.logistics.DispatcherDriverService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

@Service("approveCompanyService")
public class ApproveCompanyServiceImpl extends BaseServiceImpl implements ApproveCompanyService {

	@Resource
	private ApproveCompanyMapper approveCompanyMapper;

	@Resource
	private FleetMapper fleetMapper;


	@Override
	public boolean savedispatcherDriver(ApproveCompany approveCompany) {

		String  did  = approveCompany.getCompanyId();


		if (StrUtils.isNullOrEmpty(approveCompany.getId())){
			System.out.println("=====================id为空=============");

			List<String> dispatcheDrivers = Arrays.asList(did.split(","));
			for (String dis : dispatcheDrivers) {
				ApproveCompany approveCompany1 = new ApproveCompany();
				approveCompany1.setId(UUIDUtils.getUUID());
				approveCompany1.setUserId(approveCompany.getUserId());
				approveCompany1.setCompanyId(dis);
				approveCompany1.setFleetId(approveCompany.getFleetId());
				this.approveCompanyMapper.insert(approveCompany1);
			}
		}else {
			System.out.println("====================id不为空！！！！！===================");
			this.approveCompanyMapper.update(approveCompany);
		}






		return true;
	}

	@Override
	public List<Map<String, String>> query(Map<String, String> params) {

		return this.approveCompanyMapper.query(params);
	}

	@Override
	public void deleteTable(List<ApproveCompany>  approveCompanies) {

		for (ApproveCompany approveCompanie : approveCompanies) {
			JSONObject jo = JSONObject.fromObject(approveCompanie);
			Map<String, String> map = this.toMap(jo);
			approveCompanyMapper.deleteTable(map);
		}

	}

	@Override
	public List<Map<String, String>> queryapproveAuditor(Map<String, String> params) {

	    //int count  = this.fleetMapper.findByFleetId(params);
		User user = SessionUtils.getCurrUser();
		if (("30").equals(user.getRoleId())){
			params.put("fatherId",user.getId());
			return this.approveCompanyMapper.queryapproveAuditorByFatherId(params);
		}else {
			return this.approveCompanyMapper.queryapproveAuditor(params);
		}

            //return this.approveCompanyMapper.queryapproveAuditor(params);


	}


	@SuppressWarnings("unchecked")
	private Map<String, String> toMap(JSONObject jo) {
		Map<String, String> map = new HashMap<String, String>();
		Iterator<String> iterator = jo.keys();
		while (iterator.hasNext()) {
			String key = iterator.next();
			map.put(key, jo.getString(key));
		}
		return map;
	}
}
