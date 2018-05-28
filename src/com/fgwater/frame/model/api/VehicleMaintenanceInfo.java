package com.fgwater.frame.model.api;

import com.fgwater.core.model.BaseModel;
import org.apache.ibatis.type.Alias;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author chendp
 * @date 2018/5/22 09:21
 */

@Alias("VehicleMaintenanceInfo")
@Table(name = "api_t_vehicleMaintenanceInfo")
public class VehicleMaintenanceInfo extends BaseModel {


    @Id
    private  String id;
    @Column
    private  String orgnId;
    @Column
    private  String vehicleId;
    @Column
    private  String maintenanceId;
    @Column
    private  String maintenanceName;
    @Column
    private  String plateNo;
    @Column
    private  String contactPerson;
    @Column
    private  String contactNumber;
    @Column
    private  String maintenanceTime;

    @Column
    private  float kilometers;
    @Column
    private  String maintenanceDesc;
    @Column
    private  String remark;
    @Column
    private  float materialCostTotal;
    @Column
    private  float workingHoursTotal;
    @Column
    private  float maintenanceTotal;
    @Column
    private  String approveOrgn;
    @Column
    private  String approvePerson;
    @Column
    private  String approveDate;
    @Column
    private  String approveStatus;
    @Column
    private  String approveDesc;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrgnId() {
        return orgnId;
    }

    public void setOrgnId(String orgnId) {
        this.orgnId = orgnId;
    }

    public String getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(String vehicleId) {
        this.vehicleId = vehicleId;
    }

    public String getMaintenanceId() {
        return maintenanceId;
    }

    public void setMaintenanceId(String maintenanceId) {
        this.maintenanceId = maintenanceId;
    }

    public String getMaintenanceName() {
        return maintenanceName;
    }

    public void setMaintenanceName(String maintenanceName) {
        this.maintenanceName = maintenanceName;
    }

    public String getPlateNo() {
        return plateNo;
    }

    public void setPlateNo(String plateNo) {
        this.plateNo = plateNo;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getMaintenanceTime() {
        return maintenanceTime;
    }

    public void setMaintenanceTime(String maintenanceTime) {
        this.maintenanceTime = maintenanceTime;
    }

    public float getKilometers() {
        return kilometers;
    }

    public void setKilometers(float kilometers) {
        this.kilometers = kilometers;
    }

    public String getMaintenanceDesc() {
        return maintenanceDesc;
    }

    public void setMaintenanceDesc(String maintenanceDesc) {
        this.maintenanceDesc = maintenanceDesc;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public float getMaterialCostTotal() {
        return materialCostTotal;
    }

    public void setMaterialCostTotal(float materialCostTotal) {
        this.materialCostTotal = materialCostTotal;
    }

    public float getWorkingHoursTotal() {
        return workingHoursTotal;
    }

    public void setWorkingHoursTotal(float workingHoursTotal) {
        this.workingHoursTotal = workingHoursTotal;
    }

    public float getMaintenanceTotal() {
        return maintenanceTotal;
    }

    public void setMaintenanceTotal(float maintenanceTotal) {
        this.maintenanceTotal = maintenanceTotal;
    }

    public String getApproveOrgn() {
        return approveOrgn;
    }

    public void setApproveOrgn(String approveOrgn) {
        this.approveOrgn = approveOrgn;
    }

    public String getApprovePerson() {
        return approvePerson;
    }

    public void setApprovePerson(String approvePerson) {
        this.approvePerson = approvePerson;
    }

    public String getApproveDate() {
        return approveDate;
    }

    public void setApproveDate(String approveDate) {
        this.approveDate = approveDate;
    }

    public String getApproveStatus() {
        return approveStatus;
    }

    public void setApproveStatus(String approveStatus) {
        this.approveStatus = approveStatus;
    }

    public String getApproveDesc() {
        return approveDesc;
    }

    public void setApproveDesc(String approveDesc) {
        this.approveDesc = approveDesc;
    }
}
