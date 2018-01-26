package com.fgwater.frame.web.controller.logistics;

import com.fgwater.core.annotation.Injection;
import com.fgwater.core.web.controller.BaseController;
import com.fgwater.frame.model.logistics.ApplyType;
import com.fgwater.frame.model.logistics.PassengerComment;
import com.fgwater.frame.service.logistics.ApplyTypeService;
import com.fgwater.frame.service.logistics.PassengerCommentService;
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
public class PassengerCommentController extends BaseController {

	@Resource
	private PassengerCommentService passengerCommentService;


	@Injection
	private  List<PassengerComment> passengerComments;

	@Injection
	private PassengerComment passengerComment;


	@ResponseBody
	@RequestMapping(value = "queryPassengerComment.do")
	public String query() {

		this.responseModel.mount(this.passengerCommentService.query(this.requestModel
				.getParams()), MOUNT_TYPE_PAGING);

		return this.responseModel.serial();
	}










	public List<PassengerComment> getPassengerComments() {
		return passengerComments;
	}

	public void setPassengerComments(List<PassengerComment> passengerComments) {
		this.passengerComments = passengerComments;
	}

	public PassengerComment getPassengerComment() {
		return passengerComment;
	}

	public void setPassengerComment(PassengerComment passengerComment) {
		this.passengerComment = passengerComment;
	}


}
