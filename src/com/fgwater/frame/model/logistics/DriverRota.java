package com.fgwater.frame.model.logistics;

import com.fgwater.core.model.BaseModel;
import org.apache.ibatis.type.Alias;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Alias("DriverRota")
@Table(name = "t_driver_rota")
public class DriverRota extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;
	@Column
	private  String fleetId;
	@Column
	private String  driverId;

	@Column
	private String  clockIn;

	@Column
	private String  clockOut;

	@Column
	private float  orderBy;

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

	public String getDriverId() {
		return driverId;
	}

	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}

	public String getClockIn() {
		return clockIn;
	}

	public void setClockIn(String clockIn) {
		this.clockIn = clockIn;
	}

	public String getClockOut() {
		return clockOut;
	}

	public void setClockOut(String clockOut) {
		this.clockOut = clockOut;
	}

	public float getOrderBy() {
		return orderBy;
	}

	public void setOrderBy(float orderBy) {
		this.orderBy = orderBy;
	}
}
