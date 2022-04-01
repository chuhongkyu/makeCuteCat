import React from "react";
import styles from '../css/button.css';

const Form = ({updateMainCat}) =>{
        const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
        const [value, setValue] = React.useState("");
        const [errorMessage, setErrorMessage] = React.useState('');

        function handleInputChange(e){
          const userValue = e.target.value;
          setErrorMessage("");
          console.log(includesHangul(userValue));
          if(includesHangul(userValue)){
            setErrorMessage("한글은 입력할 수 없습니다.");
          } 
          setValue(userValue.toUpperCase());
        }

        function handleFormSubmit (e){
          e.preventDefault();
          setErrorMessage("");
          if(value ===''){
            setErrorMessage("빈 값으로 만들 수 없어요.")
            return;
          }
          updateMainCat(value);
        }

        return(
          <form onSubmit={handleFormSubmit}>
            <div className="handle-form">
               <input className="input-style" type="text" name="name" placeholder="영어 대사를 입력해주세요" value={value} onChange={handleInputChange}/>
               <button className="button-50" type="submit">생성</button>
            </div>
            <div className="error-massage">
              <p style={{color: "red"}}>{errorMessage}</p>
            </div>
          </form>
        );   
      }

      export default Form;