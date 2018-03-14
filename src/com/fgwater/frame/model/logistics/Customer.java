package com.fgwater.frame.model.logistics;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.ibatis.type.Alias;

import com.fgwater.core.model.BaseModel;

import java.io.Serializable;

@Alias("Customer")
@Table(name = "t_archives_driver")
public class Customer extends  BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	private  String id;

	@Column
	private  String fleetId; //车队服务平台id
	@Column
	private  String driverName; //司机姓名
	@Column
	private  String companyId;// 所属单位机构名称
	@Column
	private  float score;//最近评分
	@Column
	private  String statuesId;  //当前状态（在岗不在岗）
	@Column
	private  String grade;//级别
	@Column
	private  String sex;//性别
	@Column
	private  int  drivingExperience;// 驾龄
	@Column
	private  int  peccancyCount;// 违章次数
	@Column
	private  String dateOfBirth;// 出生年月

	@Column
	private  String driverTypeId;//司机类型ID
	@Column
	private  String mobile ;// 电话
	@Column
	private  String address;// 联系地址
	@Column
	private  String drivingLicenceNo;// 驾驶证号
	@Column
	private  String workLicenseNo;// 上岗证号
	@Column
	private  String validPeriod;// 驾驶证有效期


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

	public String getDriverName() {
		return driverName;
	}

	public void setDriverName(String driverName) {
		this.driverName = driverName;
	}

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public float getScore() {
		return score;
	}

	public void setScore(float score) {
		this.score = score;
	}

	public String getStatuesId() {
		return statuesId;
	}

	public void setStatuesId(String statuesId) {
		this.statuesId = statuesId;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public int getDrivingExperience() {
		return drivingExperience;
	}

	public void setDrivingExperience(int drivingExperience) {
		this.drivingExperience = drivingExperience;
	}

	public int getPeccancyCount() {
		return peccancyCount;
	}

	public void setPeccancyCount(int peccancyCount) {
		this.peccancyCount = peccancyCount;
	}

	public String getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getDriverTypeId() {
		return driverTypeId;
	}

	public void setDriverTypeId(String driverTypeId) {
		this.driverTypeId = driverTypeId;
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

	public String getDrivingLicenceNo() {
		return drivingLicenceNo;
	}

	public void setDrivingLicenceNo(String drivingLicenceNo) {
		this.drivingLicenceNo = drivingLicenceNo;
	}

	public String getWorkLicenseNo() {
		return workLicenseNo;
	}

	public void setWorkLicenseNo(String workLicenseNo) {
		this.workLicenseNo = workLicenseNo;
	}

	public String getValidPeriod() {
		return validPeriod;
	}

	public void setValidPeriod(String validPeriod) {
		this.validPeriod = validPeriod;
	}

	@Override
	public String toString() {
		return "DriverArchives{" +
				"id='" + id + '\'' +
				", fleetId='" + fleetId + '\'' +
				", driverName='" + driverName + '\'' +
				", companyId='" + companyId + '\'' +
				", score='" + score + '\'' +
				", statuesId='" + statuesId + '\'' +
				", grade='" + grade + '\'' +
				", sex='" + sex + '\'' +
				", drivingExperience=" + drivingExperience +
				", peccancyCount=" + peccancyCount +
				", dateOfBirth='" + dateOfBirth + '\'' +
				", driverTypeId='" + driverTypeId + '\'' +
				", mobile='" + mobile + '\'' +
				", address='" + address + '\'' +
				", drivingLicenceNo='" + drivingLicenceNo + '\'' +
				", workLicenseNo='" + workLicenseNo + '\'' +
				", validPeriod='" + validPeriod + '\'' +
				'}';
	}
	
	
}
