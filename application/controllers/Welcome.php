<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/userguide3/general/urls.html
	 */

	 function __construct(){
        parent::__construct();
		$this->load->helper('url');
		$this->load->library('session');
		$this->load->model("Users");


	}

	public function index()
	{

		$data['manager']=$this->Users->getmanagers();

		$data['employee']=$this->Users->getemployee();

		$data['task']=$this->Users->gettasks();
        
		$this->load->view('home',$data);


		
	}


	public function viewtask($slug)
	{

		

		$data['mytask']=$this->Users->getmytask($slug);

		$data['comtask']=$this->Users->getcomptask($slug);

		$this->load->view('viewtask',$data);
    
	}

	public function getdata()
	{

		$q=$this->input->get('q');
    
		$data['assignresult']=$this->Users->getassigndata($q);

		$json = json_encode($data['assignresult']);

		echo $json;


	}


	public function inserttask()
	{


		if($this->input->post('submit')){

	
	
			
			$data = array(  
				'subject'     => $this->input->post('subject'),  
				'createdby'  => $this->input->post('createdby'),  
                'startdate'     => $this->input->post('sdate'),  
				'lastdate'  => $this->input->post('ldate'),  
                'description'     => $this->input->post('description'),
                'status'   => 'created',
				
				); 


			$response=$this->Users->addtask($data);
			
			if($response==true){

				$this->session->set_flashdata('msg','Success');

				redirect(base_url('home'));

				$this->session->unset_flashdata('msg');

			}else{

				$this->session->set_flashdata('msg','Success');

				redirect(base_url('home'));

				$this->session->unset_flashdata('msg');

			}
		

		}


	}

	public function assigntask()
	{


		if($this->input->post('submit')){

	
	
			
			$data = array(  
				'taskid'     => $this->input->post('taskid'),  
				'userid'  => $this->input->post('assignto'),  
                'status'   => 'assigned',
				
				); 


			$response=$this->Users->assigntask($data);

			$response1=$this->Users->updatetask($this->input->post('taskid'));
			
			if(($response==true)and($response1==true)){

				$this->session->set_flashdata('msg','Success');

				redirect(base_url());

				$this->session->unset_flashdata('msg');

			}else{

				$this->session->set_flashdata('msg','Success');

				redirect(base_url());

				$this->session->unset_flashdata('msg');

			}
		

		}


	}


	public function updateassigntask()
	{


		if($this->input->post('submit')){

	
	
			
			$data = array(  
				'taskid'     => $this->input->post('taskid'),  
				'userid'  => $this->input->post('userid'),  
                'comment'   => $this->input->post('description'),
				
				); 

			$userid=$this->input->post('userid');
			$response=$this->Users->commenttask($data);

			$response1=$this->Users->updatetaskcomplete($this->input->post('taskid'));
			
			if(($response==true)and($response1==true)){

				$this->session->set_flashdata('msg','Success');

				

				redirect(base_url("viewtask/$userid"));

				$this->session->unset_flashdata('msg');

			}else{

				$this->session->set_flashdata('msg','Success');

				redirect(base_url());

				$this->session->unset_flashdata('msg');

			}
		

		}


	}



}
