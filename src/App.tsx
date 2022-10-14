import React, { Suspense } from 'react'
import {
  Engine,
  Model,
  Scene,
} from 'react-babylonjs'
import './App.css'

import {
  Color3,
  Color4,
  Mesh,
  Vector3,
} from "@babylonjs/core"
import "@babylonjs/loaders"


function App() {
  console.log(Mesh)
  return (
    <div className="App">
      <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
        <Scene
          onSceneMount={({ scene }) => {scene.clearColor = new Color4(0,0,0,0)}}
        >
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
          <ground
            name="ground1"
            width={50}
            height={3000}
            position={new Vector3(0,-14,-130)}
          >
            <standardMaterial
              diffuseColor={Color3.White()}
            >
              <texture url="https://as2.ftcdn.net/v2/jpg/02/42/50/91/1000_F_242509177_NyC9JFDRAFiSaZmE9aU6lxDqhLcgCcPP.jpg"/>
            </standardMaterial>
          </ground>
          <plane
            name="ground2"
            width={50}
            height={3000}
            position={new Vector3(0,15,-130)}
          rotation={new Vector3(-Math.PI/2,Math.PI,0)}
            sideOrientation={Mesh.DOUBLESIDE}
          >
            <standardMaterial
              diffuseColor={Color3.White()}
              backFaceCulling={false}
            >
              <texture url="https://as2.ftcdn.net/v2/jpg/02/42/50/91/1000_F_242509177_NyC9JFDRAFiSaZmE9aU6lxDqhLcgCcPP.jpg"/>
            </standardMaterial>
          </plane>
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
