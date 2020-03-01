<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Buscar por texto"
          v-model="text"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="findText"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Drone List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(drone, index) in drones"
          :key="index"
          @click="setActiveDrone(drone, index)"
        >
          {{ drone.name }}
        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentDrone">
        <h4>Drone</h4>
        <div>
          <label><strong>Nome:</strong></label> {{ currentDrone.name }}
        </div>
        <div>
          <label><strong>Imagem:</strong></label> {{ currentDrone.image }}
        </div>

        <a class="badge badge-warning"
          :href="'/drones/' + currentDrone.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Drone...</p>
      </div>
    </div>
  </div>
</template>

<script>
import DroneService from "../services/DroneService";

export default {
  name: "drone-list",
  data() {
    return {
      drones: [],
      currentDrone: null,
      currentIndex: -1,
      text: ""
    };
  },
  methods: {
    retrieveDrones() {
      DroneService.list()
        .then(response => {
          this.drones = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveDrones();
      this.currentDrone = null;
      this.currentIndex = -1;
    },

    setActiveDrone(drone, index) {
      this.currentDrone = drone;
      this.currentIndex = index;
    },
    
    findText() {
      DroneService.find(this.text)
        .then(response => {
          this.drones = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveDrones();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>