import React, { Suspense } from 'react'
import {
  Engine,
  Model,
  Scene,
} from 'react-babylonjs'
import './App.css'

import { Vector3 } from "@babylonjs/core/Maths/math.vector"
import "@babylonjs/loaders"


function App() {
  return (
    <div className="App">
      <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
        <Scene>
          <universalCamera
            name="camera1"
            position={new Vector3(0,0,0)}
          />
          <hemisphericLight
            name="light1"
            intensity={1}
            direction={Vector3.Up()}
          />
          <Chest name="chest" position={new Vector3(0,0,0)}/>
          <Bomb name="chest" position={new Vector3(0,0,0)}/>
        </Scene>
      </Engine>
    </div>
  )
}

function Chest(props) {
  return (
    <Suspense>
      <Model
        name={props.name}
        scaleToDimension={5}
        position={props.position}
        rootUrl="./"
        sceneFilename="chest.glb"
        onModelLoaded={(model) => {
          const mesh = model.meshes[1]
          mesh.isVisible = false
          for (let i=0; i<9; i++) {
            const m = mesh.createInstance(`c${i}`)
            m.scaling = new Vector3(0.1,0.1,0.1)
            m.position.x=i%3 * 10 - 10
            m.position.z=300
            m.position.y=Math.floor(i/3) * 10 - 13
            m.rotation = new Vector3(-Math.PI/2,Math.PI,0)
          }
        }}
      />
    </Suspense>
  )
}

function Bomb(props) {
  return (
    <Suspense>
      <Model
        name={props.name}
        scaleToDimension={5}
        position={props.position}
        rootUrl="./"
        sceneFilename="bomb.glb"
        onModelLoaded={(model) => {
          const mesh = model.meshes[1]
          mesh.isVisible = false
          for (let i=0; i<9; i++) {
            const m = mesh.createInstance(`c${i}`)
            m.scaling = new Vector3(1,1,1)
            m.position.x=i%3 * 10 - 10
            m.position.y=-10
            m.position.z=Math.floor(i/3) * 10 + 100
            m.rotation = new Vector3(-Math.PI/2,Math.PI,0)
          }
        }}
      />
    </Suspense>
  )
}

export default App
