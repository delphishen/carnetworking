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

@Alias("OilStationInfo")
@Table(name = "api_t_oilStationInfo")
public class OilStationInfo extends BaseModel {


    @Id
    private  String id;
    @Column
    private  String orgnId;
    @Column
    private  String oilStationName;
    @Column
    private  String chargePerson;
    @Column
    private  String contactNumber;
    @Column
    private  String scale;
    @Column
    private  String address;
    @Column
    private  String remark;

    @Column
    private  double lon ;
    @Column
    private  double  lat;


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

    public String getOilStationName() {
        return oilStationName;
    }

    public void setOilStationName(String oilStationName) {
        this.oilStationName = oilStationName;
    }

    public String getChargePerson() {
        return chargePerson;
    }

    public void setChargePerson(String chargePerson) {
        this.chargePerson = chargePerson;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getScale() {
        return scale;
    }

    public void setScale(String scale) {
        this.scale = scale;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public double getLon() {
        return lon;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }
}
