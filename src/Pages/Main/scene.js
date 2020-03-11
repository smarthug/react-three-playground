import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'

import * as THREE from 'three'
import CameraControls from 'camera-controls'

CameraControls.install({ THREE: THREE });

const clock = new THREE.Clock();

let cameraControls

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

export default function Main() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  );
}
