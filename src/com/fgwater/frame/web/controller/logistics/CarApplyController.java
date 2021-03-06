package com.fgwater.frame.web.controller.logistics;

import com.bolang.carnetworking.location.LocationUtil;
import com.bolang.carnetworking.location.request.CarLocationHistoryRequest;
import com.bolang.carnetworking.location.response.CarLocationHistoryDetail;
import com.bolang.carnetworking.location.response.CarLocationHistoryResponse;
import com.bolang.carnetworking.sms.SMSConfig;
import com.bolang.carnetworking.sms.SMSUtil;
import com.fgwater.core.annotation.Injection;
import com.fgwater.core.model.DateJsonValueProcessor;
import com.fgwater.core.model.Gps;
import com.fgwater.core.utils.*;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.CarApply;
import com.fgwater.frame.model.logistics.Location;
import com.fgwater.frame.model.logistics.User2;
import com.fgwater.frame.model.system.User;
import com.fgwater.frame.service.logistics.*;
import com.fgwater.frame.service.system.FleetService;
import com.fgwater.frame.service.system.UserService;
import com.sun.deploy.net.HttpResponse;
import com.sun.tools.internal.xjc.reader.xmlschema.bindinfo.BIConversion;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/logistics", produces = "text/plain;charset=UTF-8;")
/* 
添加注解 @Controller 将其标识为控制器，这里仅仅是一个普通的Java类，
通过简单的注解，就可以将其解析为Servlet类来响应用户的请求
*/
public class CarApplyController extends BaseController {

	@Resource
	private CarApplyService applyService;

	@Resource
	private PassengerService passengerService;

	@Resource
	private TruckService truckService;

	@Resource
	private CustomerService customerService;

	@Resource
	private UserService userService;





	@Injection
	private  List<CarApply> carApplies;

	@Injection
	private CarApply carApply;


