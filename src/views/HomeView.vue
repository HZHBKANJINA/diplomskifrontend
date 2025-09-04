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
</template>

<script>

  export default {
    name: 'HomeView',
    methods:{
      onLogout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.assign('/');
      }
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
</style>
