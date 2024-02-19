const app = Vue.createApp({

    data() {
        return {
            firstName: 'John',
            lastName: 'Doe',
            gender: 'male',
            countryOfOrigin: 'US',
            trait: 'Ambitious',
            traitImg: 'https://static.wikia.nocookie.net/sims/images/3/32/Trait_TS4_Ambitious.png',

            showLoader: false,
        }
    },

    methods: {
      async getSim() {
          this.showLoader = true

          const res = await fetch('https://randomuser.me/api');
          const { results } = await res.json();

          const response = await fetch('baseGameTraits.csv');
          const data = await response.text();
          const parsedData = Papa.parse(data, { header: true });
          const randomIndex = Math.floor(Math.random() * parsedData.data.length);

          this.firstName = results[0].name.first
          this.lastName = results[0].name.last
          this.gender = results[0].gender
          this.countryOfOrigin = results[0].nat


          this.trait = parsedData.data[randomIndex].trait;
          this.traitImg = parsedData.data[randomIndex].traitImg;

          this.showLoader = false
      },
    },
})

app.mount('#app')