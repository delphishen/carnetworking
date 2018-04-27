package com.fgwater.frame.model.logistics;

import com.fgwater.core.model.BaseModel;
import org.apache.ibatis.type.Alias;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Alias("CarApplyPassenger")
@Table(name = "t_car_apply_passenger")
public class CarApplyPassenger extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;
	@Column
	private  String fleetId;
	@Column
	private String  carApplyNo;
	@Column
	private String  name;
	@Column
	private  String tel;
	@Column
	private String  departureTime;
	@Column
	private String  startLocale;
	@Column
	private  String endLocale;

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getDepartureTime() {
		return departureTime;
	}

	public void setDepartureTime(String departureTime) {
		this.departureTime = departureTime;
	}

	public String getStartLocale() {
		return startLocale;
	}

	public void setStartLocale(String startLocale) {
		this.startLocale = startLocale;
	}

	public String getEndLocale() {
		return endLocale;
	}

	public void setEndLocale(String endLocale) {
		this.endLocale = endLocale;
	}
}
