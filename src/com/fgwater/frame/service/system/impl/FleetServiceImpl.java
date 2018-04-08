package com.fgwater.frame.service.system.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.SessionUtils;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.system.CompanyMapper;
import com.fgwater.frame.mapper.system.EmployeeMapper;
import com.fgwater.frame.mapper.system.FleetMapper;
import com.fgwater.frame.mapper.system.UserMapper;
import com.fgwater.frame.model.system.Employee;
import com.fgwater.frame.model.system.Fleet;
import com.fgwater.frame.model.system.Menu;
import com.fgwater.frame.model.system.User;
import com.fgwater.frame.service.system.EmployeeService;
import com.fgwater.frame.service.system.FleetService;
import com.sun.deploy.panel.JavaPanel;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

@Service("fleetService")
public class FleetServiceImpl extends BaseServiceImpl implements
		FleetService {

	@Resource
	private FleetMapper fleetMapper;

	@Resource
	private UserMapper userMapper;
	@Resource
	private CompanyMapper companyMapper;



	public List<Fleet> getTreeAll(Map<String, String> params) {
			JSONArray ja = JSONArray.fromObject(this.fleetMapper.getTreeAll(params));
			System.out.println("-----------fleetservice======"+ja);
			System.out.println("============getboot======="+this.getByRoot(ja, "0", new JSONArray()));

			return this.getByRoot(ja, "0", new JSONArray());


			//	return ja;
		}

	public boolean saveOrUpdate(Fleet fleet) {
		int count = this.fleetMapper.check(fleet, "fleetName");
		if (count == 0) {
			if (StrUtils.isNullOrEmpty(fleet.getId())) {
				fleet.setId(UUIDUtils.getUUID());
				fleetMapper.insert(fleet);
			} else {
				fleetMapper.update(fleet);
			}
		}
		return count == 0;
	}

	public void delete(Fleet fleet) {
		fleetMapper.deletePhysicalCascade(fleet);
	}

	@Override
	public JSONArray getTreeFleetList(Map<String, String> params) {


			JSONArray ja = JSONArray.fromObject(this.fleetMapper.getTreeFleetList(params));
			System.out.println("==========================ja=============="+ja);
			return this.getchildren(ja,params, new JSONArray());
	}

	@Override
	public JSONArray getTreeFleetApprove(Map<String, String> params) {
		JSONArray ja = JSONArray.fromObject(this.fleetMapper.getTreeFleetList(params));
		String roleId = params.get("roleId");

		System.out.println("==========================ja=============="+ja);
		return this.getchildrenapp(ja,params, new JSONArray());
	}

	private JSONArray getchildrenapp(JSONArray ja,Map<String, String> params, JSONArray jsonArray) {

		String roleId = params.get("roleId");
		User user = SessionUtils.getCurrUser();


		List<Map<String,Object>> userList = new ArrayList<>();

		for (int i =0; i<ja.size();i++){
			JSONObject jo = ja.getJSONObject(i);
			JSONArray children = new JSONArray();
			if (("20").equals(roleId)){
				userList = this.userMapper.getUserByRemarkApprove(jo.getString("id"));
			}
			if (("30").equals(roleId)){
				userList = this.userMapper.getUserByRemarkApprove30(jo.getString("id"));
			}
			if (("40").equals(roleId)){
				if (("30").equals(user.getRoleId())){
					userList = this.userMapper.getUserByRemarkApprove4(user.getId());
				}else {
					userList = this.userMapper.getUserByRemarkApprove40(jo.getString("id"));
				}

			}
			for (int j=0;j<userList.size();j++){
				JSONObject cjo = JSONObject.fromObject(userList.get(j));
				cjo.put("leaf",true);
				children.add(cjo);

			}

			jo.put("leaf",false);
			jo.put("expanded",true);
			jo.put("children",children);


			jsonArray.add(jo);

		}

		return  jsonArray;
	}

//	private JSONArray getchildrenCompany(JSONArray ja,Map<String, String> params, JSONArray jsonArray) {
//
//
//		List<Map<String,String>> companyList = new ArrayList<>();
//		List<Map<String,Object>> userList = new ArrayList<>();
//		String roleId ="40";
//
//		for (int i =0; i<ja.size();i++){
//			JSONObject jo = ja.getJSONObject(i);
//			JSONArray children = new JSONArray();
//			params.put("fleetId",jo.get("id").toString());
//
//
//			companyList = this.companyMapper.getTreeCompany(params);
//			JSONArray js = JSONArray.fromObject(companyList);
//			for (int j=0;j<js.size();j++){
//				JSONObject jp = js.getJSONObject(j);
//				String companyId = jp.get("id").toString();
//				params.put("companyId",companyId);
//				JSONArray userChild =  new JSONArray();
//				userList = this.userMapper.getUserByRemarkApprove40(params);
//				for (int k = 0;k<userList.size();k++){
//					JSONObject kjo = JSONObject.fromObject(userList.get(k));
//					kjo.put("leaf",true);
//					userChild.add(kjo);
//				}
//
//				jp.put("leaf",false);
//				jp.put("expanded",true);
//				jp.put("children",userChild);
//
//
//
//				//JSONObject cjo = JSONObject.fromObject(js.get(j));
//				//cjo.put("leaf",true);
//				//children.add(cjo);
//
//			}
//
//			jo.put("leaf",false);
//			jo.put("expanded",true);
//			jo.put("children",js);
//
//			jsonArray.add(jo);
//
//
//		}
//
//		return  jsonArray;
//	}


	private JSONArray getchildren(JSONArray ja,Map<String, String> params, JSONArray jsonArray) {

			for (int i =0; i<ja.size();i++){
				JSONObject jo = ja.getJSONObject(i);
				JSONArray children = new JSONArray();
				List<User> userList = this.userMapper.getUserByRemark(jo.getString("id"));
				for (int j=0;j<userList.size();j++){
					JSONObject cjo = JSONObject.fromObject(userList.get(j));
					cjo.put("leaf",true);
					children.add(cjo);

				}

				jo.put("leaf",false);
				jo.put("expanded",true);
				jo.put("children",children);


				jsonArray.add(jo);

			}

			return  jsonArray;
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
