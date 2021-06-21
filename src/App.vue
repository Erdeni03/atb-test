<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>

export default {
  name: 'App',
  data(){
    return {
      data: [
    {
      id: 1,
      firstName: "Григорьева",
      lastName: "Мария",
      middleName: 'Артёмовна',
      birthDate: '1994/12/12',
      description: "Lorem ipsum dolor sit amet, vel utinam dolorem et. Mea alienum fastidii singulis eu, animal delenit nominati ei vel. Te sed ceteros omnesque suscipit, ut sit movet invidunt persequeris. Numquam consetetur philosophia ei has, summo omittantur reformidans qui ei."
    },
    {
      id: 2,
      firstName: "Соколов",
      lastName: 'Андрей',
      middleName: 'Максимович',
      birthDate: '1969/02/12',
      description: ''
    },
    {
      id: 3,
      firstName: "Ермаков",
      lastName: 'Максим',
      middleName: 'Иванович',
      birthDate: '1844/11/11',
      description: 'Lorem ipsum dolor sit amet, vel utinam dolorem et. Mea alienum fastidii singulis eu, animal delenit nominati ei vel. Te sed ceteros omnesque suscipit, ut sit movet invidunt persequeris. Numquam consetetur philosophia ei has, summo omittantur reformidans qui ei.'
    },
    {
      id: 4,
      firstName: "Ермаков",
      lastName: 'Максим',
      middleName: 'Иванович',
      birthDate: '1988/06/04',
      description: ''
    },
    {
      id: 5,
      firstName: "Жуков",
      lastName: 'Кирилл',
      middleName: 'Маркович',
      birthDate: '1956/03/24',
      description: ''
    },
     {
      id: 6,
      firstName: "Виноградова",
      lastName: 'Кира',
      middleName: 'Тимофеевна',
      birthDate: '1956/03/24',
      description: ''
    }
      ]
}
  },
   created(){
     if(!localStorage.length){
this.$store.dispatch('management/initial', this.data)
     }
 }
}
</script>
