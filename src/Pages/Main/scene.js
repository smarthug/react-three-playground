import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'

import * as THREE from 'three'
import CameraControls from 'camera-controls'

import niceColors from 'nice-color-palettes'
import { Physics, usePlane, useBox } from 'use-cannon'

CameraControls.install({ THREE: THREE });

const clock = new THREE.Clock();

let cameraControls


function Plane(props) {
  const [ref] = usePlane(() => ({ mass: 0, ...props }))

  const {
    gl,                           // WebGL renderer
    camera,                       // Default camera
  } = useThree()

  const cameraControls = new CameraControls(camera, gl.domElement);



  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    const delta = clock.getDelta();
    
    cameraControls.update(delta)

  })
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[5, 5]} />
      <shadowMaterial attach="material" color="#171717" />
    </mesh>
  )
}


function Cubes({ number }) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    args: [0.05, 0.05, 0.05],
    position: [Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5]
  }))

  const colors = useMemo(() => {
    const array = new Float32Array(number * 3)
    const color = new THREE.Color()
    for (let i = 0; i < number; i++)
      color
        .set(niceColors[17][Math.floor(Math.random() * 5)])
        .convertSRGBToLinear()
        .toArray(array, i * 3)
    return array
  }, [number])

  useFrame(() => api.setPositionAt(Math.floor(Math.random() * number), 0, Math.random() * 2, 0))

  return (
    <instancedMesh receiveShadow castShadow ref={ref} args={[null, null, number]}>
      <boxBufferGeometry attach="geometry" args={[0.1, 0.1, 0.1]}>
        <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colors, 3]} />
      </boxBufferGeometry>
      <meshLambertMaterial attach="material" vertexColors={THREE.VertexColors} />
    </instancedMesh>
  )
}


function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  const {
    gl,                           // WebGL renderer
    scene,                        // Default scene
    camera,                       // Default camera
  } = useThree()

  cameraControls = new CameraControls(camera, gl.domElement);



  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    const delta = clock.getDelta();
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    cameraControls.update(delta)

  })



  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}



export default function Main(){
  return (
    <Canvas
    shadowMap
    gl={{ alpha: false }}
    camera={{ position: [-1, 1, 2.5], fov: 50 }}
    onCreated={({ gl, camera, scene }) => {
      camera.lookAt(0, 0, 0)
      scene.background = new THREE.Color('lightblue')
      gl.toneMapping = THREE.ACESFilmicToneMapping
      gl.outputEncoding = THREE.sRGBEncoding
    }}>
    <hemisphereLight intensity={0.35} />
    <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-mapSize-width={256} shadow-mapSize-height={256} />
    <Physics>
      <Plane rotation={[-Math.PI / 2, 0, 0]} />
      <Cubes number={200} />
    </Physics>
  </Canvas>
  );
}


