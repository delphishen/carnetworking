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

@Alias("ApplyApproveInfo")
@Table(name = "api_t_applyApproveInfo")
public class ApplyApproveInfo extends BaseModel {


    @Id
    private  String id;
    @Column
    private  String orgnId;
    @Column
    private  String applyDate;
    @Column
    private  String vehicleType;
    @Column
    private  String brandName;
    @Column
    private  String vehicleModel;
    @Column
    private  float displacement;
    @Column
    private  int applyNum;
    @Column
    private  String vehicleOrigin;
    @Column
    private  float price;
    @Column
    private  String vehicleUse;
    @Column
    private  String reason;
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

    public String getApplyDate() {
        return applyDate;
    }

    public void setApplyDate(String applyDate) {
        this.applyDate = applyDate;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getVehicleModel() {
        return vehicleModel;
    }

    public void setVehicleModel(String vehicleModel) {
        this.vehicleModel = vehicleModel;
    }

    public float getDisplacement() {
        return displacement;
    }

    public void setDisplacement(float displacement) {
        this.displacement = displacement;
    }

    public int getApplyNum() {
        return applyNum;
    }

    public void setApplyNum(int applyNum) {
        this.applyNum = applyNum;
    }

    public String getVehicleOrigin() {
        return vehicleOrigin;
    }

    public void setVehicleOrigin(String vehicleOrigin) {
        this.vehicleOrigin = vehicleOrigin;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getVehicleUse() {
        return vehicleUse;
    }

    public void setVehicleUse(String vehicleUse) {
        this.vehicleUse = vehicleUse;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
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
