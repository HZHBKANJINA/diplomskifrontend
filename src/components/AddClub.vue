<template>
    <div class="container">
        <form @submit.prevent="addClub" class="form">
            <h1 class="title">Dodaj Klub</h1>
            <div class="main-div">
                <div class="sub-div">
                    <label for="name" class="label">Unesi Naziv Kluba: </label>
                    <input type="text" id="name" class="text-wrapper" v-model="newClub.name">
                </div>
                <div class="sub-div">
                    <label for="village" class="label">Unesi Selo Kluba: </label>
                    <input type="text" id="village" class="text-wrapper" v-model="newClub.village">
                </div>
                <div class="sub-div">
                    <label for="stadium" class="label">Unesi Stadion Kluba: </label>
                    <input type="text" id="stadium" class="text-wrapper" v-model="newClub.stadium">
                </div>

                <div class="button-box">
                    <button type="submit" class="rectangle">
                        <span class="button-text">Dodaj Klub</span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
    import axios from 'axios';

    export default{
        name:'AddClub',
        data(){
            return{
                newClub:{
                    name:'',
                    village:'',
                    stadium:''
                }
            }
        },
        methods:{
            async addClub(){
                try{
                    const response=await axios.post('http://localhost:3000/clubs',this.newClub);
                    if(response.status===201){
                        this.newClub={
                            name:'',
                            village:'',
                            stadium:''
                        };
                        alert('Klub dodan');
                    }else{
                        alert('Popuni sve podatke,greška prilikom dodavanja kluba');
                    }
                }catch(error){
                    console.log('Greška',error);
                    alert('Greška na serveru');
                }
            }
        }
    }
</script>
<style scoped>
body{
    margin: 0;
    background-color: whitesmoke;
}
.container{
    background-color: whitesmoke;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.form{
    background-color: #7CFC00;
    color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    max-width: 400px;
    width: 100%;
}
.main-div {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
}

.sub-div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.label {
    font-weight: bolder;
    margin-bottom: 5px;
    color: white;
}

.text-wrapper {
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
</style>