<template>
  <div class="container">
    <form @submit.prevent="addPlayer" class="form">
      <h1 class="title">Dodaj Igrača</h1>
      <div class="form-wrapper">
        <div class="picture">
          <div class="image-box">
            <img v-if="newPlayer.image" :src="newPlayer.image" class="preview-img" />
            <span v-else>Prikaz slike</span>
          </div>
          <button class="upload-btn" type="button" @click="selectImage">Odaberi Sliku</button>
          <input type="file" ref="fileInput" @change="handleImageUpload" accept="image/png, image/jpeg" style="display:none;" />
        </div>

        <div class="text">
          <div class="sub-text">
            <label for="firstName" class="label">Ime: </label>
            <input type="text" id="firstName" v-model="newPlayer.firstName">
          </div>
          <div class="sub-text">
            <label for="nickname" class="label">Nadimak: </label>
            <input type="text" id="nickname" v-model="newPlayer.nickname">
          </div>
          <div class="sub-text">
            <label for="lastName" class="label">Prezime: </label>
            <input type="text" id="lastName" v-model="newPlayer.lastName">
          </div>
          <div class="date">
            <label for="birthDate" class="label">Datum Rođenja: </label>
            <input type="date" id="birthDate" v-model="newPlayer.birthDate">
          </div>
          <div class="sub-text">
            <label for="dressNumber" class="label">Broj Igrača: </label>
            <input type="number" id="dressNumber" v-model="newPlayer.dressNumber" min="1" max="33">
          </div>
          <div class="sub-text">
            <label for="position" class="label">Pozicija: </label>
            <input type="text"  id="position" v-model="newPlayer.position">
          </div>
          <div class="sub-text">
            <label for="village" class="label">Selo: </label>
            <input type="text" id="village" v-model="newPlayer.village">
          </div>
          <div class="select">
            <label for="club" class="label">Odaberi Klub: </label>
            <select v-model="newPlayer.club" id="club">
              <option value="" disabled selected>Odaberi Klub</option>
              <option v-for="club in clubs" :key="club._id" :value="club._id">{{ club.name }}</option>
            </select>
          </div>
        </div>
      </div>

       <div class="button-box">
            <button type="submit" class="rectangle">
                <span class="button-text">Dodaj Klub</span>
            </button>
        </div>
    </form>
  </div>
</template>

<script>
    import axios from 'axios';
    import { io } from 'socket.io-client';

    export default{
        name:'AddPlayer',
        data(){
            return{
                newPlayer:{
                    firstName:'',
                    nickname:'',
                    lastName:'',
                    image:'',
                    dressNumber:null,
                    position:'',
                    birthDate:'',
                    village:'',
                    club:''
                },
                clubs:[]
            }
        },
        methods:{
            selectImage(){
                this.$refs.fileInput.click();
            },
            handleImageUpload(event){
                const file=event.target.files[0];
                if(!file) return;

                const reader=new FileReader();

                reader.onload=(e)=>{
                    this.newPlayer.image=e.target.result;
                };

                reader.readAsDataURL(file);
            },
            async getClubs(){
                try{
                    const response=await axios.get('http://localhost:3000/clubs');
                    this.clubs=response.data;
                }catch(error){
                    console.log('Greška',error);
                    alert('Greška na serveru');
                }
            },
            async addPlayer(){
                try{
                    if(!this.newPlayer.image){
                      this.newPlayer.image='Igrač Nema Slike';
                    }
                    const response=await axios.post('http://localhost:3000/players',this.newPlayer);
                    if(response.status===201){
                        this.newPlayer={
                            firstName:'',
                            nickname:'',
                            lastName:'',
                            image:'',
                            dressNumber:null,
                            position:'',
                            birthDate:'',
                            village:'',
                            club:''
                        };
                        alert('Igrač dodan');
                    }else{
                        alert('Greška prilikom dodavanja igrača,provjerite podatke');
                    }
                }catch(error){
                    console.log('Greška',error);
                    alert('Greška na serveru');
                }
            }
        },
        mounted(){
            this.getClubs();
            this.socket=io('http://localhost:3000');
            this.socket.on('addedPlayer',()=>{
                this.getClubs();
            });
        }
    }
</script>
<style scoped>
.container {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.form {
  background-color: #7CFC00;
  padding: 15px;
  border-radius: 10px;
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  margin-bottom: 20px;
  color: white;
}

.form-wrapper {
  display: flex;
  gap: 30px;
  width: 100%;
  justify-content: space-between;
}

/* Lijeva strana */
.picture {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
}

.image-box {
  width: 180px;
  height: 180px;
  background-color: white;
  border: 2px dashed #3f7a39;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  font-size: 14px;
}

.upload-btn {
  background-color: #3f7a39;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
}

/* Desna strana */
.text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sub-text,
.date,
.select {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.label {
  font-weight: bold;
  color: white;
}

input,
select {
  padding: 8px;
  border-radius: 5px;
  border: none;
  width: 100%;
  box-sizing: border-box;
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
.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}
</style>