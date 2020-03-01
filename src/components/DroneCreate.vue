<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Imagem</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="drone.image"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Nome</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="drone.name"
          name="description"
        />
      </div>

      <div class="form-group">
        <label for="description">Endereço</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="drone.address"
          name="description"
        />
      </div>
      
      <div class="form-group">
        <label for="description">Bateria</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="drone.battery"
          name="description"
        />
      </div>
      
      <div class="form-group">
        <label for="description">Velocidade máxima</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="drone.max_speed"
          name="description"
        />
      </div>
      
      <div class="form-group">
        <label for="description">Velocidade média</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="drone.average_speed"
          name="description"
        />
      </div>
      
      <div class="form-group">
        <label for="description">Status</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="drone.status"
          name="description"
        />
      </div>
      
      <div class="form-group">
        <label for="description">Posição atual</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="drone.fly"
          name="description"
        />
      </div>

      <button @click="createDrone" class="btn btn-success">Cadastrar</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newDrone">Add</button>
    </div>
  </div>
</template>

<script>
import DroneService from "../services/DroneService";

export default {
  name: "drone-create",
  data() {
    return {
      drone: {
        id: "",
        image: "",
        name: "",
        address: "",
        battery: "",
        max_speed: "",
        average_speed: "",
        status: "",
        fly: ""
      },
      submitted: false
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
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });

      this.submitted = true;
    },
    
    newDrone() {
      this.submitted = false;
      this.drone = {};
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