	@ResponseBody
	@RequestMapping(value = "querycarApply.do")
	public String query() {



		System.out.println("=========获取未审核信息========"+this.applyService.query(this.requestModel.getParams()));

		this.responseModel.mount(this.applyService.query(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);

		return this.responseModel.serial();
	}



	@ResponseBody
	@RequestMapping(value = "queryAllCarApply.do")
	public String queryAllCarApply() {



		this.responseModel.mount(this.applyService.queryAllCarApply(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);

		return this.responseModel.serial();
	}


	@ResponseBody
	@RequestMapping(value = "exportCarApply.do")
	public void exportCarApply(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {

		Map<String ,String > map = new HashMap<>();
		String fleetId =  httpServletRequest.getParameter("fleetId");
		String companyId = httpServletRequest.getParameter("companyId");
		String clockIn = httpServletRequest.getParameter("clockIn");
		String clockOut = httpServletRequest.getParameter("clockOut");
		String queryfleetId = httpServletRequest.getParameter("queryfleetId");
		String departureTimebegin = httpServletRequest.getParameter("departureTimebegin");
		String departureTimeend = httpServletRequest.getParameter("departureTimeend");


		map.put("fleetId",fleetId);
		map.put("companyId",companyId);
		map.put("clockIn",clockIn);
		map.put("clockOut",clockOut);
		map.put("queryfleetId",queryfleetId);
		map.put("departureTimebegin",departureTimebegin);
		map.put("departureTimeend",departureTimeend);



		try {

			Workbook wb = new HSSFWorkbook();
			String heads[] = {"订单编号", "订单申请时间", "乘车用户", "业务类型", "付费方式", "出发地",  "目的地"
                    , "实际费用", "实际公里数", "订单来源", "所属机构", "所属平台","司机姓名","车牌号","上车时间","下车时间","出发时间","订单状态"};
			List<Map<String,String>> mapList = this.applyService.excelAllCarApply(map);

			JsonConfig config = new JsonConfig();
			config.registerJsonValueProcessor(Timestamp.class,new DateJsonValueProcessor("yyyy-MM-dd HH:mm:ss"));


			JSONArray rs = JSONArray.fromObject(mapList,config);
			ExcelUtil.fillExcelData(rs,wb,heads);
			//ResultSet re =  this.userService.findAll();
			//ExcelUtil.fillExcelData(rs,wb,heads);
			ResponseUtil.export(httpServletResponse,wb,"订单详情.xls");
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
	@RequestMapping(value = "querydispatchLog.do")
	public String querydispatchLog() {



		this.responseModel.mount(this.applyService.querydispatchLog(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);

		return this.responseModel.serial();
	}


	@ResponseBody
	@RequestMapping(value = "getCarApplylocation.do")
	public String getCarApplylocation( HttpServletRequest request) {

		JSONArray ja = new JSONArray();
		List<Location> locations = new ArrayList<>();

		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Timestamp.class,new DateJsonValueProcessor("yyyy-MM-dd HH:mm:ss"));

		try {
			String orderId =  request.getParameter("orderId");
			Map<String, String> mapList = applyService.queryOrder(orderId);
			JSONObject jsonObject = JSONObject.fromObject(mapList,config);

			if (jsonObject.get("GPSFrom").equals("北斗定位")){
				LocationUtil locationUtil = GetLocationUtil.getLocationUtil();
				CarLocationHistoryRequest carLocationHistoryRequest = new CarLocationHistoryRequest();

				String plateNo = jsonObject.get("plateNo").toString();
				String rideDatetime = jsonObject.get("rideDatetime").toString();
				String endDatetime = jsonObject.get("endDatetime").toString();
				carLocationHistoryRequest.setCarNo(plateNo);
				carLocationHistoryRequest.setStartTime(rideDatetime);
				carLocationHistoryRequest.setEndTime(endDatetime);
				CarLocationHistoryResponse carLocationHistoryResponse = locationUtil.GetTrack(carLocationHistoryRequest);

				List<CarLocationHistoryDetail> list = carLocationHistoryResponse.getPoiList();
				for (CarLocationHistoryDetail carLocationHistoryDetail:list){

					Gps gps = PositionUtil.gps84_To_Gcj02(carLocationHistoryDetail.getY(),carLocationHistoryDetail.getX());
					carLocationHistoryDetail.setX(gps.getWgLon());
					carLocationHistoryDetail.setY(gps.getWgLat());
				}

				ja = JSONArray.fromObject(list);

			}else {

				RestTemplate restTemplate = new RestTemplate();
				ja = restTemplate.getForEntity("http://47.97.177.55:8808/carnetworking/mongoapi/getHistoryLocation?orderId="+orderId,JSONArray.class).getBody();

			}

		}catch (Exception e){
			System.out.println(e);

		}


		return ja.toString();
	}

	@ResponseBody
	@RequestMapping(value = "queryapproveLog.do")
	public String queryapproveLog() {



		this.responseModel.mount(this.applyService.queryapproveLog(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);

		return this.responseModel.serial();
	}

	/**
	 * 订单调度
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "savecarApply.do")
	public String savebusType() {


		CarApply carApply = this.getCarApply();
		String plateNoId = this.getCarApply().getPlateNoId();

		String driverId = this.getCarApply().getDriverId();
		Map<String,Object> map =  this.truckService.queryCarTyoe(plateNoId);
		Map<String,Object>  map2 = this.customerService.queryById(driverId);


		Map<String,String> map3 =  applyService.queryOrder(this.getCarApply().getCarApplyNo());
		JsonConfig configz = new JsonConfig();
		configz.registerJsonValueProcessor(Timestamp.class,new DateJsonValueProcessor("yyyy-MM-dd HH:mm:ss"));

		JSONObject jsonObject = JSONObject.fromObject(map3,configz);

		String plateNo = map.get("plateNo").toString();
		String passengerName = jsonObject.get("passengerName").toString();
		String applyDatetime = jsonObject.get("departureTime").toString();
		String driverName = map2.get("driverName").toString();
		String mobile = map2.get("mobile").toString();

 		if (null != map){
			carApply.setCarTypeId(map.get("carType").toString());
		}

		this.getCarApply().setCarTypeId(map.get("carType").toString());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.applyService.savecarApply(carApply));

		String phone =  passengerService.findPhone(carApply.getUserId());

		ApplicationContext context = new ClassPathXmlApplicationContext("Spring-SMS-Config.xml");

		SMSConfig config= context.getBean("sMSConfig", SMSConfig.class);

		SMSUtil smsUtil = context.getBean(SMSUtil.class);

		smsUtil.Send(phone,"已指派车辆("+plateNo+")为您服务，司机("+driverName+"),手机号"+mobile+"祝您用车愉快！");
		smsUtil.Send(mobile,"新订单,下单人（"+passengerName+"),用车时间"+applyDatetime+",请在APP司机端查看！");


		return jo.toString();
	}




	/**
	 * 订单改派
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "reassignmentcarApply.do")
	public String reassignmentcarApply() {


		CarApply carApply = this.getCarApply();
		String plateNoId = this.getCarApply().getPlateNoId();

		String driverId = this.getCarApply().getDriverId();
		Map<String,Object> map =  this.truckService.queryCarTyoe(plateNoId);
		Map<String,Object>  map2 = this.customerService.queryById(driverId);


		Map<String,String> map3 =  applyService.queryOrder(this.getCarApply().getCarApplyNo());
		JsonConfig configz = new JsonConfig();
		configz.registerJsonValueProcessor(Timestamp.class,new DateJsonValueProcessor("yyyy-MM-dd HH:mm:ss"));

		JSONObject jsonObject = JSONObject.fromObject(map3,configz);

		String plateNo = map.get("plateNo").toString();
		String passengerName = jsonObject.get("passengerName").toString();
		String applyDatetime = jsonObject.get("departureTime").toString();
		String oldplateNo = jsonObject.get("plateNo").toString();

		String driverName = map2.get("driverName").toString();
		String mobile = map2.get("mobile").toString();

		if (map != null){
			carApply.setCarTypeId(map.get("carType").toString());
		}

		this.getCarApply().setCarTypeId(map.get("carType").toString());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.applyService.savecarApply(carApply));

		String phone =  passengerService.findPhone(carApply.getUserId());

		ApplicationContext context = new ClassPathXmlApplicationContext("Spring-SMS-Config.xml");

		SMSConfig config= context.getBean("sMSConfig", SMSConfig.class);

		SMSUtil smsUtil = context.getBean(SMSUtil.class);

		if(oldplateNo.equals(plateNo)){
			smsUtil.Send(phone,"很抱歉，由于司机个人因素影响，改派司机（"+driverName+mobile+")为您服务,登录APP乘客端查看派车进度！！");
		}else {
			smsUtil.Send(phone,"很抱歉，由于车辆故障，("+oldplateNo+")无法为您服务，已为您改派车辆("+plateNo+"),为您服务,司机（"+driverName+mobile+"),登录APP乘客端查看派车进度！！");
		}


		smsUtil.Send(mobile,"新订单,下单人（"+passengerName+"),用车时间"+applyDatetime+",请在APP司机端查看！");


		return jo.toString();
	}


	@ResponseBody
	@RequestMapping(value = "insertcarApply.do")
	public String insertcarApply() {


		CarApply carApply = this.getCarApply();


		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.applyService.insertcarApply(carApply));

		return jo.toString();
	}


	//审核成功，通知调度
	@ResponseBody
	@RequestMapping(value = "updatearApply.do")
	public String delete() {

		System.out.println("============获取未审核信息zzzzzz==============="+this.getCarApply());
		this.applyService.updateTable(this.getCarApply());






		//String phone =  passengerService.findPhone(this.getCarApply().getUserId());


		String dispatcherPhone = "";

		List<Map<String,Object>> userList = userService.findByFleetId(this.getCarApply().getFleetId());
		Map<String,String> map =  applyService.queryOrder(this.getCarApply().getCarApplyNo());
		for (int i = 0;i<userList.size();i++){
			dispatcherPhone =dispatcherPhone + userList.get(i).get("phone")+ " ";
		}

		JsonConfig configz = new JsonConfig();
		configz.registerJsonValueProcessor(Timestamp.class,new DateJsonValueProcessor("yyyy-MM-dd HH:mm:ss"));

		JSONObject jsonObject = JSONObject.fromObject(map,configz);

		String passengerName = jsonObject.get("passengerName").toString();
		String modelName = jsonObject.get("modelName").toString();
		String businessType = jsonObject.get("businessType").toString();
		String applyDatetime = jsonObject.get("departureTime").toString();




		ApplicationContext context = new ClassPathXmlApplicationContext("Spring-SMS-Config.xml");

		SMSConfig config= context.getBean("sMSConfig", SMSConfig.class);

		SMSUtil smsUtil = context.getBean(SMSUtil.class);


		 boolean flag =  smsUtil.Send(dispatcherPhone,"派车通知：下单人("+passengerName+"),用车时间"+applyDatetime+",用车需求:"+modelName+"/"+businessType+",详情请登录后台查看！！！");

		return this.responseModel.serial();
	}



	//取消审核
	@ResponseBody
	@RequestMapping(value = "cancelcarApply.do")
	public String cancelcarApply() {


		System.out.println("===========取消审核信息==============="+this.getCarApply());
		this.applyService.cancelcarApply(this.getCarApply());
		Map<String,String> map = userService.findByUserId(SessionUtils.getCurrUserId());


		String phone =  passengerService.findPhone(this.getCarApply().getUserId());

		ApplicationContext context = new ClassPathXmlApplicationContext("Spring-SMS-Config.xml");

		SMSConfig config= context.getBean("sMSConfig", SMSConfig.class);

		SMSUtil smsUtil = context.getBean(SMSUtil.class);

		boolean flag = smsUtil.Send(phone,"您的订单被审核员("+map.get("name")+")驳回，登录APP乘客端查看详情！");
		return this.responseModel.serial();
	}


	@ResponseBody
	@RequestMapping(value = "deletecarApply.do")
	public String deletecarApply() {


		this.applyService.deletecarApply(this.getCarApplies());
		return this.responseModel.serial();
	}





	public List<CarApply> getCarApplies() {
		return carApplies;
	}

	public void setCarApplies(List<CarApply> carApplies) {
		this.carApplies = carApplies;
	}

	public CarApply getCarApply() {
		return carApply;
	}

	public void setCarApply(CarApply carApply) {
		this.carApply = carApply;
	}
}
