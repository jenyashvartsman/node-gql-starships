const apiUrl = '/graphql';
const apiHeaders =  {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};
const getStarshipsQuery = `query getStarships($universe: String) {
                              starships(universe: $universe) {
                                id
                                name
                                universe
                                image
                              }
                            }`;

const app = Vue.createApp({
    data() {
        return {
            starships: []
        }
    },
    mounted() {
      this.getStarships();
    },
    methods: {
        getStarships() {
            fetch(apiUrl, {
                method: 'POST',
                headers: apiHeaders,
                body: JSON.stringify({
                    query: getStarshipsQuery,
                    variables: {},
                })
            })
                .then(r => r.json())
                .then(data => this.starships = data.data.starships);
        }
    }
});

app.mount('#app');
