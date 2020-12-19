import React from 'react';
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';  
import Grid from '@material-ui/core/Grid'

import axios from 'axios'; 

import NaveBar from './NaveBar';


class DataTable_custom extends React.Component {
    constructor(props) {  
               super(props)  
                 this.state = {  
                    items: []  
            }          
          } 
    componentDidMount() {  

    axios.get('https://5fdb963891f19e00173348b7.mockapi.io/items').then(response => {  
      console.log(response.data);  

      this.setState({  

        items: response.data  

      });  

    });  

  }  

  render() {  

    console.log(this.state.items);  

    return (  
        <div>        
        <Grid container spacing={1}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
       
      
      <TableContainer component={Paper}>  

        <Table stickyHeader  aria-label="sticky table">  

          <TableHead>  

            <TableRow>  

              <TableCell style={{paddingRight:"60px"}} align="right">User Name</TableCell>  


              <TableCell style={{paddingRight:"60px"}} align="right" >Randum Number</TableCell>  

            </TableRow>  

          </TableHead>  

        <TableBody>  

            {  

              this.state.items.map((p, index) => {  

                return <TableRow key={index}>  

                  <TableCell component="th" scope="row">  

                    {p.Id}  

                 </TableCell>  


                  <TableCell>{p.itemsname}</TableCell>  
                  <TableCell >{p.itemcode}</TableCell>  

                </TableRow>  

              })  

            }  

          </TableBody>  

        </Table>  

      </TableContainer>  
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
    </div>
    );  

  }  
 }
 
 export default DataTable_custom 