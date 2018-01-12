package com.fgwater.frame.web.controller.logistics;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.DispatcherPlateNo;
import com.fgwater.frame.service.logistics.ApplyTypeService;
import com.fgwater.frame.service.logistics.DispatcherPlateNoService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping(value = "/logistics", produces = "text/plain;charset=UTF-8;")
/* 
添加注解 @Controller 将其标识为控制器，这里仅仅是一个普通的Java类，
通过简单的注解，就可以将其解析为Servlet类来响应用户的请求
*/
public class DispatcherPlateNoController extends BaseController {

	@Resource
	private DispatcherPlateNoService dispatcherPlateNoService;


	@Injection
	private  List<DispatcherPlateNo>  dispatcherPlateNos;

	@Injection
	private  DispatcherPlateNo dispatcherPlateNo;



	@ResponseBody
	@RequestMapping(value = "savedispatcherPlateNo.do")
	public String savebusType() {

		System.out.println("===========保存调度司机信息============"+this.getDispatcherPlateNo().getPlateNoId());
		JSONObject jo = new JSONObject();
		jo.element("success", true);
		jo.element("label", this.dispatcherPlateNoService.savedispatcherPlateNo(this.getDispatcherPlateNo()));

		return jo.toString();
	}







	public List<DispatcherPlateNo> getDispatcherPlateNos() {
		return dispatcherPlateNos;
	}

	public void setDispatcherPlateNos(List<DispatcherPlateNo> dispatcherPlateNos) {
		this.dispatcherPlateNos = dispatcherPlateNos;
	}

	public DispatcherPlateNo getDispatcherPlateNo() {
		return dispatcherPlateNo;
	}

	public void setDispatcherPlateNo(DispatcherPlateNo dispatcherPlateNo) {
		this.dispatcherPlateNo = dispatcherPlateNo;
	}
}
