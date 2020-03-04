<template>
  <div class="row">
    <div class="col-8 text-left">
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
            :state="errors.name == null ? null : !errors.name"
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
            :state="errors.address == null ? null : !errors.address"
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
            :state="errors.status == null ? null : !errors.status" 
            v-on:input="testInput('status')">
            <b-form-select-option value="Success">
              Success
            </b-form-select-option>
            <b-form-select-option value="Delayed">
              Delayed
            </b-form-select-option>
            <b-form-select-option value="Flying">
              Flying
            </b-form-select-option>
            <b-form-select-option value="Fail">
              Fail
            </b-form-select-option>
            <b-form-select-option value="Offline">
              Offline
            </b-form-select-option>
            <b-form-select-option value="Charging">
              Charging
            </b-form-select-option>
          </b-form-select>
        </div>

        <div class="form-group col-6">
          <label>Posição atual</label>
          <b-input-group>
            <b-form-input id="fly"  v-model="drone.fly" name="fly" 
              type="range" min="0" max="100"></b-form-input>
              <b-input-group-append>
                <b-button disabled> 
                  {{ drone.fly }} 
                </b-button>
              </b-input-group-append>
          </b-input-group>
        </div>
      </div>

      <button 
      :disabled="this.errors.name !== false || this.errors.address !== false ||
      this.errors.status !== false" v-if="!this.drone.id" @click="createDrone" 
      class="btn btn-info"
      >
        Cadastrar
      </button>
      <button :disabled="this.errors.name || this.errors.address || this.errors.status" 
        v-if="this.drone.id" @click="updateDrone" class="btn btn-info">
        Update
      </button>
      <button :disabled="this.errors.name || this.errors.address || this.errors.status" 
        v-if="this.drone.id" @click="deleteDrone" class="btn btn-danger float-right">
        Delete
      </button>
      <div class="text-center">
      <a class="btn btn-dark" href="/drone-list">
        Back to list
      </a>
      </div>
    </div>
    <img v-if="drone.image" :src="drone.image" 
      class="img-fluid col-4 border" alt="Drone image">
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
      errors: { 
        name: null, 
        address: null, 
        status: null 
      },
    };
  },
  methods: {
    toast(message, title, type, redirectPage) {
      this.$bvToast.toast(message, {
        title: title,
        toaster: 'b-toaster-top-right',
        solid: false,
        variant: type
      });
      if (redirectPage)
        setTimeout(() => {
          this.$router.push({ name: redirectPage });
        }, 3000);
    },

    newDrone() {
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
        this.errors.name = Joi.string()
          .min(2).max(20).required()
          .validate(this.drone.name)
          .error ? true : false;

      if (input === 'address')
        this.errors.address = Joi.string()
          .min(2).max(20).required()
          .validate(this.drone.address)
          .error ? true : false;

      if (input === 'status')
        this.errors.status = Joi.string()
        .min(2).max(20).required()
        .validate(this.drone.status)
        .error ? true : false;
    },
    getDrone(id) {
      DroneService.detail(id)
        .then(response => {
          if (!response.data) 
            this.$router.push({ name: "drone-list" });
          else {
            this.drone = response.data;
            this.errors = { name: false, address: false, status: false };
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateDrone() {
      DroneService.update(this.drone.id, this.drone)
        .then(response => {
          console.log(response.data);
          this.toast(`Drone ${this.drone.id} was updated with success! + \r\n(You will be redirected in 3 seconds)`, 
            `It's done!`, 'success', "drone-list");
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteDrone() {
      this.$bvModal.msgBoxConfirm(`Are you sure that you want to delete drone ${this.drone.id}?`, {
          title: 'Confirmation',
          size: 'sm',
          //buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            if(value) {
              DroneService.delete(this.drone.id)
                .then(response => {
                  console.log(response.data);
                  this.$router.push({ name: "drone-list" });
                })
                .catch(e => {
                  console.log(e);
              });
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    createDrone() {
      DroneService.create(this.drone)
        .then(response => {
          this.toast(`Drone ${response.data.id} was created with success! + \r\n(You will be redirected in 3 seconds)`, 
            `It's done!`, 'success', "drone-list");
        })
        .catch(e => {
          this.errors = e.response.data;
          this.toast('Please, fill the fields correctly', 
            'Wrong data', 'danger');
          this.errors.name = this.errors.name ? true : false;
          this.errors.address = this.errors.address ? true : false;
          this.errors.status = this.errors.status ? true : false;
          
          console.log(e.response.data);
      });
    }
  },
  mounted() {
    console.log(this.$route.params.id);
    if(this.$route.params.id)
      this.getDrone(this.$route.params.id);
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>