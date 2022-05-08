/**
 * @author Farhin Damania
 * @email fr454807@dal.ca
 */
import { Grid, Paper, TextField } from "@material-ui/core";
import React,{useState,useEffect} from "react";
import "./ReportUpload.css"
// import DateFnsUtils from '@date-io/date-fns';
import {  KeyboardDateTimePicker,MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Radio,RadioGroup } from "@material-ui/core";
import { FormControlLabel,FormControl ,FormLabel  } from "@material-ui/core";
import Button from '@mui/material/Button';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { InputAdornment } from "@material-ui/core";
import { styled } from "@material-ui/core";
import axios from "axios";

import { useSelector } from "react-redux";

function ReportUpload({history}){
    
//delcaring the constants to maintain states of object
const [testType,settestType]=useState("");
const [cost,setcost]=useState("");
const [date,setdate]=useState("");
const [status,setstatus]=useState("");
const [docURI,setdocURI]=useState("");
const [comments,setcomments]=useState("");
const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
const handleSubmit=()=>{

 //checking for alerts
if(testType===""){
  alert("Enter lab test type")
}
else if(cost===""){
  alert("Enter lab test cost")
}
else if(date===""){
  alert("Enter lab test date")
}
else if(status===""){
  alert("Select the lab test status")
}
else if(docURI===""){
  alert("Enter lab report URL")
}
else if(comments===""){
  alert("Enter lab test comments")
}
    else{
        
    //api call for post 
        axios.post("/api/pathology/addPathaAppointment",
        
            {

                patientName:userInfo.name,
                patientEmail:userInfo.email,
                testType,
                cost,
                date,
                status,
                docURI,
                comments
            }
          
        ).then(function (res) {
            if (res.status === 200) {
                alert(" Successfully Uploaded Lab Report");
                history.push("/viewreports");}
          })
    }
    

}

    return(
    
        <form className="form" onSubmit={handleSubmit} style={{marginTop:"10px"}}>
    
            <Paper elevation={20} className="newpaperstyle">
        <Grid >
          <h2 className="h2style">Enter the Lab Report Details here!</h2><br/>
        </Grid>

       
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
            <Grid item xs={6} >
            <TextField required label="Patient Name" name="patientName" variant="filled" value={userInfo.name} onChange={()=>{}} className="grid"/> <hr className="hr"/>
            <TextField required label="Patient Email" name="patientEmail" variant="filled" color="success" value={userInfo.email} onChange={()=>{}}  className="grid" /><hr className="hr"/>
            <TextField required label="Test Type" name="testname" variant="filled" color="success" value={testType} onChange={(e)=>settestType(e.target.value)}  className="grid"/>
            <hr className="hr"/>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled"  >
           
          <FilledInput 
            id="price" className="grid"
            startAdornment={<InputAdornment position="start" >$</InputAdornment>} value={cost} onChange={(e)=>setcost(e.target.value)} 
          />
        </FormControl>
            </Grid>
            <Grid item xs={6}>
                <div style={{marginTop:"0px"}}>
               <TextField required label="2022-03-30" name="date" variant="filled" value={date} onChange={(e)=>setdate(e.target.value)}  className="url" size="large" />
               </div>
                <div style={{marginTop:"20px"}}>
               
                <FormControl >
                    <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                            <RadioGroup
                             onChange={(e)=>{setstatus(e.target.value);console.log(e.target.value)}}  
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group">
                            
                                <FormControlLabel value="inprogress" control={<Radio />}label="In Progress" />
                                <FormControlLabel value="completed" control={<Radio />} label="Completed" />
                               
                            </RadioGroup>
                            </FormControl>

               </div><br/>
               <div style={{marginTop:"10px"}}>
               <TextField required label="Please enter the URL of lab report" name="url" variant="filled" className="url" value={docURI} onChange={(e)=>setdocURI(e.target.value)}  size="large"/>
               </div><br/>
               <div style={{marginTop:"10px"}} >
               <TextField label="Write your comments here" name="comments" variant="filled" className="url"  value={comments} onChange={(e)=>setcomments(e.target.value)} size="large"/>
               </div>
                </Grid>
                <div  style={{marginTop:"30px"}}> <Button variant="contained" value="submit" onClick={handleSubmit}  color="success"> Submit
                </Button></div>
                </Grid>
                </Paper>
        
        </form>
        
    )
}

export default ReportUpload;