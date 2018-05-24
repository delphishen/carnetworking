package com.fgwater.frame.web.controller.logistics;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bolang.carnetworking.location.LocationUtil;
import com.bolang.carnetworking.location.request.CarInfo;
import com.bolang.carnetworking.location.request.CarLocationRequest;
import com.bolang.carnetworking.location.response.CarLocationDetail;
import com.bolang.carnetworking.location.response.CarLocationResponse;
import com.fgwater.core.common.ConstantSys;
import com.fgwater.core.model.DateJsonValueProcessor;
import com.fgwater.core.utils.ExcelUtil;
import com.fgwater.core.utils.GetLocationUtil;
import com.fgwater.core.utils.ResponseUtil;
import com.fgwater.core.utils.SessionUtils;
import com.fgwater.frame.model.system.User;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import net.sf.json.JsonConfig;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.logistics.Truck;
import com.fgwater.frame.service.logistics.TruckService;

@Controller
@RequestMapping(value = "/logistics", produces = "text/plain;charset=UTF-8;")
/* 
添加注解 @Controller 将其标识为控制器，这里仅仅是一个普通的Java类，
通过简单的注解，就可以将其解析为Servlet类来响应用户的请求
*/
public class TruckController extends BaseController {

	@Resource
	private TruckService truckService;

	@Injection
	private List<Truck> trucks;

	@Injection
	private Truck truck;

