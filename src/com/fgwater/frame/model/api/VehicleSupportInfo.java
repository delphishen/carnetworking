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

@Alias("VehicleSupportInfo")
@Table(name = "api_t_vehicleSupportInfo")
public class VehicleSupportInfo extends BaseModel {


    @Id
    private  String id;
    @Column
    private  String orgnId;
    @Column
    private  String vehicleId;
    @Column
    private  String supportPerson;
    @Column
    private  String incumbencyLevel;
    @Column
    private  String job;
    @Column
    private  String appointmentDate;
    @Column
    private  String enjoyLevel;
    @Column
    private  String incumbencyType;
    @Column
    private  String remark;


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

    public String getSupportPerson() {
        return supportPerson;
    }

    public void setSupportPerson(String supportPerson) {
        this.supportPerson = supportPerson;
    }

    public String getIncumbencyLevel() {
        return incumbencyLevel;
    }

    public void setIncumbencyLevel(String incumbencyLevel) {
        this.incumbencyLevel = incumbencyLevel;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getEnjoyLevel() {
        return enjoyLevel;
    }

    public void setEnjoyLevel(String enjoyLevel) {
        this.enjoyLevel = enjoyLevel;
    }

    public String getIncumbencyType() {
        return incumbencyType;
    }

    public void setIncumbencyType(String incumbencyType) {
        this.incumbencyType = incumbencyType;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
