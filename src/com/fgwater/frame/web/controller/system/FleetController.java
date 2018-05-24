package com.fgwater.frame.web.controller.system;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.system.Employee;
import com.fgwater.frame.model.system.Fleet;
import com.fgwater.frame.service.system.EmployeeService;
import com.fgwater.frame.service.system.FleetService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@Scope("request")
@RequestMapping(value = "/system", produces = "text/plain;charset=UTF-8;")
/* 
添加注解 @Controller 将其标识为控制器，这里仅仅是一个普通的Java类，
通过简单的注解，就可以将其解析为Servlet类来响应用户的请求
*/
public class FleetController extends BaseController {


	@Resource
	private FleetService fleetService;

	@Injection
	private Fleet fleet;

	@Injection
	private  List<Fleet> fleets;


	/**
	 * 获取平台fleet的树展示
	 * @return
	 */

	@ResponseBody
	@RequestMapping(value = "getTreeAllFleetList.do")
	public String getAll() {

		System.out.println("==========获取param================="+this.requestModel.getParams());

		this.responseModel.mount(this.fleetService.getTreeAll(this.requestModel.getParams()), MOUNT_TYPE_JA);

		//System.out.println("buildFleet======"+this.responseModel.serial());
		return this.responseModel.serial();
	}


	/**
	 * 车辆的树展示
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getTruckTree.do")
	public  String getTruckTree(HttpServletRequest request){
		String fleetId = request.getParameter("fleetId");

		JSONArray jsonArray = this.fleetService.getTruckTree(fleetId);
		return  jsonArray.toString();
	}

	/**
	 * 调用高德api 获取地址经纬度
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "queryLocale.do")
	public String queryLocale() {

		System.out.println("==========获取param================="+this.requestModel.getParams());
		String keywords = this.requestModel.getParams().get("userinput");
		JSONObject jsonObject = new JSONObject();


		RestTemplate  restTemplate  = new RestTemplate();
		Map<String,Object> map = new HashMap<>();


		String url  = "http://restapi.amap.com/v3/place/text?output=JSON&offset=20&page=1&key=6eff8256291114b3052540a26beed25b&extensions=all&keywords="+keywords;
		JSONObject jo = restTemplate.getForEntity(url,JSONObject.class).getBody();


		if (jo.getString("status").equals("1") ){
			JSONArray jsonArray = jo.getJSONArray("pois");
			//jsonObject = JSONObject.fromObject(jsonArray);
			return jsonArray.toString();

		}else {
			return  null;

		}





		//System.out.println("buildFleet======"+this.responseModel.serial());

	}


	/**
	 * 保存平台信息
	 * @return
	 */

	@ResponseBody
	@RequestMapping(value = "saveFleet.do")
	public String save() {

		System.out.println("===========saveFleet============"+this.getFleet());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.fleetService.saveOrUpdate(this.getFleet()));

		return jo.toString();
	}


	/**
	 * 删除平台信息
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "deleteFleet.do")
	public String delete() {
		System.out.println("==============deletefleet============="+this.getFleet());
		try {
			this.fleetService.delete(this.getFleet());
		}catch (Exception e){
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("success", false);
			jsonObject.put("msg", "ok");
			return  jsonObject.toString();
		}

		return this.responseModel.serial();
	}






	public Fleet getFleet() {
		return fleet;
	}

	public void setFleet(Fleet fleet) {
		this.fleet = fleet;
	}

	public List<Fleet> getFleets() {
		return fleets;
	}

	public void setFleets(List<Fleet> fleets) {
		this.fleets = fleets;
	}
}
