package com.fgwater.frame.model.logistics;

import com.fgwater.core.model.BaseModel;
import org.apache.ibatis.type.Alias;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Alias("CarTypePrice")
@Table(name = "t_archives_car_type_price_list")
public class CarTypePrice extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	@Column
	private  String fleetId;
	@Column
	private String  companyId;
	@Column
	private String  businessType;


	@Column
	private  String carTtypeId;
	@Column
	private String  ascription;
	@Column
	private int  startPrice;


	@Column
	private  int startKilometres;
	@Column
	private int  startTime;
	@Column
	private float  kilometresPrice;


	@Column
	private  float timePrice;
	@Column
	private float  emptyPrice;
	@Column
	private float  nighttimePrice;
	@Column
	private float  cancelPrice;
	@Column
	private float  emfptyKilometres ;

	@Column
	private String  nighttimeBegin;
	@Column
	private String  nighttimeEnd;








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

	public String getBusinessType() {
		return businessType;
	}

	public void setBusinessType(String businessType) {
		this.businessType = businessType;
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

	public int getStartPrice() {
		return startPrice;
	}

	public void setStartPrice(int startPrice) {
		this.startPrice = startPrice;
	}

	public int getStartKilometres() {
		return startKilometres;
	}

	public void setStartKilometres(int startKilometres) {
		this.startKilometres = startKilometres;
	}

	public int getStartTime() {
		return startTime;
	}

	public void setStartTime(int startTime) {
		this.startTime = startTime;
	}

	public float getKilometresPrice() {
		return kilometresPrice;
	}

	public void setKilometresPrice(float kilometresPrice) {
		this.kilometresPrice = kilometresPrice;
	}

	public float getTimePrice() {
		return timePrice;
	}

	public void setTimePrice(float timePrice) {
		this.timePrice = timePrice;
	}

	public float getEmptyPrice() {
		return emptyPrice;
	}

	public void setEmptyPrice(float emptyPrice) {
		this.emptyPrice = emptyPrice;
	}

	public float getNighttimePrice() {
		return nighttimePrice;
	}

	public void setNighttimePrice(float nighttimePrice) {
		this.nighttimePrice = nighttimePrice;
	}

	public float getCancelPrice() {
		return cancelPrice;
	}

	public void setCancelPrice(float cancelPrice) {
		this.cancelPrice = cancelPrice;
	}

	public String getNighttimeBegin() {
		return nighttimeBegin;
	}

	public void setNighttimeBegin(String nighttimeBegin) {
		this.nighttimeBegin = nighttimeBegin;
	}

	public String getNighttimeEnd() {
		return nighttimeEnd;
	}

	public void setNighttimeEnd(String nighttimeEnd) {
		this.nighttimeEnd = nighttimeEnd;
	}

	public float getEmfptyKilometres() {
		return emfptyKilometres;
	}

	public void setEmfptyKilometres(float emfptyKilometres) {
		this.emfptyKilometres = emfptyKilometres;
	}
}
