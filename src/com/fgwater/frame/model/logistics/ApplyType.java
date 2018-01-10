package com.fgwater.frame.model.logistics;

import com.fgwater.core.model.BaseModel;
import org.apache.ibatis.type.Alias;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Alias("ApplyType")
@Table(name = "t_car_apply_settlement")
public class ApplyType extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	@Column
	private  String fleetId;

	@Column
	private String  settlement;


	@Column
	private String  remark;


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

	public String getSettlement() {
		return settlement;
	}

	public void setSettlement(String settlement) {
		this.settlement = settlement;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
}
