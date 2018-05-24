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

@Alias("DeployApproveInfo")
@Table(name = "api_t_deployApproveInfo")
public class DeployApproveInfo extends BaseModel {


    @Id
    private  String id;
    @Column
    private  String orgnId;
    @Column
    private  String deployDate;
    @Column
    private  String deployVehicle;
    @Column
    private  String deployOrgn;
    @Column
    private  String plateNo;
    @Column
    private  String brandName;
    @Column
    private  String vehicleModel;
    @Column
    private  String displacement;
    @Column
    private  String engineNo;
    @Column
    private  String registrationDate;
    @Column
    private  String identificationNo;
    @Column
    private  String useYears;
    @Column
    private  float kilometers;
    @Column
    private  String scrapYears;
    @Column
    private  String deviceDesc;
    @Column
    private  String engineDesc;
    @Column
    private  String driveDesc;
    @Column
    private  String rotationDesc;
    @Column
    private  String electricalDesc;
    @Column
    private  String toolsDesc;
    @Column
    private  float price;
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

    public String getDeployDate() {
        return deployDate;
    }

    public void setDeployDate(String deployDate) {
        this.deployDate = deployDate;
    }

    public String getDeployVehicle() {
        return deployVehicle;
    }

    public void setDeployVehicle(String deployVehicle) {
        this.deployVehicle = deployVehicle;
    }

    public String getDeployOrgn() {
        return deployOrgn;
    }

    public void setDeployOrgn(String deployOrgn) {
        this.deployOrgn = deployOrgn;
    }

    public String getPlateNo() {
        return plateNo;
    }

    public void setPlateNo(String plateNo) {
        this.plateNo = plateNo;
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

    public String getDisplacement() {
        return displacement;
    }

    public void setDisplacement(String displacement) {
        this.displacement = displacement;
    }

    public String getEngineNo() {
        return engineNo;
    }

    public void setEngineNo(String engineNo) {
        this.engineNo = engineNo;
    }

    public String getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(String registrationDate) {
        this.registrationDate = registrationDate;
    }

    public String getIdentificationNo() {
        return identificationNo;
    }

    public void setIdentificationNo(String identificationNo) {
        this.identificationNo = identificationNo;
    }

    public String getUseYears() {
        return useYears;
    }

    public void setUseYears(String useYears) {
        this.useYears = useYears;
    }

    public float getKilometers() {
        return kilometers;
    }

    public void setKilometers(float kilometers) {
        this.kilometers = kilometers;
    }

    public String getScrapYears() {
        return scrapYears;
    }

    public void setScrapYears(String scrapYears) {
        this.scrapYears = scrapYears;
    }

    public String getDeviceDesc() {
        return deviceDesc;
    }

    public void setDeviceDesc(String deviceDesc) {
        this.deviceDesc = deviceDesc;
    }

    public String getEngineDesc() {
        return engineDesc;
    }

    public void setEngineDesc(String engineDesc) {
        this.engineDesc = engineDesc;
    }

    public String getDriveDesc() {
        return driveDesc;
    }

    public void setDriveDesc(String driveDesc) {
        this.driveDesc = driveDesc;
    }

    public String getRotationDesc() {
        return rotationDesc;
    }

    public void setRotationDesc(String rotationDesc) {
        this.rotationDesc = rotationDesc;
    }

    public String getElectricalDesc() {
        return electricalDesc;
    }

    public void setElectricalDesc(String electricalDesc) {
        this.electricalDesc = electricalDesc;
    }

    public String getToolsDesc() {
        return toolsDesc;
    }

    public void setToolsDesc(String toolsDesc) {
        this.toolsDesc = toolsDesc;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
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
