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
  <div class="league-table">
    <div class="tabble-wrapper">
      <table>
        <thead>
          <tr>
            <th>KLUB</th>
            <th>ODIGRANO UTAKMICA</th>
            <th>POBJEDE</th>
            <th>NERIJEŠENO</th>
            <th>IZGUBLJENO</th>
            <th>ZABIJENO GOLOVA</th>
            <th>PRIMLJENO GOLOVA</th>
            <th>GOL RAZLIKA</th>
            <th>BODOVI</th>
          </tr>
        </thead>
        <tbody v-if="tables.length">
          <tr v-for="table in tables" :key="table._id" :value="table._id">
            <td>{{ table.club.name }}</td>
            <td>{{ table.played }}</td>
            <td>{{ table.win }}</td>
            <td>{{ table.draw }}</td>
            <td>{{ table.lose }}</td>
            <td>{{ table.goals_scored }}</td>
            <td>{{ table.goals_received }}</td>
            <td>{{ table.goalDifference }}</td>
            <td>{{ table.points }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'TableView',
    data(){
      return{
        tables:[]
      }
    },
    methods:{
      async getTables(){
        try{
          const response=await axios.get('http://localhost:3000/tables');
          this.tables=response.data.sort((a,b)=>{
            if(b.points===a.points){
              return b.goalDifference-a.goalDifference;
            }
            return b.points-a.points;
          });
        }catch(error){
          console.log('Greška',error);
          alert('Greška na serveru');
        }
      },
      onLogout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.assign('/');
      }
    },
    mounted(){
      this.getTables();
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
.league-table{
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
