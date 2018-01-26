package com.fgwater.frame.model.logistics;

import com.fgwater.core.model.BaseModel;
import org.apache.ibatis.type.Alias;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import java.awt.geom.FlatteningPathIterator;

@Alias("PassengerComment")
@Table(name = "t_passenger_comment")
public class PassengerComment extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	@Column
	private  String fleetId;
	@Column
	private String  carApplyNo;
	@Column
	private String  driverId;
	@Column
	private float score;
	@Column
	private String  content;
	@Column
	private String  commentDatetime;


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFleetId() {
		return fleetId;
	}

	public void setFleetId(String fleetId) {
		this.fleetId = fleetId;
	}

	public String getCarApplyNo() {
		return carApplyNo;
	}

	public void setCarApplyNo(String carApplyNo) {
		this.carApplyNo = carApplyNo;
	}

	public String getDriverId() {
		return driverId;
	}

	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}

	public float getScore() {
		return score;
	}

	public void setScore(float score) {
		this.score = score;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getCommentDatetime() {
		return commentDatetime;
	}

	public void setCommentDatetime(String commentDatetime) {
		this.commentDatetime = commentDatetime;
	}
}
