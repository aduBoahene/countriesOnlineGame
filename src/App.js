import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';

function App() {
  
  const [country, setCountry] = useState(null)
  const [finalPossibleAnswers, setFinalPossibleAnswers] = useState([])
  const [allCountries, setAllCountries] = useState()
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [correctAnser, setCorrectAnser] = useState(0)

  const [showWrong, setShowWrong] = useState(false)
  const [showCorrect, setShowCorrect] = useState(false)



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
    if(option === country.capital[0]){
      let randomNumber = Math.floor(Math.random() * 250) + 1
      prepareQuestion(allCountries, allCountries[randomNumber])
      prepareOptions(allCountries,  allCountries[randomNumber])
      setTotalAttempts(parseInt(totalAttempts) + 1)
      setCorrectAnser(parseInt(correctAnser) + 1)
      setShowCorrect(true)
    }else{
      let randomNumber = Math.floor(Math.random() * 250) + 1
      prepareQuestion(allCountries, allCountries[randomNumber])
      prepareOptions(allCountries,  allCountries[randomNumber])
      setTotalAttempts(totalAttempts + 1)
      setShowWrong(true)
    }

  }

  const prepareQuestion=(allData, question)=>{
      setAllCountries(allData)
      setCountry(question);
      setShowWrong(false)
      setShowCorrect(false)
  }


  const prepareOptions=(allData, QuestionOnDisplay)=>{
    let threeOptions = getMultipleRandom(allData,3)
    threeOptions.push(QuestionOnDisplay)
    shuffle(threeOptions)
    setFinalPossibleAnswers(shuffle(threeOptions))
    console.log("new day", threeOptions)
  }

  const shuffle = (array) => {
    return array.slice().sort(() => Math.random() - 0.5);
  }

  return (
    <div className="w-4/5 mx-auto">
        <div className="text-center mt-4 flex justify-between">
          {showWrong?(<span className="text-red-800">&#x02717;</span>):("")}
          {`${correctAnser} / ${totalAttempts}`}
          {showCorrect?(<span className="text-green-800">&#x02713;</span>):("")}
          
          </div>
        <div className="mt-8 mx-auto w-4/5">
          <h3 className="mb-2 text-center">What is the capital town of {country?.name?.common?(<span className="font-extrabold">{country?.name?.common}</span>):(<p>loading</p>)}</h3>
          {country?.flags?.svg?(<img src={country?.flags?.svg} alt="country flag"/>):(<p>loading</p>)}
        </div>


      <div className="mt-8">
      {finalPossibleAnswers.map(a=>
        <div className="border-solid border-2 border-indigo-600 w-3/4 mx-auto text-center py-2 mb-4" 
              key={a?.name?.common} 
              onClick={()=> handleAnswerClick(a?.capital[0])}>
            {a?.capital[0]} 
        </div>
      )}
      </div>
      
    </div>
     

   
  );
}

export default App;
