import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Question from './components/Question';
import quizJsonQuestions from './api/quizJsonQuestions';
import quizQuestions from './api/quizJsonQuestions';
import Quiz from './components/Quiz';

class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      counter: 0,
      questionId:1,
      question:'',
      answerOptions:[],
      answer:'',
      answersCount: {},
      result:'',
      userAnswer:'',
      answerSelected:'',
      correctAnswer:'',
      isAnswered: false
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentDidMount() {
    const shuffledAnswerOptions = quizJsonQuestions.map((question) => this.shuffleArray(question.answers));

    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleAnswerSelected(event){
      var userAnswer = event.currentTarget.value;
      this.setState({
        answerSelected: userAnswer,
        isAnswered: true 
      });
      this.setUserAnswer(userAnswer);
      if(this.state.questionId < quizQuestions.length){
        setTimeout(() => this.setNextQuestion(), 5000);
      }else{
        //setTimeout(() => this.setResults(this.getResults()), 300);
      }
  }

  setUserAnswer(answer){
    this.setState({
      userAnswer: answer
    });
    this.setState((state) => ({
      answersCount:{
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1
      },
      answer: answer
    }));
  }

  setNextQuestion(){
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: '',
      isAnswered: false
    });
  }

  render(){
    console.log('Before App Render '+this.state.answerSelected);
    return(
      <div className="App">
        <Quiz 
          answer = {this.state.answer}
          answerOptions = {this.state.answerOptions}
          questionId = {this.state.questionId}
          question = {this.state.question}
          questionTotal = {quizQuestions.length}
          onAnswerSelected = {this.handleAnswerSelected}
          answerSelected = {this.state.answerSelected}
          isAnswered = {this.state.isAnswered}
        />
      </div>
    );
  }
}

export default App;









