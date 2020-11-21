import Panel from "./Panel";
import './PanelList.scss'
import classNames from 'classnames'
// pass 'answers' as an array of object formatted as below

// const answersArray = [
//   { answerString: "Herman Melville", selected: false, correct: false },
//   { answerString: "William Golding", selected: false, correct: false },
//   { answerString: "William Shakespeare", selected: false, correct: false },
//   { answerString: "J.R.R. Tolkein", selected: true, correct: false },
// ];




function PanelList({infoArray}) {
  // replace answersObj with props

  
  const questionPanel = infoArray[0].questionString ? true : false;
  const answerPanel = infoArray[0].answerString ? true : false;
  
  const className = classNames("box", {"box__answer": answerPanel}, {"box__question": questionPanel});
  
  const list = infoArray.map(info => {
    return (<Panel info={info} />)
  });

  

  return (
    <div className={className}>
     {list}
    </div>
   
  );
}

export default PanelList