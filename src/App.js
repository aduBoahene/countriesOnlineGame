import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';

function App() {
  const [question, setQuestion]= useState()
  const [country, setCountry] = useState(null)
  const [finalPossibleAnswers, setFinalPossibleAnswers] = useState([])
  const [isCorrectAnswer, setIsCorrectAnswer] = useState("")

  const [allCountries, setAllCountries] = useState()



useEffect(() => {
  const fetchAllCountriesData = async () =>{
    try {
      const {data} = await axios.get('https://restcountries.com/v3.1/all');
      let randomNumber = Math.floor(Math.random() * 250) + 1
      prepareQuestion(data,data[randomNumber])
      prepareOptions(data, data[randomNumber])
    } catch (error) {
      console.error(error.message);
    }
  }
  fetchAllCountriesData();
}, []);



  function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  const handleAnswerClick=(option)=>{
    if(option == country.capital[0]){
      alert("correct answer")
      let randomNumber = Math.floor(Math.random() * 250) + 1
      prepareQuestion(allCountries, allCountries[randomNumber])
      prepareOptions(allCountries,  allCountries[randomNumber])
    }else{
      alert("wrong answer")
      let randomNumber = Math.floor(Math.random() * 250) + 1
      prepareQuestion(allCountries, allCountries[randomNumber])
      prepareOptions(allCountries,  allCountries[randomNumber])
    }

  }

  const prepareQuestion=(allData, question)=>{
      setAllCountries(allData)
      setCountry(question);
  }


  const prepareOptions=(allData, QuestionOnDisplay)=>{
    let threeOptions = getMultipleRandom(allData,3)
    threeOptions.push(QuestionOnDisplay)
    setFinalPossibleAnswers(threeOptions)
    console.log("new day", threeOptions)
  }



  return (
    <div className="grid place-items-center h-screen">
      <div className="m-4">
        <h3 className="text-center">What is the capital town of {country?.name?.common?(country?.name?.common):(<p>loading</p>)}</h3>
        <img src={country?.flags?.svg} />
      </div>


  {finalPossibleAnswers.map(a=>
    
    <p className={``} key={a?.name?.common} onClick={()=> handleAnswerClick(a?.capital[0])}>
          {a?.capital[0]}
    </p>
  )}

      </div>
     

   
  );
}

export default App;
