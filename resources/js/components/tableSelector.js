import React, {useState, useEffect} from "react";
import {useStateValue} from "../states/StateProvider";
import Api from "../api/api";


const TableSelector = () => {
    const [{table}, dispatch] = useStateValue();
    const [tables,setTables]=useState([])

    useEffect(async () => {
        await Api().get('/tables')
            .then(res=>{
                console.log('tables',res.data)
                setTables(res.data)
            })
    }, []);


    return (
        <div className='selectOption'>
            <select
                value={table}
                onChange={(e) =>
                    dispatch({type: "setTable", item:e.target.value})}
            >
                <option style={{display: 'none'}}>* Table No</option>
                {
                    tables.map((a) => (
                        <option key={a.no} value={a.no}>
                            {a.no}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default TableSelector
