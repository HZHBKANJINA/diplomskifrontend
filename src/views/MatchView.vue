<template>
  <div class="header">
    <h1>NOGOMETNA LIGA HERCEGOVINE</h1>
  </div>
  <div class="topnav">
    <a href="/pocetna">Početna</a>
    <a href="/onama">O Nama</a>
    <a href="/klubovi">Klubovi i Igrači</a>
    <a href="/susreti">Susreti</a>
    <a href="/tablica">Tablica Lige</a>
    <a @click="onLogout" class="split">Odjava</a>
  </div>
  <div class="main-content">
    <div class="buttons">
      <button @click="otvoriDialog" class="button button-text">Dodaj Susret</button>
      <ModalComponent v-if="dialogOtvoren" @zatvori="zatvoriDialog">
        <AddMatch @zatvori="zatvoriDialog"/>
        <button @click="zatvoriDialog" class="close">X</button>
      </ModalComponent>
    </div>
    <div class="match-table">
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>DOMAĆIN</th>
              <th>REZULTAT</th>
              <th>GOST</th>
              <th>STADION</th>
              <th>SELO</th>
              <th>GLAVNI SUDIJA</th>
              <th>POMOĆNI SUDIJA 1</th>
              <th>POMOĆNI SUDIJA 2</th>
              <th>ČETVRTI SUDIJA</th>
            </tr>
          </thead>
          <tbody v-if="matches.length">
            <tr v-for="match in matches" :key="match._id" :value="match._id">
              <td>{{ match.home.name }}</td>
              <td>{{ match.homeScore }} : {{ match.guestScore }}</td>
              <td>{{ match.guest.name }}</td>
              <td>{{ match.home.stadium }}</td>
              <td>{{ match.home.village }}</td>
              <td>{{ match.referee.firstName }} {{ match.referee.lastName }}</td>
              <td>{{ match.assistant1.firstName }} {{ match.assistant1.lastName }}</td>
              <td>{{ match.assistant2.firstName }} {{ match.assistant2.lastName }}</td>
              <td>{{ match.fourthOfficial.firstName }} {{ match.fourthOfficial.lastName }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import ModalComponent from '../components/ModalComponent.vue'
  import AddMatch from '../components/AddMatch.vue'
  import axios from 'axios'

  export default {
    name: 'MatchView',
    components:{
      ModalComponent,
      AddMatch
    },
    data(){
      return{
        dialogOtvoren:false,
        matches:[]
      }
    },
    methods:{
      async getMatches(){
        try{
          const response=await axios.get('http://localhost:3000/matches');
          this.matches=response.data;
        }catch(error){
          console.log('Greška',error);
          alert('Greška na serveru');
        }
      },
      otvoriDialog(){
        this.dialogOtvoren=true;
      },
      zatvoriDialog(){
        this.dialogOtvoren=false;
      },
      onLogout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.assign('/');
      }
    },
    mounted(){
      this.getMatches();
    }
  }
</script>
<style scoped>
body{
  background-color: whitesmoke;
}
.header{
  width: 100;
  height: 150px;
  margin-bottom: 10px;
  text-align: center;
  color: white;
  background-color: #3f7a39;
  align-items: center;
  justify-content: center;
  display: flex;
}
.topnav{
  overflow: hidden;
  background-color:  #7CFC00;
  margin-bottom: 10px;
}
.topnav a{
  float: left;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  background-color: #3f7a39;
  margin-right: 5px;
}
.topnav a:hover{
  background-color: gray;
}
.topnav a.split{
  float: right;
  margin-left: 5px;
  margin-right: 0;
  cursor: pointer;
}
.main-content{
  width: 100%;
}
.buttons{
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-bottom: 20px;
}
.button{
    width: 110px;
    height: 32px;
    background-color: #3f7a39;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
.button-text{
    font-weight: 700;
    color: white;
    font-size: 14px;
    text-align: center;
    white-space: nowrap;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: black;
}
.match-table{
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    background-color: #3f7a39;
    padding: 15px;
}
thead{
    background-color:  #7CFC00;

}
thead th{
    padding: 3px;
    margin-right: 8px;
    border: 2px solid black;
    color: white;
    font-weight: bolder;
    text-align: center;
}
tbody{
    margin-top: 15px;
    background-color:  #7CFC00;

}
tbody td{
    padding: 3px;
    border: 2px solid black;
    text-align: center;
    color: white;
    font-weight: bolder;
    text-align: center;
}
.table-wrapper{
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}
.table-wrapper table{
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}
</style>
