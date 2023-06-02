// Questions data
const questions = [
    {
      id: 1,
      text: 'How satisfied are you with our products?',
      type: 'rating',
      options: ['1', '2', '3', '4', '5']
    },
    {
      id: 2,
      text: 'How fair are the prices compared to similar retailers?',
      type: 'rating',
      options: ['1', '2', '3', '4', '5']
    },
    {
      id: 3,
      text: 'How satisfied are you with the value for money of your purchase?',
      type: 'rating',
      options: ['1', '2', '3', '4', '5']
    },
    {
      id: 4,
      text: 'On a scale of 1-10, how likely are you to recommend us to your friends and family?',
      type: 'rating',
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    },
    {
      id: 5,
      text: 'What could we do to improve our service?',
      type: 'text',
      options: []
    }
  ];
  
  let currentQuestionIndex = 0;
  let answers = {};
  
  function startSurvey() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('survey-screen').style.display = 'block';
    showQuestion(currentQuestionIndex);
  }
  
  function showQuestion(questionIndex) {
    const question = questions[questionIndex];
  
    document.getElementById('question-number').textContent = `Question ${questionIndex + 1}/${questions.length}`;
    document.getElementById('question-text').textContent = question.text;
  
    let optionsHtml = '';
    if (question.type === 'rating') {
      for (const option of question.options) {
        optionsHtml += `
          <label>
            <input type="radio" name="answer" value="${option}" onchange="saveAnswer(${question.id}, this.value)" ${answers[question.id] === option ? 'checked' : ''}>
            ${option}
          </label>
        `;
      }
    } else if (question.type === 'text') {
      optionsHtml = `
        <textarea onchange="saveAnswer(${question.id}, this.value)">${answers[question.id] || ''}</textarea>
      `;
    }
  
    document.getElementById('answer-options').innerHTML = optionsHtml;
  
    document.getElementById('prev-button').disabled = questionIndex === 0;
    document.getElementById('next-button').disabled = false;
    if (questionIndex === questions.length - 1) {
      
      document.getElementById('next-button').disabled = true;
      showSubmitDialog();
    }
  }
  
  function prevQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion(currentQuestionIndex);
    }
  }
  
  function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion(currentQuestionIndex);
    }
  }
  
  function saveAnswer(questionId, answer) {
    answers[questionId] = answer;
  }
  
  function showSubmitDialog() {
    const dialog = document.getElementById('submit-dialog');
    dialog.style.display = 'block';
  
    // Show the summary of answers
    let summaryHtml = '';
    for (const question of questions) {
      summaryHtml += `<p><strong>${question.text}</strong>: ${answers[question.id] || 'Not answered'}</p>`;
    }
    document.getElementById('summary-answers').innerHTML = summaryHtml;
  }
  
  function submitSurvey() {
    
    answers = {};
    currentQuestionIndex = 0;
    showQuestion(currentQuestionIndex);
  
    // Hide the submit dialog
    document.getElementById('submit-dialog').style.display = 'none';
  
    // Show the welcome screen again
    document.getElementById('welcome-screen').style.display = 'block';
  }
  
  function cancelSubmit() {
    document.getElementById('submit-dialog').style.display = 'none';
    document.getElementById('next-button').disabled = false;
  }
  