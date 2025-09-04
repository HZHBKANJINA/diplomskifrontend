<template>
  <div class="container">
    <form @submit.prevent="addMatch" class="form">
      <h1 class="title">Dodaj Utakmicu</h1>
      <div class="match-row">
        <div class="home-team">
          <label for="home" class="label">Domaćin: </label>
          <select id="home" v-model="newMatch.home">
            <option value="" disabled selected>Odaberi Domaćina</option>
            <option v-for="club in clubs" :key="club._id" :value="club._id">{{ club.name }}</option>
          </select>
        </div>

        <div class="home-score">
          <input type="number" id="homeScore" min="0" v-model="newMatch.homeScore"/>
        </div>

        <div class="separator">:</div>

        <div class="guest-score">
          <input type="number" id="" min="0" v-model="newMatch.guestScore"/>
        </div>

        <div class="guest-team">
          <label for="guest">Gost: </label>
          <select id="guest" v-model="newMatch.guest">
            <option value="" disabled selected>Odaberi Gosta</option>
            <option v-for="club in clubs" :key="club._id" :value="club._id">{{ club.name }}</option>
          </select>
        </div>
      </div>

      <div class="referee-layout">
        <div class="main-ref">
          <label for="referee">Glavni Sudija: </label>
          <select id="referee" v-model="newMatch.referee">
            <option value="" disabled selected>Odaberi Sudiju</option>
            <option v-for="referee in referees" :key="referee._id" :value="referee._id">{{ referee.firstName }} {{ referee.lastName }}</option>
          </select>
        </div>

        <div class="assistants">
          <div class="assistant">
            <label for="assistant1">Pomoćni sudija 1: </label>
            <select id="assistant1" v-model="newMatch.assistant1">
              <option value="" disabled selected>Odaberi Sudiju</option>
              <option v-for="referee in referees" :key="referee._id" :value="referee._id">{{ referee.firstName }} {{ referee.lastName }}</option>
            </select>
          </div>
          <div class="assistant">
            <label for="assistant2">Pomoćni sudija 2: </label>
            <select id="assistant2" v-model="newMatch.assistant2">
              <option value="" disabled selected>Odaberi Sudiju</option>
              <option v-for="referee in referees" :key="referee._id" :value="referee._id">{{ referee.firstName }} {{ referee.lastName }}</option>
            </select>
          </div>
        </div>

        <div class="fourth-ref">
          <label for="fourthOfficial">Četvrti Sudija: </label>
          <select id="fourthOfficial" v-model="newMatch.fourthOfficial">
            <option value="" disabled selected>Odaberi Sudiju</option>
            <option v-for="referee in referees" :key="referee._id" :value="referee._id">{{ referee.firstName }} {{ referee.lastName }}</option>
          </select>
        </div>
        <div class="button-box">
            <button type="submit" class="rectangle">
              <span class="button-text">Dodaj Susret</span>
            </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';

  export default{
    name:'AddMatch',
    data(){
      return{
        clubs:[],
        referees:[],
        newMatch:{
          home:'',
          guest:'',
          homeScore:'',
          guestScore:'',
          referee:'',
          assistant1:'',
          assistant2:'',
          fourthOfficial:''
        }
      }
    },
    methods:{
      async getClubs(){
        try{
          const response=await axios.get('http://localhost:3000/clubs');
          this.clubs=response.data;
        }catch(error){
          console.log('Greška',error);
          alert('Greška na serveru');
        }
      },
      async getReferees(){
        try{
          const response=await axios.get('http://localhost:3000/referees');
          this.referees=response.data;
        }catch(error){
          console.log('Greška',error);
          alert('Greška na serveru');
        }
      },
      async addMatch(){
        try{
          const response=await axios.post('http://localhost:3000/matches',this.newMatch);
          if(response.status===201){
            this.newMatch={
              home:'',
              guest:'',
              homeScore:'',
              guestScore:'',
              referee:'',
              assistant1:'',
              assistant2:'',
              fourthOfficial:''
            };
            alert('Susret Dodan');
          }else{
            alert('Susret nije dodan,provjeri podatke');
          }
        }catch(error){
          console.log('Greška',error);
          alert('Greška na serveru');
        }
      }
    },
    mounted(){
      this.getClubs();
      this.getReferees();
    }
  }
</script>
<style scoped>
.container {
  margin-top: 80px;
  display: flex;
  justify-content: center;
}

.form {
  background-color: #7CFC00;
  padding: 30px;
  border-radius: 10px;
  width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  color: white;
  margin-bottom: 40px;
}
.match-row {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 15px;
  width: 100%;
  margin-bottom: 60px;
}

.home-team,
.guest-team {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
}

.home-score,
.guest-score {
  width: 60px;
}

input[type="number"] {
  width: 100%;
  height: 50px;
  font-size: 22px;
  text-align: center;
  border-radius: 6px;
  border: none;
}

select {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: none;
  font-size: 16px;
  box-sizing: border-box;
}

label {
  margin-bottom: 5px;
  height: 20px;
  display: block;
  color: white;
}
.separator {
  font-size: 28px;
  font-weight: bold;
  color: white;
  padding: 0 10px;
}

.referee-layout {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
.main-ref,
.fourth-ref {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.assistants {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 100px;
  gap: 20px;
}
.assistant {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
.button-box{
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
}
.rectangle{
    width: 110px;
    height: 32px;
    background-color: #3f7a39;
    border-radius: 10px;
    border: none;
    position: relative;
    cursor: pointer;
    overflow: hidden;
}
.button-text{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-family: 'Times New Roman', Helvetica;
    font-weight: 700;
    color: white;
    font-size: 14px;
    text-align: center;
    letter-spacing: 0;
    line-height: normal;
    white-space: nowrap;
}
</style>