import React, { useState,useEffect } from 'react';
import FlatList from 'flatlist-react';
import './App.css';
import logo from './logo.svg'

function App() {
  const [text,setText] = useState();
  const [data, setData] = useState([]);

  function ChangeText(event){
   
    event.target.value ==""?<p>List is Empty!</p>:(
    fetch('https://www.googleapis.com/books/v1/volumes?q='+event.target.value,{
      "method":"GET"
    })
  .then(response => response.json())
  .then(json => {setData(json.items)
    console.log(json.items[0].volumeInfo)
  })
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Book Search Engine</h1>
 <input type="text" onChange={ChangeText} 
        style={{width:300,alignSelf:'center',marginTop:20,color:"black",marginBottom:20}} placeholder="Search Book" />
        
        <table className="table table-hover" border="1px">
            <tr>
              <th>Title</th>
              <th>Publisher</th>
              <th>Publisher Date</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
            
          <FlatList
              list={data}
              renderItem={(item)=> 
              <tr className="Rw">
                  <td width="40%">{item.volumeInfo.title}</td>
                  <td width="20%">{item.volumeInfo.publisher==null?(<p>No Publisher Name</p>):item.volumeInfo.publisher}</td>
                  <td width="20%">{item.volumeInfo.publishedDate==null?(<p>No Date</p>):item.volumeInfo.publishedDate}</td>
                  <td width="10%"><img src={item.volumeInfo.imageLinks.thumbnail} style={{height:80,width:50}} /></td>
                  <td width="10%"><a href={item.volumeInfo.previewLink} target="_blank" className="preview">Preview</a></td>
              </tr>
            }
              renderWhenEmpty={() => <tr>List is empty!</tr>}
             
          />
          </table>              
 
      </header>
      
    </div>
  );
}

export default App;