	@ResponseBody
	@RequestMapping(value = "queryTruck.do")
	public String query() {
			System.out.println("============queryTruck获取车辆信息============"+this.truckService.query(this.requestModel.getParams()));



		this.responseModel.mount(this.truckService.query(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);
	//		System.out.println("queryTruck============"+this.responseModel.serial());
		return this.responseModel.serial();
	}


	@ResponseBody
	@RequestMapping(value = "queryTruckDispatcher.do")
	public String queryTruckDispatcher() {
		//System.out.println("============queryTruck获取车辆信息============"+this.truckService.query(this.requestModel.getParams()));


		String remark = this.requestModel.getParams().get("remark");
		String carTypeId = this.requestModel.getParams().get("carTypeId");
		String roleId = this.requestModel.getParams().get("roleId");

		User user = SessionUtils.getCurrUser();


		if (roleId.equals("20")){
			this.responseModel.mount(this.truckService.queryTruckDispatcher(this.requestModel
					.getParams()), MOUNT_TYPE_PAGING);
		}else {
			this.responseModel.mount(this.truckService.queryTruckDispatcherByRoot(this.requestModel
					.getParams()), MOUNT_TYPE_PAGING);


		}

		System.out.println("========================"+this.requestModel.getParams());




		//		System.out.println("queryTruck============"+this.responseModel.serial());
		return this.responseModel.serial();
	}



	@ResponseBody
	@RequestMapping(value = "exportTruck.do")
	public void exportCarApply(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {

		Map<String ,String > map = new HashMap<>();
		String fleetId =  httpServletRequest.getParameter("fleetId");
		String plateNo = httpServletRequest.getParameter("plateNo");
		String driverId = httpServletRequest.getParameter("driverId");
		String queryfleetId = httpServletRequest.getParameter("queryfleetId");

		map.put("fleetId",fleetId);
		map.put("plateNo",plateNo);
		map.put("driverId",driverId);
		map.put("queryfleetId",queryfleetId);

		try {

			Workbook wb = new HSSFWorkbook();
			String heads[] = { "所属平台", "所属机构","车牌号码","默认司机","车辆类型","车主","车主电话","品牌型号","车辆归属"};
			List<Map<String,String>> mapList = this.truckService.queryExcel(map);

			JsonConfig config = new JsonConfig();
			config.registerJsonValueProcessor(Timestamp.class,new DateJsonValueProcessor("yyyy-MM-dd HH:mm:ss"));


			JSONArray rs = JSONArray.fromObject(mapList,config);
			ExcelUtil.fillExcelTruck(rs,wb,heads);
			//ResultSet re =  this.userService.findAll();
			//ExcelUtil.fillExcelData(rs,wb,heads);
			ResponseUtil.export(httpServletResponse,wb,"车辆信息.xls");
		}catch (Exception e){
			System.out.println(e.getStackTrace());
			JSONObject jo = new JSONObject();
			jo.element("success", false);
		}
		//ResultSet  re = ResultSet.
		JSONObject jo = new JSONObject();
		jo.element("success", true);

	}




	@ResponseBody
	@RequestMapping(value = "getAllTruck.do")
	public String getAll() {
		this.responseModel.mount(this.truckService.getAll(this.requestModel
				.getParams()), MOUNT_TYPE_JA);
		
	//	JSONArray ja = JSONArray.fromObject(this.truckService.getAll(this.requestModel.getParams()));
	//	Object swap = ja;	
	//	System.out.println(swap.toString());
	//	System.out.println(this.requestModel.getParams());
	//	System.out.println(this.responseModel.serial());
		return this.responseModel.serial();
	}

	@ResponseBody
	@RequestMapping(value = "saveTruck.do")
	public String save() {

		System.out.println("=============车辆信息============="+this.getTruck().toString());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.truckService.saveOrUpdate(this.getTruck()));
	//	System.out.println(this.getTruck().toString());
		return jo.toString();
	}

	@ResponseBody
	@RequestMapping(value = "deleteTruck.do")
	public String delete() {
	//	System.out.println(this.getTrucks());
		try {
			this.truckService.delete(this.getTrucks());

		}catch (Exception e){
			System.out.println(e);
			JSONObject jo = new JSONObject();
			jo.put("success", true);
			jo.put("msg", "999");
			return jo.toString();

		}

		
		return this.responseModel.serial();
	}




	@ResponseBody
	@RequestMapping(value = "getTruckLocation.do")
	public String getTruckLocation() throws  Exception {
		try {

			List<Truck> list = this.getTrucks();

			LocationUtil locationUtil = GetLocationUtil.getLocationUtil();

			CarLocationRequest carLocationRequest = new CarLocationRequest();//创建请求对象
			List<CarInfo> carlist = new ArrayList<CarInfo>();
			for (Truck truck : list) {
				carlist.add(new CarInfo(truck.getPlateNo(),""));
			}

			carLocationRequest.setCarCount(carlist.size());
			carLocationRequest.setCarList(carlist);
			CarLocationResponse carLocationResponse = locationUtil.GetLocation(carLocationRequest);//提交请求，并返回响应对象
			List<CarLocationDetail> locationDetails =   carLocationResponse.getCarList();
			// 登陆账户存入session
			this.requestModel.getSession().setAttribute(
					"location",locationDetails );

			System.out.println("存入session");
		}catch (Exception e){
			System.out.println("=====异常信息==="+e);
			JSONObject jo = new JSONObject();
			jo.put("success", true);
			jo.put("msg", "999");
			return jo.toString();

		}

		//CarLocationDetail carLocationDetail =    SessionUtils.get("location",CarLocationDetail.class);


		return this.responseModel.serial();




	}







	@ResponseBody
	@RequestMapping(value = "getTruckLocation2.do")
	public String getTruckLocation2() throws  Exception {


		Object o =  this.requestModel.getSession().getAttribute("location");

		JSONArray jsonArray = JSONArray.fromObject(this.requestModel.getSession().getAttribute("location"));

		//CarLocationDetail carLocationDetail =    SessionUtils.get("location",CarLocationDetail.class);


		return jsonArray.toString();




	}

	@ResponseBody
	@RequestMapping(value = "getTruckLocation3.do")
	public String getTruckLocation3( HttpServletRequest request) throws  Exception {

		String plateNos = request.getParameter("plateNos");
		JSONArray jsonArray = JSONArray.fromObject(request.getParameter("plateNos"));

		LocationUtil locationUtil = GetLocationUtil.getLocationUtil();

		CarLocationRequest carLocationRequest = new CarLocationRequest();//创建请求对象
		List<CarInfo> carlist = new ArrayList<CarInfo>();
		for (int i = 0;i<jsonArray.size();i++){
			carlist.add(new CarInfo(jsonArray.get(i).toString(),""));
		}

		carLocationRequest.setCarCount(carlist.size());
		carLocationRequest.setCarList(carlist);
		CarLocationResponse carLocationResponse = locationUtil.GetLocation(carLocationRequest);//提交请求，并返回响应对象
		List<CarLocationDetail> locationDetails =   carLocationResponse.getCarList();

		JSONArray jsonArray1 = JSONArray.fromObject(locationDetails);





		//CarLocationDetail carLocationDetail =    SessionUtils.get("location",CarLocationDetail.class);


		return jsonArray1.toString() ;




	}





	public List<Truck> getTrucks() {
		return trucks;
	}

	public void setTrucks(List<Truck> trucks) {
		this.trucks = trucks;
	}

	public Truck getTruck() {
		return truck;
	}

	public void setTruck(Truck truck) {
		this.truck = truck;
	}

}
