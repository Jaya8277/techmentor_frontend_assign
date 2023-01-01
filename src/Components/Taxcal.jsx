import React, { useEffect, useState } from 'react'
import axios from 'axios';
const Taxcal = () => {
    const [srno,setSrno] = useState("");
    const [amount,setAmount] = useState(0);
    const [value,setValue] = useState(0);
    const[tax,setTax] = useState(0);
    const[data,setData] = useState([]);
const handleClick =()=> {


    // if(value == 0){
    //     setTax(amount*5/100)
    // }
    // else if(value==1){
    //     setTax(amount*8/100)
    // }else if(value==2){
    //     setTax(amount*10/100)
    // }
    if(value>2){
        alert("Value must be 0 , 1 or 2")
        window.location.reload()
    }
    let obj = {
        srno,amount:+(amount),itemtype:+(value)
    }

    axios.post("https://tense-gray-jumper.cyclic.app/postData",obj).then((res)=> {
        getData();
    })
    // getData();
}
useEffect (()=> {
    getData();
},[])
const getData = ()=> {
    axios.get("https://tense-gray-jumper.cyclic.app/getData").then((res)=>{
        // console.log(res)
        setData(res.data.invoice);
    }).catch((error)=>{
        console.log(error);
    })
}
const Calculate =(id)=> {
    let filterData = data.filter((elem)=>
        id===elem._id

    )
    if(filterData[0].itemtype === 0){
        setTax(filterData[0].amount*5/100)
    }
    else if(filterData[0].itemtype===1){
        setTax(filterData[0].amount*8/100)
    }else if(filterData[0].itemtype===2){
        setTax(filterData[0].amount*10/100)
    }
   
    console.log(filterData);
}
const Delete =(_id)=> {
    console.log(_id)
    axios.delete(`https://tense-gray-jumper.cyclic.app/delete/${_id}`).then((res)=>{
        getData();

    }).catch((err)=>{
        console.log(err)
    })
    getData();
}




  return (
    <div>
    <div className='main'>
    <h1><u>Tax Calculator</u></h1>
    {/* <h1>tax:{tax}</h1> */}
        <input onChange={(e)=>setSrno(e.target.value)} type='text' placeholder="Enter serial number"/><br/>
        <br/>
        <input onChange={(e)=>setAmount(e.target.value)} type='number' placeholder="Enter Amount"/><br/><br/>
        <input onChange={(e)=>setValue(e.target.value)}  type='number' placeholder="Enter Item_Type"/><br/><br/>
        <button className='btn' onClick={handleClick}>Add</button>
        </div>
        <div>
            <table>
                <tr>
                    <th>Sr.no</th>
                    <th>Amount</th>
                    <th>Item Type</th>
                    <th>Calculate Tax</th>
                    <th>Delete</th>
                </tr>
                <tbody>
                   {
                    data.map((elem)=>{
                        return (
                            <tr>
                                <td>{elem.srno}</td>
                                <td>{elem.amount}</td>
                                <td>{elem.itemtype}</td>
                                <td><button onClick={()=>{Calculate(elem._id)}}> Calculate</button></td>
                                <td><button onClick={()=>{Delete(elem._id)}}> Delete</button></td>
                            </tr>
                        )
                    })
                   }
                </tbody>
            </table>
            <div>
                <h2>Calculated Tax value :<input value={tax} type="number" placeholder="TaxValue"/></h2>
            </div>
        </div>
    </div>
  )
}

export default Taxcal