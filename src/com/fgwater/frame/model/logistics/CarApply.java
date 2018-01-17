package com.fgwater.frame.model.logistics;

import com.fgwater.core.model.BaseModel;
import org.apache.ibatis.type.Alias;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Alias("CarApply")
@Table(name = "t_car_apply")
public class CarApply extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	private String carApplyNo;
	@Column
	private  String fleetId;
	@Column
	private String  userId;
	@Column
	private String  comapnyId;

	@Column
	private  String privateOrPublic;
	@Column
	private String  departureTime;
	@Column
	private String  startLocale;
	@Column
	private  String endLocale;
	@Column
	private boolean  carpoolYN;
	@Column
	private String  carTypeId;
	@Column
	private  float budgetCost;
	@Column
	private float  budgetKilometres;
	@Column
	private float  cost;
	@Column
	private  float kilometres;
	@Column
	private String  settlementId;
	@Column
	private String  content;

	@Column
	private  String remark;
	@Column
	private String  plateNumberId;
	@Column
	private String  driverId;
	@Column
	private  String rideDatetime;
	@Column
	private  String endDatetime;
	@Column
	private String  businessType;
	@Column
	private boolean  isCalledCar;
	@Column
	private  String applyDatetime;

	@Column
	private  String statuesId;
	@Column
	private String  activityId;
	@Column
	private String  orderFrom;






	public String getFleetId() {
		return fleetId;
	}

	public void setFleetId(String fleetId) {
		this.fleetId = fleetId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getComapnyId() {
		return comapnyId;
	}

	public void setComapnyId(String comapnyId) {
		this.comapnyId = comapnyId;
	}

	public String getPrivateOrPublic() {
		return privateOrPublic;
	}

	public void setPrivateOrPublic(String privateOrPublic) {
		this.privateOrPublic = privateOrPublic;
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

	public boolean isCarpoolYN() {
		return carpoolYN;
	}

	public void setCarpoolYN(boolean carpoolYN) {
		this.carpoolYN = carpoolYN;
	}

	public String getCarTypeId() {
		return carTypeId;
	}

	public void setCarTypeId(String carTypeId) {
		this.carTypeId = carTypeId;
	}

	public float getBudgetCost() {
		return budgetCost;
	}

	public void setBudgetCost(float budgetCost) {
		this.budgetCost = budgetCost;
	}

	public float getBudgetKilometres() {
		return budgetKilometres;
	}

	public void setBudgetKilometres(float budgetKilometres) {
		this.budgetKilometres = budgetKilometres;
	}

	public float getCost() {
		return cost;
	}

	public void setCost(float cost) {
		this.cost = cost;
	}

	public float getKilometres() {
		return kilometres;
	}

	public void setKilometres(float kilometres) {
		this.kilometres = kilometres;
	}

	public String getSettlementId() {
		return settlementId;
	}

	public void setSettlementId(String settlementId) {
		this.settlementId = settlementId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getPlateNumberId() {
		return plateNumberId;
	}

	public void setPlateNumberId(String plateNumberId) {
		this.plateNumberId = plateNumberId;
	}

	public String getDriverId() {
		return driverId;
	}

	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}

	public String getRideDatetime() {
		return rideDatetime;
	}

	public void setRideDatetime(String rideDatetime) {
		this.rideDatetime = rideDatetime;
	}

	public String getEndDatetime() {
		return endDatetime;
	}

	public void setEndDatetime(String endDatetime) {
		this.endDatetime = endDatetime;
	}

	public String getBusinessType() {
		return businessType;
	}

	public void setBusinessType(String businessType) {
		this.businessType = businessType;
	}

	public boolean isCalledCar() {
		return isCalledCar;
	}

	public void setCalledCar(boolean calledCar) {
		isCalledCar = calledCar;
	}

	public String getApplyDatetime() {
		return applyDatetime;
	}

	public void setApplyDatetime(String applyDatetime) {
		this.applyDatetime = applyDatetime;
	}

	public String getStatuesId() {
		return statuesId;
	}

	public void setStatuesId(String statuesId) {
		this.statuesId = statuesId;
	}

	public String getActivityId() {
		return activityId;
	}

	public void setActivityId(String activityId) {
		this.activityId = activityId;
	}

	public String getOrderFrom() {
		return orderFrom;
	}

	public void setOrderFrom(String orderFrom) {
		this.orderFrom = orderFrom;
	}

	public String getCarApplyNo() {
		return carApplyNo;
	}

	public void setCarApplyNo(String carApplyNo) {
		this.carApplyNo = carApplyNo;
	}
}
