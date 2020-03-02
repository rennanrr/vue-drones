<template>
  <div class="row">
    <div class="col-8 text-left" v-if="!submitted">
      <div class="form-group">
        <label>Imagem</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="drone.image"
          name="title"
        />
      </div>
      <div class="row">
        <div class="form-group col-4">
          <label>Nome</label>
          <b-form-input
            id="name"
            v-model="drone.name"
            :state="errors.name"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Ex: Jonathan"
            trim
            v-on:input="testInput('name')"
          ></b-form-input>
        </div>

        <div class="form-group col-8">
          <label>Endereço</label>
          <b-form-input
            id="address"
            v-model="drone.address"
            :state="errors.address"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Ex: Av. São João"
            trim
            v-on:input="testInput('address')"
          ></b-form-input>
        </div>
      </div>
      
      <div class="row">
        <div class="form-group col-6">
          <label>Bateria</label>
          <b-input-group>
            <b-form-input d="battery"  v-model="drone.battery" name="battery"
            type="range" min="0" max="100"></b-form-input>
            <b-input-group-append>
              <b-button disabled> 
                {{ drone.battery }} %
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
        
        <div class="form-group col-3">
          <label>Velocidade máxima</label>
          <input
            type="number"
            class="form-control"
            id="description"
            required
            v-model="drone.max_speed"
            name="description"
          />
        </div>
        
        <div class="form-group col-3">
          <label>Velocidade média</label>
          <input
            type="number"
            class="form-control"
            id="description"
            required
            v-model="drone.average_speed"
            name="description"
          />
        </div>
      </div>
      <div class="row">
        <div class="form-group col-6">
          <label>Status</label>
          <b-form-select id="status" name="status" v-model="drone.status" 
            :state="errors.status" 
            v-on:input="testInput('status')">
            <b-form-select-option value="Success">Success</b-form-select-option>
            <b-form-select-option value="Delayed">Delayed</b-form-select-option>
            <b-form-select-option value="Flying">Flying</b-form-select-option>
            <b-form-select-option value="Fail">Fail</b-form-select-option>
            <b-form-select-option value="Offline">Offline</b-form-select-option>
            <b-form-select-option value="Charging">Charging</b-form-select-option>
          </b-form-select>
        </div>

        <div class="form-group col-6">
          <label>Posição atual</label>
          <b-input-group>
            <b-form-input id="fly"  v-model="drone.fly" name="fly" 
              type="range" min="0" max="100"></b-form-input>
              <b-input-group-append><b-button disabled> {{ drone.fly }} </b-button></b-input-group-append>
          </b-input-group>
        </div>
      </div>

      <button :disabled="!(this.errors.name && this.errors.address && this.errors.status)" 
        @click="createDrone" class="btn btn-success">Cadastrar</button>
    </div>
    <img v-if="drone.image && !submitted" :src="drone.image" class="img-fluid col-4" alt="Drone image">

    <div class="text-center" v-if="submitted">
      <h4>Drone cadastrado com sucesso!</h4>
      <button class="btn btn-info m-2" @click="newDrone">Cadastrar outro</button>
      <a class="btn btn-success m-2" href="/drones">Voltar à lista</a>
    </div>
  </div>
</template>

<script>
import DroneService from "../services/DroneService";
import Joi from '@hapi/joi';

export default {
  name: "drone-create",
  data() {
    return {
      drone: {
        id: "",
        image: "",
        name: "",
        address: "",
        battery: 0,
        max_speed: null,
        average_speed: null,
        status: null,
        fly: 0
      },
      submitted: false,
      errors: {name: null, address: null, status: null}
    };
  },
  methods: {
    createDrone() {
      var data = {
        id: this.drone.id,
        image: this.drone.image,
        name: this.drone.name,
        address: this.drone.address,
        battery: this.drone.battery,
        max_speed: this.drone.max_speed,
        average_speed: this.drone.average_speed,
        status: this.drone.status,
        fly: this.drone.fly
      };

      DroneService.create(data)
        .then(response => {
          this.drone.id = response.data.id;
          this.submitted = true;
        })
        .catch(e => {
          this.errors = e.response.data;
          this.toast('Preencha corretamente os campos obrigatórios! :D', 
            'Campos inválidos', 'danger');
          this.errors.name = this.errors.name ? true : false;
          this.errors.address = this.errors.address ? true : false;
          this.errors.status = this.errors.status ? true : false;
          
          console.log(e.response.data);
        });
    },

    toast(message, title, type) {
      this.$bvToast.toast(message, {
        title: title,
        toaster: 'b-toaster-top-center',
        solid: false,
        variant: type
      });
    },

    newDrone() {
      this.submitted = false;
      this.drone =  {
        id: "",
        image: "",
        name: "",
        address: "",
        battery: 0,
        max_speed: null,
        average_speed: null,
        status: null,
        fly: 0
      };
    },

    testInput(input) {
      if (input === 'name')
        this.errors.name = Joi.string().min(2).max(20).required().validate(this.drone.name).error ? false : true;
      if (input === 'address')
        this.errors.address = Joi.string().min(2).max(20).required().validate(this.drone.address).error ? false : true;
      if (input === 'status')
        this.errors.status = Joi.string().min(2).max(20).required().validate(this.drone.status).error ? false : true;
      console.log(this.errors.name);
      console.log(this.errors.address);
      console.log(this.errors.status);
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>