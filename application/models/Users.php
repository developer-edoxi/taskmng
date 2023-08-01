<?php

class Users extends CI_Model
{



public function gettasks()
{


        
        $query=$this->db->query("select t.*,m.id as mid,m.name from tasks t,manager m where t.createdby=m.id");

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

public function updatetask($id)
{

        
        $response=$this->db->query("update tasks set `status`='assigned' where taskid=$id");

        return $response;
       


}





}