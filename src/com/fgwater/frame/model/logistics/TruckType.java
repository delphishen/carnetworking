package com.fgwater.frame.model.logistics;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.ibatis.type.Alias;

import com.fgwater.core.model.BaseModel;

@Alias("TruckType")
@Table(name = "t_archives_car_type")
public class TruckType extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;
	@Column
	private String fleetId;
	@Column
	private String companyId;
	@Column
	private String modelName;
	@Column
	private int seatNumber;
	@Column
	private int approvedPassengersCapacity;

	@Column
	private String type;
	@Column
	private int carCount;
	@Column
	private String png;
	@Column
	private String remark;

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

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public String getModelName() {
		return modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

	public int getSeatNumber() {
		return seatNumber;
	}

	public void setSeatNumber(int seatNumber) {
		this.seatNumber = seatNumber;
	}

	public int getApprovedPassengersCapacity() {
		return approvedPassengersCapacity;
	}

	public void setApprovedPassengersCapacity(int approvedPassengersCapacity) {
		this.approvedPassengersCapacity = approvedPassengersCapacity;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getCarCount() {
		return carCount;
	}

	public void setCarCount(int carCount) {
		this.carCount = carCount;
	}

	public String getPng() {
		return png;
	}

	public void setPng(String png) {
		this.png = png;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
}
