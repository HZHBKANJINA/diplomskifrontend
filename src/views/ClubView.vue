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
      <button @click="otvoriDialog('player')" class="button button-text">Dodaj Igrača</button>
      <ModalComponent v-if="aktivniModal === 'player'" @zatvori="zatvoriDialog">
        <AddPlayer @zatvori="zatvoriDialog"/>
        <button @click="zatvoriDialog" class="close">X</button>
      </ModalComponent>

      <button @click="otvoriDialog('club')" class="button button-text">Dodaj Klub</button>
      <ModalComponent v-if="aktivniModal === 'club'" @zatvori="zatvoriDialog">
        <AddClub @zatvori="zatvoriDialog"/>
        <button @click="zatvoriDialog" class="close">X</button>
      </ModalComponent>
    </div>

    <div class="sub-content">
      <div class="select">
        <label for="klub" class="label">Odaberi Klub: </label>
          <select v-model="choosenClub" @change="filterPlayers" id="klub">
            <option value="" disabled selected>Odaberi klub</option>
            <option v-for="club in clubs" :key="club._id" :value="club._id">{{ club.name }}</option>
          </select>
      </div>
      <div class="table-content">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>SLIKA</th>
                <th>BROJ</th>
                <th>IME</th>
                <th>NADIMAK</th>
                <th>PREZIME</th>
                <th>DATUM ROĐENJA</th>
                <th>POZICIJA</th>
                <th>SELO</th>
                <th>KLUB</th>
              </tr>
            </thead>
            <tbody v-if="players.length">
              <tr v-for="player in filteredPlayers" :key="player._id" :value="player._id">
                <td>
                  <img :src="player.image" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;" v-if="player.image" />
                </td>
                <td>{{ player.dressNumber }}</td>
                <td>{{ player.firstName }}</td>
                <td>{{ player.nickname }}</td>
                <td>{{ player.lastName }}</td>
                <td>{{ formatDate(player.birthDate) }}</td>
                <td>{{ player.position }}</td>
                <td>{{ player.village }}</td>
                <td>{{ player.club.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ModalComponent from '../components/ModalComponent.vue';
  import AddClub from '../components/AddClub.vue'
  import AddPlayer from '../components/AddPlayer.vue'
  import axios from 'axios';
  import { io } from 'socket.io-client';
  import dayjs from 'dayjs';

  export default {
    name: 'ClubView',
    components:{
      ModalComponent,
      AddClub,
      AddPlayer
    },
    data(){
      return{
        aktivniModal:null,
        clubs:[],
        players:[],
        choosenClub:'',
        filteredPlayers:[]
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
      async getPlayers(){
        try{
          const response=await axios.get('http://localhost:3000/players');
          this.players=response.data;
        }catch(error){
          console.log('Greška',error);
          alert('Greška na serveru');
        }
      },
      filterPlayers(){
        const club=this.clubs.find(c=>c._id===this.choosenClub);
        if(club){
          this.filteredPlayers=this.players.filter(p => p.club && p.club._id === club._id);
          console.log(this.filteredPlayers);
        }
      },
      formatDate(date){
        return dayjs(date).format('DD.MM.YYYY');
      },
      otvoriDialog(tip){
        this.aktivniModal = tip;
      },
      zatvoriDialog(){
        this.aktivniModal = null;
      },
      onLogout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.assign('/');
      },
    },
    mounted(){
      this.getClubs();
      this.getPlayers();

      this.socket=io('http://localhost:3000');

      this.socket.on('addedClub',()=>{
        this.getClubs();
      });
      this.socket.on('addedPlayer',async()=>{
        await this.getPlayers();
        this.filterPlayers();
      });
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
.select {
  display: flex;
  flex-direction: column;
  align-items: center; /* ZADRŽAVA CENTRIRANJE */
  gap: 5px;
  margin-bottom: 20px;
}

.select .label {
  font-weight: bold;
  color: black;
  margin-bottom: 0;
  text-align: left;
  width: 100%;
}

select {
  padding: 6px;
  border-radius: 5px;
  border: 1px solid #3f7a39;
  width: 200px;
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
.table-content{
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
.sub-content{
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
