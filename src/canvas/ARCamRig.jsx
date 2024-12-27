import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
// import axios from 'axios'
const ARCamRig = ({ children, cameraCoordinates }) => {
  const group = useRef();
  const [angle, setAngle] = useState([null, null, null]);
  const [count, setCount] = useState(1);
  const [gyro,setGyro]=useState(1);
  const [isPortrait, setIsPortrait] = useState(true);

  useEffect(() => {
    const handleOrientation = (event) => {
      const { alpha, beta, gamma } = event;

      // Calculate the angle between the device and the direction of gravity
      // Here, we assume beta (front-to-back tilt in degrees) gives us the desired angle
      const gravityAngle = [alpha, beta, gamma];

      setAngle(gravityAngle);
      if (gravityAngle[0] == null && gravityAngle[1] == null && gravityAngle[2] == null) {

        if(gyro==1){
          alert('Your device has denied gyroscope access. Still augmented reality will be provided, hold your device up right for better experience.visit https://thiwankareiss.github.io/motion-test/ for better Augmented reality experience.');
          setGyro(2);
        }

      }
    };

    const updateOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener('deviceorientation', handleOrientation);
    window.addEventListener('resize', updateOrientation);

    // Set initial orientation
    updateOrientation();

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('resize', updateOrientation);
    };
  }, [gyro]);

  useFrame((state, delta) => {
    // Set the initial position and rotation of the camera based on device motion
    const targetPosition = cameraCoordinates;
    // Smoothly interpolate the camera position and rotation
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    if (angle[0] == null && angle[1] == null && angle[2] == null) {
      if (count == 1) {


        // axios.get('http://localhost:8080/local')
        //   .then(function (response) {
        //     alert('Seems like you are running on localhost 8080 visit https://thiwankareiss.github.io/motion-test/ for better Augmented reality experience.')
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        setCount(3);

      }

      easing.dampE(
        group.current.rotation,
        [state.pointer.y / 6, -state.pointer.x / 0.8, 0],
        0.25,
        delta
      );
    } else {

      if (isPortrait) {
        console.log("c")
        easing.dampE(
          group.current.rotation,
          [Math.PI / 2 - Math.PI * (angle[1] / 180), -state.pointer.x / 0.8, Math.PI * (angle[2] / 180)],
          0.25,
          delta
        );
      } else {

        easing.dampE(
          group.current.rotation,
          [Math.PI / 2 + Math.PI * (angle[2] / 180), -state.pointer.x / 0.8, Math.PI * (angle[1] / 180)],
          0.25,
          delta
        );
      }
    }
  });

  return <group ref={group}>{children}</group>;
};

export default ARCamRig;