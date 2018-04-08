package com.fgwater.frame.model.system;

import com.fgwater.core.model.BaseModel;
import org.apache.ibatis.type.Alias;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Alias("Role")
@Table(name = "t_system_role")
public class Role extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	@Column
	private String fleetId;

	@Column
	private String roleName;

	@Column
	private String remark;

	@Column
	private int flag;


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

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Override
	public int getFlag() {
		return flag;
	}

	@Override
	public void setFlag(int flag) {
		this.flag = flag;
	}
}
