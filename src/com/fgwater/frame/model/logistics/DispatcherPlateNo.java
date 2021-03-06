package com.fgwater.frame.model.logistics;

import com.fgwater.core.model.BaseModel;
import org.apache.ibatis.type.Alias;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Alias("DispatcherPlateNo")
@Table(name = "t_archives_dispatcher_plateno")
public class DispatcherPlateNo extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;
	@Column
	private  String userId;

	@Column
	private String  plateNoId;

	@Column
	private String  fleetId;


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPlateNoId() {
		return plateNoId;
	}

	public void setPlateNoId(String plateNoId) {
		this.plateNoId = plateNoId;
	}

	public String getFleetId() {
		return fleetId;
	}

	public void setFleetId(String fleetId) {
		this.fleetId = fleetId;
	}
}
