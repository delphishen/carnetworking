package com.fgwater.frame.model.logistics;

import com.fgwater.core.model.BaseModel;
import org.apache.ibatis.type.Alias;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

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
	private String  companyId;

	@Column
	private  String privateOrPublic;
	@Column
	private String departureTime;
	@Column
	private String  startLocale;
	@Column
	private String  wayLocale;

	@Column
	private String  startLongitude;
	@Column
	private String  startLatitude;
	@Column
	private String  wayLongitude;
	@Column
	private String  wayLatitude;
	@Column
	private String  endLongitude;
	@Column
	private String  endLatitude;


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
	private String  plateNoId;
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
	@Column
	private String  localeId;
	@Column
	private  String charteredBusTypeId;











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

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
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

	public String getPlateNoId() {
		return plateNoId;
	}

	public void setPlateNoId(String plateNoId) {
		this.plateNoId = plateNoId;
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

	public String getWayLocale() {
		return wayLocale;
	}

	public void setWayLocale(String wayLocale) {
		this.wayLocale = wayLocale;
	}

	public String getStartLongitude() {
		return startLongitude;
	}

	public void setStartLongitude(String startLongitude) {
		this.startLongitude = startLongitude;
	}

	public String getStartLatitude() {
		return startLatitude;
	}

	public void setStartLatitude(String startLatitude) {
		this.startLatitude = startLatitude;
	}

	public String getWayLongitude() {
		return wayLongitude;
	}

	public void setWayLongitude(String wayLongitude) {
		this.wayLongitude = wayLongitude;
	}

	public String getWayLatitude() {
		return wayLatitude;
	}

	public void setWayLatitude(String wayLatitude) {
		this.wayLatitude = wayLatitude;
	}

	public String getEndLongitude() {
		return endLongitude;
	}

	public void setEndLongitude(String endLongitude) {
		this.endLongitude = endLongitude;
	}

	public String getEndLatitude() {
		return endLatitude;
	}

	public void setEndLatitude(String endLatitude) {
		this.endLatitude = endLatitude;
	}

	public String getLocaleId() {
		return localeId;
	}

	public void setLocaleId(String localeId) {
		this.localeId = localeId;
	}

	public String getCharteredBusTypeId() {
		return charteredBusTypeId;
	}

	public void setCharteredBusTypeId(String charteredBusTypeId) {
		this.charteredBusTypeId = charteredBusTypeId;
	}

}
