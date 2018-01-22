package com.fgwater.frame.model.logistics;

import com.fgwater.core.model.BaseModel;
import org.apache.ibatis.type.Alias;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Alias("CarPeccancy")
@Table(name = "t_car_peccancy")
public class CarPeccancy extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	@Column
	private  String fleetId;
	@Column
	private String  plateNoId;
	@Column
	private String  companyId;

	@Column
	private  String driverId;
	@Column
	private String  peccancyDatetime;
	@Column
	private String  content;
	@Column
	private String  statues;

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

	public String getPlateNoId() {
		return plateNoId;
	}

	public void setPlateNoId(String plateNoId) {
		this.plateNoId = plateNoId;
	}

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public String getDriverId() {
		return driverId;
	}

	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}

	public String getPeccancyDatetime() {
		return peccancyDatetime;
	}

	public void setPeccancyDatetime(String peccancyDatetime) {
		this.peccancyDatetime = peccancyDatetime;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getStatues() {
		return statues;
	}

	public void setStatues(String statues) {
		this.statues = statues;
	}
}
