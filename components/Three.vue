<template>
  <div>
    <div :class="[$style.videopos]">
      <video class="input_video"></video>
    </div>
  </div>
</template>

<style>
.input_video {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  width: 300px;
  height: 150px;
}
</style>

<style module>
.videopos {
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>

<script>
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  Color,
  AxesHelper,
  SkeletonHelper
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module.js";

import Worker from "~/plugins/mediapipe.worker.js";
const worker = new Worker();

export default {
  data() {
    return {
      handleftsk: null
    };
  },
  methods: {},
  mounted() {
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let orbit = new OrbitControls(camera, renderer.domElement);

    window.addEventListener(
      "resize",
      function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
      },
      false
    );

    // soft white light
    const light = new AmbientLight(0xffffff, 1.4);
    scene.add(light);

    // set background
    scene.background = new Color("#debfbf");
    camera.position.z = 5;
    // axis
    const axesHelper = new AxesHelper(5);
    scene.add(axesHelper);

    // load handleft
    const loader = new GLTFLoader();
    var that = this;
    loader.load(
      "/model/handlelt.glb",
      function(gltf) {
        const obj = gltf.scene;
        scene.add(obj);
        let skeleton = new SkeletonHelper(obj);
        skeleton.visible = true;
        scene.add(skeleton);
        that.handleftsk = skeleton;
        console.log(that.handleftsk.bones[1]);
      },
      undefined,
      function(error) {
        console.error(error);
      }
    );

   
    // fps
    var stats = new Stats(); // <-- remove me
    document.body.appendChild(stats.dom); // <-- remove me
    function animate() {
      requestAnimationFrame(animate);

      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      stats.update();
    }

   
    animate();

    const videoElement = document.getElementsByClassName("input_video")[0];
    const hands = new Hands({
      locateFile: file => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      }
    });
    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 0,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    hands.onResults(onResults);

    const camera1 = new Camera(videoElement, {
      onFrame: async () => {
        await hands.send({ image: videoElement });
      },
      width: 300,
      height: 150
    });
    camera1.start();

    function onResults(results) {
      try {
        if (results.multiHandedness[0].label) {
          that.handleftsk.bones[0].position.x =
            10 - results.multiHandLandmarks[0][0].x * 20;
          that.handleftsk.bones[0].position.z =
            5 - results.multiHandLandmarks[0][9].y * 10;
        }
      } catch (err) {}
    }

    function angle(cx, cy, ex, ey) {
      var dy = ey - cy;
      var dx = ex - cx;
      var theta = Math.atan2(dy, dx); // range (-PI, PI]
      if (theta < 0) theta = 360 + theta; // range [0, 360)
      return theta;
    }
  }
};
</script>
