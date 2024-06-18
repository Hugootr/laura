document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');

    const questions = [
        {
            question: "¿Cuál mi comida favorita?",
            options: ["Arroz al horno", "Pizza", "Hamburguesas", "Patatas fritas"],
            answer: "Patatas fritas",
            explanation: "Me flipan las patatas fritas, no se como has podido fallar"
        },
        {
            question: "¿Cuál es mi mayor sueño?",
            options: ["Conseguir el físico que quiero", "Trabajar para el FCB", "Montar una familia", "Ser millonario"],
            answer: "Trabajar para el FCB",
            explanation: "Ya sabes que el FCB es mi vida..."
        },
        {
            question: "¿Dónde me gustaría vivir de mayor?",
            options: ["Barcelona", "Valencia", "Madrid", "Fuera de españa"],
            answer: "Barcelona",
            explanation: "Barcelona y el barça. Mi fokin sueño"
        },
        {
            question: "¿Cuál es mi hobbie favorito?",
            options: ["Fútbol", "Videojuegos", "Informática", "Gym"],
            answer: "Fútbol",
            explanation: "Fútbol, aunque físicamente no aguante"
        },
        {
            question: "¿Cuál es mi pelicula favorita?",
            options: ["Interstellar", "Cars", "V de Vendetta", "Shrek"],
            answers: "V de Vendetta",
            explanation: "Tanto V de Vendetta como interstellar me flipan"
        },
        {
            question: "¿Cuál de estas NO es una asignatura de mi módulo?",
            options: ["Servicios en red", "Implantación de sistemas operativos", "Lenguaje de marcas", "Fundamentos del hardware"],
            answer: "Servicios en red",
            explanation: "Es servicios en red, una asignatura del grado medio"
        },
        {
            question: "¿Cómo se llama lo que estudio?",
            options: ["Aplicación de sistemas informáticos en red", "Administración de sistemas informáticos en red", "Sistemas microinformáticos en red", "Sistemas informaticos y redes"],
            answer: "Administración de sistemas informáticos en red",
            explanation: "COMO FALLAS"
        },
        {
            question: "¿Qué prefiero?",
            options: ["GYM", "Fútbol", "Piscina", "Cervezas con amigos"],
            answer: "Cervezas con amigos jugando al fútbol cerca de una piscina después de gym",
            explanation: "Cervezas con amigos jugando al fútbol cerca de una piscina después de gym"
        },
        {
            question: "¿Cuál es mi jugador de fútbol favorito?",
            options: ["Gavi", "Pedri", "Xavi Simons", "Lamine yamal"],
            answer: "Xavi Simons",
            explanation: "Xavi Simons me vuelve loco, aunque no le conozcas"
        }
    ];

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    function generateQuiz(questions) {
        shuffle(questions);
        const selectedQuestions = questions.slice(0, 10);
        selectedQuestions.forEach((q, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');

            const questionTitle = document.createElement('h2');
            questionTitle.textContent = `${index + 1}. ${q.question}`;
            questionElement.appendChild(questionTitle);

            const optionsList = document.createElement('ul');
            optionsList.classList.add('options');
            q.options.forEach(option => {
                const optionItem = document.createElement('li');

                const label = document.createElement('label');
                label.textContent = option;
                label.classList.add('option-label');

                label.addEventListener('click', () => handleOptionSelect(label, q.answer, questionElement, q.explanation));

                optionItem.appendChild(label);
                optionsList.appendChild(optionItem);
            });

            questionElement.appendChild(optionsList);
            quizContainer.appendChild(questionElement);
        });
    }

    function handleOptionSelect(selectedLabel, correctAnswer, questionElement, explanation) {
        const allLabels = questionElement.querySelectorAll('.option-label');
        allLabels.forEach(label => {
            label.classList.remove('correct', 'incorrect', 'fade-in');
            label.classList.add('disabled');
        });

        if (selectedLabel.textContent === correctAnswer) {
            selectedLabel.classList.add('correct', 'fade-in');
        } else {
            selectedLabel.classList.add('incorrect', 'fade-in');
            showExplanation(questionElement, explanation);
        }

        checkCompletion();
    }

    function showExplanation(questionElement, explanation) {
        let explanationElement = questionElement.querySelector('.explanation');
        if (!explanationElement) {
            explanationElement = document.createElement('div');
            explanationElement.classList.add('explanation');
            explanationElement.textContent = explanation;
            questionElement.appendChild(explanationElement);
        }
        explanationElement.style.display = 'block';
    }

    function checkCompletion() {
        const allQuestions = document.querySelectorAll('.question');
        const allAnswered = Array.from(allQuestions).every(question => {
            return question.querySelector('.correct') || question.querySelector('.incorrect');
        });

        if (allAnswered) {
            checkAnswers();
        }
    }

    function checkAnswers() {
        const questionsElements = document.querySelectorAll('.question');
        let correctCount = 0;

        questionsElements.forEach((questionElement, index) => {
            const selectedLabel = questionElement.querySelector('.correct');
            if (selectedLabel) {
                correctCount++;
            }
        });

        showResults(correctCount, questionsElements.length);
    }

    function showResults(correctCount, totalQuestions) {
        resultContainer.innerHTML = `<p>Has acertado <span>${correctCount}</span> de <span>${totalQuestions}</span> preguntas.</p>`;
    }

    generateQuiz(questions);
});
