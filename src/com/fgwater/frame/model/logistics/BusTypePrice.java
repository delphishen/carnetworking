package com.fgwater.frame.model.logistics;

import com.fgwater.core.model.BaseModel;
import org.apache.ibatis.type.Alias;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Alias("BusTypePrice")
@Table(name = "t_archives_car_type_chartered_bus_price_list")
public class BusTypePrice extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	@Column
	private  String fleetId;
	@Column
	private String  companyId;
	@Column
	private String  charteredBusType;
	@Column
	private  String carTtypeId;
	@Column
	private String  ascription;
	@Column
	private float  cancelPrice;
	@Column
	private  float setMealPrice;
	@Column
	private int  setMealKilometres;
	@Column
	private int  setMealTime;
	@Column
	private  float excessPrice;
	@Column
	private float  overtimePrice;
	@Column
	private int maxMealKilometres;

	@Column
	private float  maxExcessPrice;


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

	public String getCharteredBusType() {
		return charteredBusType;
	}

	public void setCharteredBusType(String charteredBusType) {
		this.charteredBusType = charteredBusType;
	}

	public String getCarTtypeId() {
		return carTtypeId;
	}

	public void setCarTtypeId(String carTtypeId) {
		this.carTtypeId = carTtypeId;
	}

	public String getAscription() {
		return ascription;
	}

	public void setAscription(String ascription) {
		this.ascription = ascription;
	}

	public float getCancelPrice() {
		return cancelPrice;
	}

	public void setCancelPrice(float cancelPrice) {
		this.cancelPrice = cancelPrice;
	}

	public float getSetMealPrice() {
		return setMealPrice;
	}

	public void setSetMealPrice(float setMealPrice) {
		this.setMealPrice = setMealPrice;
	}

	public int getSetMealKilometres() {
		return setMealKilometres;
	}

	public void setSetMealKilometres(int setMealKilometres) {
		this.setMealKilometres = setMealKilometres;
	}

	public int getSetMealTime() {
		return setMealTime;
	}

	public void setSetMealTime(int setMealTime) {
		this.setMealTime = setMealTime;
	}

	public float getExcessPrice() {
		return excessPrice;
	}

	public void setExcessPrice(float excessPrice) {
		this.excessPrice = excessPrice;
	}

	public float getOvertimePrice() {
		return overtimePrice;
	}

	public void setOvertimePrice(float overtimePrice) {
		this.overtimePrice = overtimePrice;
	}

	public int getMaxMealKilometres() {
		return maxMealKilometres;
	}

	public void setMaxMealKilometres(int maxMealKilometres) {
		this.maxMealKilometres = maxMealKilometres;
	}

	public float getMaxExcessPrice() {
		return maxExcessPrice;
	}

	public void setMaxExcessPrice(float maxExcessPrice) {
		this.maxExcessPrice = maxExcessPrice;
	}
}
