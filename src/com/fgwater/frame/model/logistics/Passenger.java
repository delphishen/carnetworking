package com.fgwater.frame.model.logistics;

import com.fgwater.core.model.BaseModel;
import org.apache.ibatis.type.Alias;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Alias("Passenger")
@Table(name = "t_archives_passenger")
public class Passenger extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;
	@Column
	private  String fleetId;
	@Column
	private String  passengerName;
	@Column
	private String  companyId;
	@Column
	private  String sex;
	@Column
	private String  mobile;
	@Column
	private String  address;
	@Column
	private  String password;
	@Column
	private String  statuesId;

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

	public String getPassengerName() {
		return passengerName;
	}

	public void setPassengerName(String passengerName) {
		this.passengerName = passengerName;
	}

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getStatuesId() {
		return statuesId;
	}

	public void setStatuesId(String statuesId) {
		this.statuesId = statuesId;
	}


}
