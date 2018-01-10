package com.fgwater.frame.service.system;

import com.fgwater.core.service.BaseService;
import com.fgwater.frame.model.logistics.TaskList;
import com.fgwater.frame.model.system.Employee;
import com.fgwater.frame.model.system.Fleet;
import com.fgwater.frame.model.system.Menu;
import net.sf.json.JSONArray;

import java.util.List;
import java.util.Map;

public interface FleetService extends BaseService {

    public List<Fleet> getTreeAll(Map<String, String> params);

    public boolean saveOrUpdate(Fleet fleet);

   /* public void  delete(Fleet fleet);*/
    public  void  delete(Fleet fleet);

}
