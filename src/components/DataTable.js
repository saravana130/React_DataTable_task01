import React, { useState, useEffect } from 'react';
import '../App.css';
import { forwardRef } from 'react';

import swal from 'sweetalert';
import validator from 'validator';
import Grid from '@material-ui/core/Grid'
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { Delete } from '@material-ui/icons';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios'


const tableIcons={
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const api = axios.create({
    baseURL: `https://5fdb963891f19e00173348b7.mockapi.io`
  })
  
  

const DataTable= ()=>{
    
    const columns=[
        {title: "id", field: "id", hidden: true},
        {title: "User name", field: "itemname"},
        {title: "Randam num", field: "itemcode"},
      ];

    
    const [items, setItems] = useState([]); 
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    useEffect(() => {    
          const GetData = async () => {    
          const result = await axios('https://5fdb963891f19e00173348b7.mockapi.io/items');    
          setItems(result.data);    
          }  
          GetData();    

    }, []); 


    // useEffect(() => { 
    //   api.get("/items")
    //         .then(res => {             
    //             setItems(res.data)
    //          })
    //          .catch(error=>{
    //              console.log("Error")
    //          })
    //   }, [])
    

      const AddNewRow = (newData, resolve) => {
        let errorList = []
        if(newData.itemname === undefined){
          errorList.push("Please enter User name")
        }
        if(newData.itemcode === undefined && validator.isNumeric(newData.itemcode)===false){
          errorList.push("Randum number field only accept Numeric value ")
        }
      
        if(errorList.length < 1){ 
            api.post("/items", newData)
            .then(res => {
              let dataToAdd = [...items];
              dataToAdd.push(newData);
              setItems(dataToAdd);
              resolve()
              setErrorMessages([])
              setIserror(false)
            })
            .catch(error => {
              setErrorMessages(["Cannot add data. Server error!"])
              setIserror(true)
              resolve()
            })
          }else{
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
          }
    
        
      }

        const handleModelDelete = (oldData) => {

          swal({
            title: "Are you sure? You wont to Delete : "+oldData.itemname,
            text: "Once Row deleted, you will not able to recover this Data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              api.delete("/items/"+oldData.id)
              .then(res => {
                const dataDelete = [...items];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setItems([...dataDelete]);
              })
              .catch(error => {
                setErrorMessages(["Delete failed! Server error"])
                setIserror(true)
                
              })
              swal("Data on Row has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Delete Canseled");
            }
          });

        }
        

        const handleRowUpdate = (newData, oldData, resolve) => {
          let errorList = []
          if(newData.itemname === ""){
            errorList.push("Please enter user name")
          }
          if(newData.itemcode === "" && validator.isNumeric(newData.itemcode)===false){
            errorList.push("Randum number field only accept Numeric value /")
          }
          
          console.log(newData)
          if(errorList.length < 1){
            api.put("/items/"+newData.id, newData)
            .then(res => {
              const dataUpdate = [...items];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setItems([...dataUpdate]);
              resolve()
              setIserror(false)
              setErrorMessages([])
            })
            .catch(error => {
              setErrorMessages(["Update failed! Server error"])
              setIserror(true)
              resolve()
              
            })
          }else{
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
      
          }
          
        }

    
        return(
          
         <div>        
          <Grid container spacing={1}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
          <div>
            {iserror && 
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
            </div>
            <MaterialTable
                title="User List"
                columns={columns}
                data={items}
                icons={tableIcons}
                
                editable={{
                    onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    AddNewRow(newData, resolve)
                  }),
                  onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                      handleRowUpdate(newData, oldData, resolve);
                      
                  })
                  
                }}
                actions={[
                  {
                    icon: DeleteOutline,
                    tooltip: 'Delete',
                    onClick: (event, rowData) => handleModelDelete(rowData) 
                  }
                ]}
                options={{
                  headerStyle: {
                    backgroundColor: '#00acc1',
                    color: 'white'
                  },
                  rowStyle: {
                    backgroundColor: '#e0f7fa',
                  },
                  pageSize:10,
                  
                }}
                
             />
            
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
          </div>
         
          
    
        );

    } ;

    export default DataTable;
