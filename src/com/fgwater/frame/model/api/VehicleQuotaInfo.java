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

@Alias("VehicleQuotaInfo")
@Table(name = "api_t_vehicleQuotaInfo")
public class VehicleQuotaInfo extends BaseModel {


    @Id
    private  String id;
    @Column
    private  String orgnId;
    @Column
    private  String quotaDate;
    @Column
    private  int count1;
    @Column
    private  int count2;
    @Column
    private  int count3;
    @Column
    private  int count4;
    @Column
    private  int count5;
    @Column
    private  int count6;
    @Column
    private  int count7;
    @Column
    private  int count8;
    @Column
    private  int count9;
    @Column
    private  int countAll;


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

    public String getQuotaDate() {
        return quotaDate;
    }

    public void setQuotaDate(String quotaDate) {
        this.quotaDate = quotaDate;
    }

    public int getCount1() {
        return count1;
    }

    public void setCount1(int count1) {
        this.count1 = count1;
    }

    public int getCount2() {
        return count2;
    }

    public void setCount2(int count2) {
        this.count2 = count2;
    }

    public int getCount3() {
        return count3;
    }

    public void setCount3(int count3) {
        this.count3 = count3;
    }

    public int getCount4() {
        return count4;
    }

    public void setCount4(int count4) {
        this.count4 = count4;
    }

    public int getCount5() {
        return count5;
    }

    public void setCount5(int count5) {
        this.count5 = count5;
    }

    public int getCount6() {
        return count6;
    }

    public void setCount6(int count6) {
        this.count6 = count6;
    }

    public int getCount7() {
        return count7;
    }

    public void setCount7(int count7) {
        this.count7 = count7;
    }

    public int getCount8() {
        return count8;
    }

    public void setCount8(int count8) {
        this.count8 = count8;
    }

    public int getCount9() {
        return count9;
    }

    public void setCount9(int count9) {
        this.count9 = count9;
    }

    public int getCountAll() {
        return countAll;
    }

    public void setCountAll(int countAll) {
        this.countAll = countAll;
    }
}
