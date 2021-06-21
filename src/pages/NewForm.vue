<template>
  <q-page padding class="flex flex-center">
    <!-- content -->
     <div class="q-pa-md"  style="max-width: 100%; width: 700px">
       
    <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md q-pa-xl rounded-borders shadow-24" style="background: var(--q-color-dark);">
       <div class="text-h4 q-ml-md text-white">Новая запись</div>
       <q-input
       dark
        ref="name"
        filled
        v-model="name"
        label="ФИО *"
        hint="Введите фамилию и имя"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Обязательное поле',
                  val=> /^[^\s]+( [^\s]+)+$/.test(val) || 'Введите фамилию и имя через пробел']"
      />
    <q-input dark ref="datePicker"  filled v-model="datePicker" lazy-rules  label="День рождения *" mask="date" :rules="['date']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy  ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="datePicker" title="Месяц день" subtitle="Год рождения" navigation-min-year-month="1920/01"
      navigation-max-year-month="2022/01" >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Закрыть" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
         <q-input
         dark
      v-model="text"
      filled
      autogrow
      placeholder='Введите описание'
      maxlength="100"
    />
      
      <div>
        <q-btn label="Cохранить" type="submit" color="primary"/>
        <q-btn label="Отмена" @click="$router.push('/')" color="red"  class="q-ml-sm" />
        <q-btn label="Сброс" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>
    </form>

  </div>
  </q-page>
</template>

<script>

export default {
  data () {
    return {
      name: '',
      text: '',
      datePicker: '',
   
    }
  },

   methods: {
    onSubmit () {
      this.$refs.name.validate()
      this.$refs.datePicker.validate()

      if (this.$refs.name.hasError || this.$refs.datePicker.hasError ) {
        this.formHasError = true
         this.$q.notify({
          color: 'negative',
          message: 'Заполните обязательные поля'
        })
      } else {
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Успешно зарегистрирован'
        })
      
         this.name = this.name.split(' ')
        const person = {
          id: +new Date(),
          firstName: this.name[0],
          lastName: this.name[1],
          middleName: this.name[2] || null,
          birthDate: this.datePicker, 
          description: this.text || null,
        }
        
        this.onReset()
        this.$store.dispatch('management/newForm', person)
        
      }
      
     
    },

    onReset () {
      this.name = ''
      this.text = ''
      this.datePicker = ''

      this.$refs.name.resetValidation()
      this.$refs.datePicker.resetValidation()
    }
  }
}
</script>
