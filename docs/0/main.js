window.addEventListener('load', (event) => {
    const opt = {
        setup() {
            const question = Vue.ref('some question?');
            const answer = Vue.ref('some answer.');
//            const question = 'some question?';
//            const answer = 'some answer.';
            return {
                question: question,
                answer: 'answer'
            };
        },
        watch: {
            question(newQuestion, oldQuestion) {
                if (newQuestion.indexOf('?') > -1) {
                    this.getAnswer();
                }
            }
        },
        methods: {
            getAnswer() {
                console.log('Thinking...');
                this.answer = 'Thinking...';
//                this.answer.value = 'Thinking...';
                axios
                    .get('https://yesno.wtf/api')
                    .then(response => {
                        this.answer = response.data.answer;
//                        this.answer.value = response.data.answer;
                        console.log('answer!: ' + this.answer.value);
                    })
                    .catch(error => {
                        this.answer = 'Error: ' + error;
//                        this.answer.value = 'Error: ' + error;
                    });
            }
        }
    }
    Vue.createApp(opt).mount('#app');
});
