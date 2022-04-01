const Title = (props) =>{
        
        console.log(props);
        return(
          <div style={{display: 'flex', justifyContent:'center', alignItems:'center',  width: '100%', height:"80px", backgroundColor:'black'}}>
          <h1 style={{color:"white"}}>{props.children}</h1>
          </div>
        );
      }

      export default Title;