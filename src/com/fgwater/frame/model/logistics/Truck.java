package com.fgwater.frame.model.logistics;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.ibatis.type.Alias;

import com.fgwater.core.model.BaseModel;

@Alias("Truck")
@Table(name = "t_archives_car")
public class Truck extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;
	@Column
	private String plateNo;
	@Column
	private String carType;
	@Column
	private String companyId;

	@Column
	private String fleetId;
	@Column
	private String vehicleOwner;
	@Column
	private String tel;
	@Column
	private String driverId;
	@Column
	private float oilTotal;
	@Column
	private String buyDatetime;
	@Column
	private String annualSurveyDate;
	@Column
	private String insuranceDate;
	@Column
	private String maintenanceDate;
	@Column
	private String statues;

	@Column
	private int peccancyCount;
	@Column
	private String address;
	@Column
	private int modifyDatetime;
	@Column
	private String VIN;
	@Column
	private String engineNo;
	@Column
	private String issueDate;
	@Column
	private String model;
	@Column
	private String ascription;



	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPlateNo() {
		return plateNo;
	}

	public void setPlateNo(String plateNo) {
		this.plateNo = plateNo;
	}

	public String getCarType() {
		return carType;
	}

	public void setCarType(String carType) {
		this.carType = carType;
	}

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public String getVehicleOwner() {
		return vehicleOwner;
	}

	public void setVehicleOwner(String vehicleOwner) {
		this.vehicleOwner = vehicleOwner;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}


	public String getDriverId() {
		return driverId;
	}

	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}

	public float getOilTotal() {
		return oilTotal;
	}

	public void setOilTotal(float oilTotal) {
		this.oilTotal = oilTotal;
	}

	public String getBuyDatetime() {
		return buyDatetime;
	}

	public void setBuyDatetime(String buyDatetime) {
		this.buyDatetime = buyDatetime;
	}

	public String getAnnualSurveyDate() {
		return annualSurveyDate;
	}

	public void setAnnualSurveyDate(String annualSurveyDate) {
		this.annualSurveyDate = annualSurveyDate;
	}

	public String getInsuranceDate() {
		return insuranceDate;
	}

	public void setInsuranceDate(String insuranceDate) {
		this.insuranceDate = insuranceDate;
	}

	public String getMaintenanceDate() {
		return maintenanceDate;
	}

	public void setMaintenanceDate(String maintenanceDate) {
		this.maintenanceDate = maintenanceDate;
	}

	public String getStatues() {
		return statues;
	}

	public void setStatues(String statues) {
		this.statues = statues;
	}

	public int getPeccancyCount() {
		return peccancyCount;
	}

	public void setPeccancyCount(int peccancyCount) {
		this.peccancyCount = peccancyCount;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public int getModifyDatetime() {
		return modifyDatetime;
	}

	public void setModifyDatetime(int modifyDatetime) {
		this.modifyDatetime = modifyDatetime;
	}

	public String getVIN() {
		return VIN;
	}

	public void setVIN(String VIN) {
		this.VIN = VIN;
	}

	public String getEngineNo() {
		return engineNo;
	}

	public void setEngineNo(String engineNo) {
		this.engineNo = engineNo;
	}

	public String getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(String issueDate) {
		this.issueDate = issueDate;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}


	public String getFleetId() {
		return fleetId;
	}

	public void setFleetId(String fleetId) {
		this.fleetId = fleetId;
	}

	public String getAscription() {
		return ascription;
	}

	public void setAscription(String ascription) {
		this.ascription = ascription;
	}
}
