const questions = [
  {
    text: "1. O que são linguagens de programação?",
    choices: [
      "A) Ferramentas usadas para editar imagens.",
      "B) Os 'idiomas' que os programadores utilizam para comunicar instruções aos computadores.",
      "C) Sistemas operacionais.",
      "D) Componentes de hardware.",
    ],
    correct: 1,
  },
  {
    text: "2. Como as linguagens de programação são classificadas quanto ao nível de abstração?",
    choices: [
      "A) Alto nível e Médio nível.",
      "B) Baixo nível e Médio nível.",
      "C) Alto nível e Baixo nível.",
      "D) Formal e informal.",
    ],
    correct: 2,
  },
  {
    text: "3. Qual é a principal característica das linguagens de baixo nível?",
    choices: [
      "A) São próximas da linguagem humana.",
      "B) Estão próximas do código de máquina, ou seja, das instruções entendidas diretamente pelo hardware.",
      "C) São executadas diretamente por um interpretador.",
      "D) Não utilizam variáveis.",
    ],
    correct: 1,
  },
  {
    text: "4. Qual das seguintes linguagens é um exemplo de linguagem de alto nível?",
    choices: [
      "A) Assembly.",
      "B) Código de máquina.",
      "C) Python.",
      "D) Microcódigo.",
    ],
    correct: 2,
  },
  {
    text: "5. Qual a principal diferença entre linguagens interpretadas e compiladas?",
    choices: [
      "A) Em linguagens interpretadas, o código é executado linha por linha por um interpretador; já em linguagens compiladas, o código-fonte é traduzido para código de máquina antes da execução.",
      "B) Linguagens compiladas não permitem o uso de variáveis.",
      "C) Linguagens interpretadas não podem ser testadas.",
      "D) Linguagens compiladas são sempre mais lentas que as interpretadas.",
    ],
    correct: 0,
  },
  {
    text: "6. O que é lógica de programação?",
    choices: [
      "A) Um conjunto de técnicas para desenhar interfaces gráficas.",
      "B) A parte do computador responsável pelo armazenamento dos dados.",
      "C) O conjunto de conceitos e técnicas que permitem estruturar e organizar algoritmos para a solução de problemas.",
      "D) Um tipo específico de linguagem de programação.",
    ],
    correct: 2,
  },
  {
    text: "7. Qual a finalidade do Portugol dentro do contexto de lógica de programação?",
    choices: [
      "A) Compilar programas diretamente para código de máquina.",
      "B) Facilitar a construção e leitura de algoritmos por ser escrito em português.",
      "C) Executar operações matemáticas complexas.",
      "D) Substituir todas as outras linguagens de programação.",
    ],
    correct: 1,
  },
  {
    text: "8. No exemplo de programa apresentado, qual operação é realizada após a leitura dos dois números? a = 10 + 5",
    choices: ["A) Multiplicação.", "B) Divisão.", "C) Subtração.", "D) Soma."],
    correct: 3,
  },
  {
    text: "9. O que são variáveis em programação?",
    choices: [
      "A) São espaços nomeados na memória do computador usados para armazenar dados que podem ser alterados durante a execução do programa.",
      "B) São funções que processam dados sem alterá-los.",
      "C) São comandos que exibem informações na tela.",
      "D) São sequências fixas de instruções que não podem mudar.",
    ],
    correct: 0,
  },
  {
    text: "10. Qual comando em Python é utilizado para obter dados digitados pelo usuário?",
    choices: ["A) input()", "B) int()", "C) if()", "D) print()"],
    correct: 1,
  },
];

let currentQuestion = 0;
let score = 0;
let answered = new Array(questions.length).fill(false);

// Função para atualizar a barra de progresso
function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Função para atualizar o contador de questões
function updateQuestionCounter() {
  const counter = document.getElementById("question-counter");
  counter.textContent = `${currentQuestion + 1} / ${questions.length}`;
}

function showQuestion(index) {
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";
  const q = questions[index];
  
  const questionEl = document.createElement("div");
  questionEl.className = "question";
  questionEl.textContent = q.text;
  quizDiv.appendChild(questionEl);
  
  const ul = document.createElement("ul");
  ul.className = "answers";
  
  q.choices.forEach((choice, i) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = choice;
    btn.setAttribute("aria-label", `Opção ${choice}`);
    
    // Verificar se a questão já foi respondida
    if (answered[index] && i === q.correct) {
      btn.textContent = "✓ " + btn.textContent;
      btn.style.backgroundColor = "rgba(46, 204, 113, 0.2)";
    }
    
    btn.onclick = function () {
      checkAnswer(index, i, btn);
    };
    
    li.appendChild(btn);
    ul.appendChild(li);
  });
  
  quizDiv.appendChild(ul);
  
  // Limpar feedback se mudar de questão
  if (!answered[index]) {
    document.getElementById("feedback").textContent = "";
    document.getElementById("feedback").className = "feedback";
  }
  
  updateNavButtons();
  updateProgressBar();
  updateQuestionCounter();
}

function checkAnswer(qIndex, choiceIndex, btn) {
  if (answered[qIndex]) return;
  
  const q = questions[qIndex];
  const feedbackDiv = document.getElementById("feedback");
  
  if (choiceIndex === q.correct) {
    btn.textContent = "✓ " + btn.textContent;
    btn.style.backgroundColor = "rgba(46, 204, 113, 0.2)";
    feedbackDiv.textContent = "Correto!";
    feedbackDiv.className = "feedback correct";
    score++;
    answered[qIndex] = true;
    updateScore();
  } else {
    btn.textContent = "✗ " + btn.textContent;
    btn.style.backgroundColor = "rgba(231, 76, 60, 0.2)";
    feedbackDiv.textContent = "Desculpe! Tente novamente.";
    feedbackDiv.className = "feedback incorrect";
  }
}

function updateScore() {
  const scoreDiv = document.getElementById("score");
  scoreDiv.textContent = `Pontuação: ${score} de ${questions.length}`;
  
  // Verificar se todas as questões foram respondidas
  if (answered.every(a => a)) {
    const percentage = Math.round((score / questions.length) * 100);
    scoreDiv.innerHTML += `<div>Você acertou ${percentage}% das questões!</div>`;
    
    // Adicionar botão para reiniciar o quiz
    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Reiniciar Quiz";
    restartBtn.className = "nav-btn";
    restartBtn.style.marginTop = "15px";
    restartBtn.onclick = resetQuiz;
    scoreDiv.appendChild(restartBtn);
  }
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = new Array(questions.length).fill(false);
  showQuestion(currentQuestion);
  updateScore();
  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").className = "feedback";
}

function updateNavButtons() {
  document.getElementById("prevBtn").disabled = currentQuestion === 0;
  document.getElementById("nextBtn").disabled = currentQuestion === questions.length - 1;
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion(currentQuestion);
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion(currentQuestion);
  }
}

// Adicionar suporte a teclado para navegação
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowRight") {
    nextQuestion();
  } else if (event.key === "ArrowLeft") {
    prevQuestion();
  }
});

window.onload = function () {
  showQuestion(currentQuestion);
  updateScore();
  updateProgressBar();
  updateQuestionCounter();
};