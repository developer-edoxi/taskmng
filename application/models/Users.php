<?php

class Users extends CI_Model
{



public function gettasks()
{


        
        $query=$this->db->query("select t.*,m.id as mid,m.name from tasks t,manager m where t.createdby=m.id");

        return $query->result();


}


public function getmytask($id)
{


        
        $query=$this->db->query("select * from allocation a,tasks t,`user` u where a.userid=u.id and a.taskid=t.taskid and u.id=$id and t.status!='completed'");

        return $query->result();


}

public function getcomptask($id)
{


        
        $query=$this->db->query("select * from allocation a,tasks t,`user` u,taskcomments c where a.userid=u.id and a.taskid=t.taskid and c.taskid=t.taskid and u.id=$id and t.status='completed'");

        return $query->result();


}




public function getassigndata($id)
{


        
        $query=$this->db->query("select u.firstname,a.alocdate,a.status from allocation a,tasks t,`user` u where a.userid=u.id and a.taskid=t.taskid and t.taskid=$id");

        return $query->result();


}

public function getmanagers()
{


        
        $query=$this->db->query("select * from manager");

        return $query->result();


}

public function getemployee()
{


        
        $query=$this->db->query("select * from `user`");

        return $query->result();


}


public function addtask($data)
{

        
        $response=$this->db->insert("tasks",$data);

        return $response;
       


}


public function assigntask($data)
{

        
        $response=$this->db->insert("allocation",$data);

        return $response;
       


}

public function commenttask($data)
{

        
        $response=$this->db->insert("taskcomments",$data);

        return $response;
       


}

public function updatetask($id)
{

        
        $response=$this->db->query("update tasks set `status`='assigned' where taskid=$id");

        return $response;
       


}

public function updatetaskcomplete($id)
{

        
        $response=$this->db->query("update tasks set `status`='completed' where taskid=$id");

        $response1=$this->db->query("update allocation set `status`='completed' where taskid=$id");

        if(($response==true)and($response1==true)){

                return true;
        }else{

                return false;
        }


}





}