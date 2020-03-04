<template>
  <div class="row">
    <div class="col-md-4">
      <div class="input-group mb-3">
        <b-form-input
          id="name"
          aria-describedby="input-live-help input-live-feedback"
          placeholder="Type here to search"
          trim
          v-on:input="findText"
        ></b-form-input>
      </div>  
    </div>
    <div class="col-md-12">
      <h4>Drone list</h4>
      <b-table-simple hover small caption-top responsive>
        <b-thead head-variant="blue">
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
          <b-tr v-b-modal.modal-detail v-for="(drone, index) in drones" 
            :key="index" @click="setActiveDrone(drone, index)">
            <b-th style="vertical-align: middle;">{{ drone.id }}</b-th>
            <b-td class="row text-left" style="vertical-align: middle;">
              <div class="col-2">
                <b-img fluid v-if="drone.image" class="border"
                  :src="drone.image" rounded="circle" 
                  alt="Profile image"></b-img>
              </div>
              <div class="col-8" style="vertical-align: middle;">
                <h5 class="mb-0 pb-0"> {{ drone.name }} </h5>
                <small class="mt-0 pt-0">{{ drone.address }}</small>
              </div>
            </b-td>
            <b-td style="vertical-align: middle;">
              <b-progress :value="drone.battery" 
              :variant="drone.battery > 80 ? 'success' : drone.battery > 30 ? 'warning' : 'danger'" 
              :max="100" class="mb-3" :title="drone.battery + ' %'"
              ></b-progress>
            </b-td>
            <b-td style="vertical-align: middle;">{{ drone.max_speed }} m/h</b-td>
            <b-td style="vertical-align: middle;">{{ drone.average_speed }} m/h</b-td>
            <b-td style="vertical-align: middle;">
              <hr v-if="!drone.fly" class="col-5" style="border:1px dashed gray;">
              <b-form-input id="fly"  v-model="drone.fly" name="fly" disabled
                v-if="drone.fly" type="range" min="0" max="100" :title="drone.fly + ' %'"
              ></b-form-input>
            </b-td>
            <b-td style="vertical-align: middle;">
              <span :class="statusColor(drone.status.toUpperCase())">
                {{ drone.status.toUpperCase() }}
              </span>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </div>
  <b-modal v-if="currentDrone.id" id="modal-detail" :title="`Drone ${currentDrone.id}`"
    header-bg-variant="dark"
    header-text-variant="light"
    body-bg-variant="light"
    body-text-variant="dark"
    footer-bg-variant="info"
    footer-text-variant="dark">
    <div class="row">
      <div class="col-8 pl-4">
        <div class="row mt-4 text-left" style="vertical-align: middle;">
          <p>Customer:</p>
          <div class="col-8" style="vertical-align: middle;">
            <h5 class="mb-0 pb-0"> {{ currentDrone.name }} </h5>
            <small class="mt-0 pt-0">{{ currentDrone.address }}</small>
          </div>
        </div>
        <div class="row mt-5" style="vertical-align: middle;">
          <p>Batteries:</p>
          <div class="col-8" style="vertical-align: middle;">
            <b-progress :value="currentDrone.battery" 
            :variant="currentDrone.battery > 80 ? 'success' : currentDrone.battery > 30 ? 'warning' : 'danger'" 
            :max="100" class="mb-3" :title="currentDrone.battery + ' %'"
            ></b-progress>
          </div>
        </div>
        <div class="row mt-4" style="vertical-align: middle;">
          <p>Max speed: {{ currentDrone.max_speed }} m/h</p>
        </div>
        <div class="row mt-4" style="vertical-align: middle;">
          <p>Average speed: {{ currentDrone.average_speed }} m/h</p>
        </div>
        <div class="row mt-4" style="vertical-align: middle;">
          <p>Current fly:</p>
          <div class="col-8" style="vertical-align: middle;">
            <hr v-if="!currentDrone.fly" class="col-5" style="border:1px dashed gray;">
            <b-form-input id="fly"  v-model="currentDrone.fly" name="fly" disabled
              v-if="currentDrone.fly" type="range" min="0" max="100" :title="currentDrone.fly + ' %'"
            ></b-form-input>
          </div>
        </div>
        <div class="row mt-4" style="vertical-align: middle;">
          <p>Status: 
            <span :class="statusColor(currentDrone.status.toUpperCase())">
              {{ currentDrone.status.toUpperCase() }}
            </span>
          </p>
        </div>
      </div>
      <div class="col-4">
        <b-img fluid v-if="currentDrone.image" class="border"
          :src="currentDrone.image" rounded 
          alt="Profile image"></b-img>
      </div>
    </div>
    <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="dark"
            class="float-right m-2"
            @click="$bvModal.hide('modal-detail')"
          >
           Close
          </b-button>
          <b-button
            variant="warning"
            class="float-left m-2"
            :href="'/drone/' + currentDrone.id"
          >
            Edit
          </b-button>
        </div>
      </template>
  </b-modal>
  </div>
</template>

<script>
import DroneService from "../services/DroneService";

export default {
  name: "drone-list",
  data() {
    return {
      drones: [],
      currentDrone: [],
      currentIndex: -1
    };
  },
  methods: {
    retrieveDrones() {
      DroneService.list()
        .then(response => {
          this.drones = response.data;
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
    
    findText(text) {
      DroneService.find(text)
        .then(response => {
          this.drones = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    statusColor(status) {
      switch (status) {
        case 'SUCCESS': return 'badge badge-success';
        case 'DELAYED': return 'badge badge-warning';
        case 'FLYING': return 'badge badge-info';
        case 'FAIL': return 'badge badge-danger';
        case 'OFFLINE': return 'badge badge-secondary';
        case 'CHARGING': return 'badge badge-primary';
      }
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