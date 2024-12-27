// ARModel.js
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';

import ARCamRig from './ARCamRig';
// import WoodenChair from '../components/ThreeDModels/WoodenChair';
import Sofa from '../componenets/ThreeDModels/Sofa';
// import OficeTable from '../components/ThreeDModels/OficeTable';
// import PicnicTable from '../components/ThreeDModels/PicnicTable';
const ARModel = ({model ,geos,imgArray, avgIntensity, lightX, lightY ,modelSize}) => {
    const adjustedIntensity = avgIntensity / 12; // Normalize intensity to range 0-1
    
    return (

        <Canvas
            shadows
            camera={{ position: [0, 0, 0], fov: 20 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <spotLight position={[lightX, lightY, 5]} intensity={adjustedIntensity}></spotLight>
            <Environment preset='city' />
            <ARCamRig cameraCoordinates={[0,0,20]} >
                <Center>
                {
                        <Sofa geos={geos}></Sofa>
                    }
                    
                </Center>
            </ARCamRig>
        </Canvas>
        
    );
};

export default ARModel;

