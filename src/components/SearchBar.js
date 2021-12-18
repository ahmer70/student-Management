import React,{useState,useEffect} from 'react';
import axios from "axios";
function SearchBar(props) {
    const [allData,setAllData] = useState([]);
    const [filteredData,setFilteredData] = useState(allData);
    useEffect(() => {
        axios('http://localhost:5000/api/notes/fetchallnotes')
        .then(response => {
        console.log(response.data)
        setAllData(response.data);
        setFilteredData(response.data);
        })
        .catch(error => {
        console.log('Error getting fake data: ' + error);
        })
        }, []);

        const handleSearch = (event) => {
            let value = event.target.value.toLowerCase();
            let result = [];
            console.log(value);
            result = allData.filter((data) => {
            return data.title.search(value) != -1;
            });
            setFilteredData(result);
            }
        return (
            <div className="mx-4 my-3" >
            <div style={{ margin: '0 auto',  }}>
            
            <input type="text" onChange={(event) =>handleSearch(event)}  style={{border:"1px solid gray"}}/>
            </div>
            <div style={{padding:10}}>
            {filteredData.map((value,index)=>{
            return(
            <div key={value.id}>
            
            {value.title}
            
            </div>
            )
            })}
            </div>
            </div>
        );
    
}

export default SearchBar
