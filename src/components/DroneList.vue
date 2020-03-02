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
      <b-table-simple hover small caption-top responsive>
        <b-thead head-variant="dark">
          <b-tr>
            <b-th>DRONE</b-th>
            <b-th>CUSTOMER</b-th>
            <b-th>BATTERIES</b-th>
            <b-th>MAX SPEED</b-th>
            <b-th>AVERAGE SPEED</b-th>
            <b-th>CURRENT FLY</b-th>
            <b-th>STATUS</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(drone, index) in drones" :key="index" @click="setActiveDrone(drone, index)">
            <b-th>{{ drone.id }}</b-th>
            <b-td>
              <h5> {{ drone.name }} </h5>
              <small>{{ drone.address }}</small>
            </b-td>
            <b-td>{{ drone.battery }}</b-td>
            <b-td>{{ drone.max_speed }}</b-td>
            <b-td>{{ drone.average_speed }}</b-td>
            <b-td>{{ drone.fly }}</b-td>
            <b-td>{{ drone.status }}</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
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